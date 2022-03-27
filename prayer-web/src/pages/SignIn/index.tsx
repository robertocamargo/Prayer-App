import React, { useRef, useCallback } from "react";
import { FiLogIn, FiMail, FiLock } from "react-icons/fi";
import { Form } from "@unform/web";
import { FormHandles } from "@unform/core";
import * as Yup from "yup";
import { Link, useHistory } from "react-router-dom";

import { useAuth } from "../../hooks/auth";
import { useToast } from "../../hooks/toast";
import getValidationErrors from "../../utils/getValidationErros";

import logo from "../../assets/image1.svg";
import { Container, Content, Background, AnimationContainer } from "./styles";
import Input from "../../components/Input";
import Button from "../../components/Button";

interface SignInFormData {
  email: string;
  password: string;
}
const SignIn: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const { signIn } = useAuth();
  const { addToast } = useToast();
  const history = useHistory();

  const handleSubmit = useCallback(
    async (data: SignInFormData) => {
      try {
        formRef.current?.setErrors({});

        const schema = Yup.object().shape({
          email: Yup.string()
            .required("Email obrigatório")
            .email("Digite um email válido"),
          password: Yup.string().required("Senha obrigatória"),
        });
        await schema.validate(data, {
          abortEarly: false,
        });
        await signIn({
          email: data.email,
          password: data.password,
        });
        history.push("/dashboard");
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErrors(err);
          formRef.current?.setErrors(errors);
          return;
        }
        addToast({
          type: "error",
          title: "Erro na autenticação",
          description: "Verifique seu usuário e senha",
        });
      }
    },
    [signIn, addToast, history]
  );
  return (
    <Container>
      <Content>
        <AnimationContainer>
          <img
            src={logo}
            alt="Logo"
            style={{ height: 200 }}
            placeholder="Prayer APP"
          />
          <Form ref={formRef} onSubmit={handleSubmit}>
            <h1>Pray APP</h1>
            <h3>Faça seu logon</h3>
            <Input
              name="email"
              icon={FiMail}
              placeholder="E-mail"
            />
            <Input
              name="password"
              icon={FiLock}
              type="password"
              placeholder="Senha"
            />
            <Button type="submit">Entrar</Button>
            <Link to="/forgot-password">Esqueci minha senha</Link>
            <Link to="/signup">
              <FiLogIn />
              Criar Conta
            </Link>
          </Form>
        </AnimationContainer>
      </Content>
      <Background />
    </Container>
  );
};

export default SignIn;
