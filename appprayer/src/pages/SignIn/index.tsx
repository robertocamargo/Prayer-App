import React,{useCallback,useRef} from "react";
import {TextInput, Image,ScrollView ,KeyboardAvoidingView, Platform,View,Alert} from "react-native";
import Icon from 'react-native-vector-icons/Feather';
import { useNavigation } from "@react-navigation/native";
import {Form} from '@unform/mobile';
import {FormHandles} from '@unform/core';
import * as Yup from 'yup';
import getValidationErrors from '../../utils/getValidationErros';
import Input from '../../components/Input';
import Button from "../../components/button";
import { useAuth } from "../../hooks/auth";

import { Container, Title,ForgotPassword,ForgotPasswordText,CreateAccountButton,CreateAccountButtonText } from './styles';
import logoImg from '../../assets/logo.png';


interface SignInFormData {
  email: string;
  password: string;
}
const SignIn:React.FC = () =>{
  const formRef = useRef<FormHandles>(null);
  const passwordInputRef = useRef<TextInput>(null);
  const navigation = useNavigation();
  const { signIn,user} = useAuth();


  const handleSignIn = useCallback(async (data: SignInFormData) => {
    try {
      // Zera os erros para cada campo preenchido ele limpe o erro
      formRef.current?.setErrors({});
      

      const schema = Yup.object().shape({
        email: Yup.string()
          .required('E-mail obrigatório')
          .email('Digite um e-mail válido'),
        password: Yup.string().required('Senha obrigatória'),
      });
      await schema.validate(data, { abortEarly: false });

       await signIn({
        email: data.email,
        password: data.password,
      }); 
  
    } catch (err) {
      // verifica se o err vem da validacao Yup
      if (err instanceof Yup.ValidationError) {
        const errors = getValidationErrors(err);
        formRef.current?.setErrors(errors);
        return;
      }

      Alert.alert(
        'Erro na autenticação',
        'Ocorreu um erro ao fazer login, cheque as credenciais.',
      );
    }
  }, [signIn]);
  return (
    <>
    <KeyboardAvoidingView style={{flex:1}}
    behavior={Platform.OS === 'ios'? 'padding':undefined}
    enabled
    >
      <ScrollView 
      keyboardShouldPersistTaps="handled"
      contentContainerStyle={{flex:1}}
      >
        <Container>
          <Image source={logoImg} />
          <View>
          <Title>Faça seu logon</Title>
          </View>
          <Form ref={formRef} onSubmit={handleSignIn}>
            <Input
             autoCapitalize="none"
             autoCorrect={false}
             keyboardType="email-address"
             returnKeyType="next"
             onSubmitEditing={()=>{
               passwordInputRef.current?.focus();
             }}
             name="email" icon="mail" placeholder="E-mail"/>
            <Input 
            ref={passwordInputRef}
            secureTextEntry
            returnKeyType="send"
            onSubmitEditing={()=>{ formRef.current?.submitForm()}}
            name="password" icon="lock" placeholder="Senha"/>
            <Button onPress={() => {formRef.current?.submitForm()}} text="Entrar"/> 
          </Form>
          <ForgotPassword onPress={() => console.log('Deu')}>
            <ForgotPasswordText>Esqueci minha senha</ForgotPasswordText>
          </ForgotPassword>
        </Container>
      </ScrollView>
    </KeyboardAvoidingView>
    <CreateAccountButton onPress={() => navigation.navigate('SignUp')}>
      <Icon name="log-in" size={20} color="#ff9000" />
      <CreateAccountButtonText>Criar uma conta</CreateAccountButtonText>
    </CreateAccountButton>
    </>
  );
}
export default SignIn;
