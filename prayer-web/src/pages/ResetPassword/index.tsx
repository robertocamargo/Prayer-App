import React, { useRef, useCallback } from "react";
import { FiLock } from "react-icons/fi";
import { Form } from "@unform/web";
import { FormHandles } from "@unform/core";
import * as Yup from "yup";
import { useHistory, useLocation } from "react-router-dom";

import { useToast } from "../../hooks/toast";
import getValidationErrors from "../../utils/getValidationErros";

import logo from "../../assets/image1.svg";
import { Container, Content, Background, AnimationContainer } from "./styles";
import Input from "../../components/Input";
import Button from "../../components/Button";
import api from "../../services/api";

interface ResetPasswordFormData {
  password: string;
  password_confirmation: string;
}
const ResetPassword: React.FC = () => {
  const formRef = useRef<FormHandles>(null);

  const { addToast } = useToast();
  const history = useHistory();
  const location = useLocation();

  const handleSubmit = useCallback(
    async (data: ResetPasswordFormData) => {
      try {
        formRef.current?.setErrors({});

        const schema = Yup.object().shape({
          password: Yup.string().required("Senha obrigatória"),
          password_confirmation: Yup.string().oneOf(
            [Yup.ref("password"), null],
            "As senhas precisam ser iguais"
          ),
        });

        await schema.validate(data, {
          abortEarly: false,
        });
        const token = location.search.replace("?token=", "");
        if (!token) {
          throw new Error();
        }
        api.post("/password/reset", {
          password: data.password,
          password_confimation: data.password_confirmation,
          token,
        });

        history.push("/");
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErrors(err);
          formRef.current?.setErrors(errors);
          return;
        }
        addToast({
          type: "error",
          title: "Erro ao resetar a senha",
          description: "Ocorreu um erro ao resetar sua senha, tente novamente",
        });
      }
    },
    [addToast, history, location.search]
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
            <h3>Resetar senha</h3>
            <Input
              name="password"
              icon={FiLock}
              type="password"
              placeholder="Nova senha"
            />
            <Input
              name="password_confirmation"
              icon={FiLock}
              type="password"
              placeholder="confirmação da senha"
            />
            <Button type="submit">Alterar senha</Button>
          </Form>
        </AnimationContainer>
      </Content>
      <Background />
    </Container>
  );
};

export default ResetPassword;
