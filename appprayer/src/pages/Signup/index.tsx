import React,{useCallback,useRef} from "react";
import { TextInput ,Image,ScrollView ,KeyboardAvoidingView, Platform,View,Alert} from "react-native";
import Icon from 'react-native-vector-icons/Feather';
import { useNavigation } from "@react-navigation/native";
import {Form} from '@unform/mobile';
import {FormHandles} from '@unform/core';
import * as Yup from 'yup';
import api from '../../services/api';
import Input from '../../components/Input';
import Button from "../../components/button";
import getValidationErrors from '../../utils/getValidationErros';
import { Container, Title,BackToSigIn,BackToSigInText } from './styles';
import logoImg from '../../assets/logo.png';
interface SignUpFormData {
  name: string;
  email: string;
  password: string;
}
const SignUp:React.FC = () =>{
  const formRef = useRef<FormHandles>(null);
  const navigation = useNavigation();
  const emailInputRef = useRef<TextInput>(null);
  const passwordInputRef = useRef<TextInput>(null);
  
  const handleSignUp = useCallback(
    async (data: SignUpFormData) => {
      try {
        // Zera os erros para cada campo preenchido ele limpe o erro
        formRef.current?.setErrors({});

        const schema = Yup.object().shape({
          name: Yup.string().required('Nome obrigatório'),
          email: Yup.string()
            .required('E-mail obrigatório')
            .email('Digite um e-mail válido'),
          password: Yup.string().min(6, 'No mínimo 6 dígitos'),
        });
        await schema.validate(data, { abortEarly: false });
        

        // envia os dados para cadastrar o usuario
        await api.post('/users', data);
        // cria um toast exibindo que deu certo

        // redireciona o user para a tela de logon
        Alert.alert(
          'Cadastro realizado com sucesso',
          'Você já pode fazer login na aplicação.',
        );
        navigation.goBack();
      } catch (err) {
        console.log(err);
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErrors(err);
          console.log(errors);
          formRef.current?.setErrors(errors);
          return;
        }
        Alert.alert('Erro no cadastro', 'Ocorreu um erro ao fazer cadastro.');
      }
    },
    [navigation],
  );
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
            <Title>Crie sua conta</Title>
          </View>
          <Form ref={formRef} onSubmit={handleSignUp}>
          <Input 
          autoCapitalize="words"
          name="name" 
          icon="user" 
          placeholder="Nome"
          returnKeyType="next"
          onSubmitEditing={()=>{
            emailInputRef.current?.focus();
          }}
          />
          <Input 
          ref={emailInputRef}
          keyboardType="email-address" 
          autoCorrect={false} 
          autoCapitalize="none"
          name="email" 
          icon="mail" 
          placeholder="E-mail"
          returnKeyType="next"
          onSubmitEditing={()=>{
            passwordInputRef.current?.focus();
          }}
          />
            <Input 
            ref={passwordInputRef}
            secureTextEntry 
            textContentType="newPassword"
            name="password" 
            icon="lock" 
            placeholder="Senha"
            returnKeyType="send"
            onSubmitEditing={
              () =>{
                formRef.current?.submitForm();
              }
            }
            />
            <Button onPress={() =>{
              formRef.current?.submitForm();
            }} text="Criar"/>
            
          </Form>
        </Container>
      </ScrollView>
    </KeyboardAvoidingView>
    <BackToSigIn onPress={() => navigation.goBack()}>
      <Icon name="arrow-left" size={20} color="#fff" />
      <BackToSigInText>Voltar para Logon</BackToSigInText>
    </BackToSigIn>
    </>
  );
}
export default SignUp;
