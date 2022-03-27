import React, { useCallback, useRef, ChangeEvent } from "react";
import { FaPray } from "react-icons/fa";
import { useHistory, Link } from "react-router-dom";
import { FormHandles } from "@unform/core";
import { format, formatISO } from "date-fns";

import { FiArrowLeft } from "react-icons/fi";

import { Form } from "@unform/web";
import * as Yup from "yup";

import getValidationErrors from "../../utils/getValidationErros";

import Button from "../../components/Button";
import Textarea from "../../components/Textarea";

import { Container, Content } from "./styles";


import api from "../../services/api";

import { useToast } from "../../hooks/toast";
import { useAuth } from "../../hooks/auth";


// Dados de cadastro
interface PrayerFormData {
  prayer_description: string;
  user_id: string;
  timestamp: string;
}

const CreatePrayer: React.FC = () => {
  const history = useHistory();
  const { addToast } = useToast();
  const formRef = useRef<FormHandles>(null);

  const { user } = useAuth();

  const handleSubmit = useCallback(

    async (data: PrayerFormData) => {
      try {
        // Zera os erros para cada campo preenchido ele limpe o erro
        formRef.current?.setErrors({});
        const timestamp = formatISO(new Date())

        const formData = {
          prayer_description:data.prayer_description,
          user_id:user.id,
          date:timestamp
        }

        await api.post("/prayers", formData);

        // cria um toast exibindo que deu certo
        addToast({
          type: "success",
          title: "Pedido de oração postado!",
          description:
            "Seu pedido de oração foi inserido como sucesso.",
        });
        // redireciona o user para a tela de logon
        history.push("/");
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErrors(err);
          formRef.current?.setErrors(errors);
          return;
        }
        addToast({
          type: "error",
          title: "Erro ao inserir o pedido",
          description:
            "Ocorreu um erro ao inserir seu pedido de oração.",
        });
      }
    },
    [addToast, history]
  );

  return (
    <Container>
      <header>
        <div>
          <Link to="/dashboard">
            <FiArrowLeft />
          </Link>
        </div>
      </header>
      <Content>
        <Form
          ref={formRef}
          onSubmit={handleSubmit}
        >
          <h1>Postar um pedido de oração</h1>
          <Textarea name="prayer_description" containerStyle={{width:600}} cols={65} rows={15} id="prayer_descrition" icon={FaPray} placeholder="Escreve seu pedido de oração"/>
          <Button type="submit">Criar pedido de oração</Button>
        </Form>
      </Content>
    </Container>
  );
};

export default CreatePrayer;
