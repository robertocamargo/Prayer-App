import React, { useRef, useCallback, useState } from "react";
import { FiLogIn, FiMail } from "react-icons/fi";
import { Form } from "@unform/web";
import { FormHandles } from "@unform/core";
import * as Yup from "yup";
import { Link } from "react-router-dom";

import { useToast } from "../../hooks/toast";
import getValidationErrors from "../../utils/getValidationErros";

import logo from "../../assets/image1.svg";
import { Container, Content, Background, AnimationContainer } from "./styles";
import Input from "../../components/Input";
import Button from "../../components/Button";
import api from "../../services/api";

interface ForgotPasswordFormData {
  email: string;
  password: string;
}
const ForgotPassword: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const formRef = useRef<FormHandles>(null);

  const { addToast } = useToast();

  const handleSubmit = useCallback(
    async (data: ForgotPasswordFormData) => {
      try {
        setLoading(true);
        formRef.current?.setErrors({});

        const schema = Yup.object().shape({
          email: Yup.string()
            .required("Email obrigatório")
            .email("Digite um email válido"),
        });
        await schema.validate(data, {
          abortEarly: false,
        });

        await api.post("/password/forgot", {
          email: data.email,
        });

        addToast({
          type: "success",
          title: "Email de recuperação enviado.",
          description: "Enviamos um email para confirmar",
        });
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErrors(err);
          formRef.current?.setErrors(errors);
          return;
        }
        addToast({
          type: "error",
          title: "Erro na recuperação de senha",
          description: "Erro ao tentar recuperar a senha, tente novamente",
        });
      } finally {
        setLoading(false);
      }
    },
    [addToast]
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
            <h3>Recuperar senha</h3>
            <Input name="email" icon={FiMail} placeholder="E-mail" />

            <Button loading={loading} type="submit">
              Recuperar
            </Button>

            <Link to="/signin">
              <FiLogIn />
              Voltar ao login
            </Link>
          </Form>
        </AnimationContainer>
      </Content>
      <Background />
    </Container>
  );
};

export default ForgotPassword;
