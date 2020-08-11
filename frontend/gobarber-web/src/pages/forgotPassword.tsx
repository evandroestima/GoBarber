/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useCallback, useRef, useState } from "react";
import styled, { keyframes } from "styled-components";
import { Form } from "@unform/web";
import { FormHandles } from "@unform/core";
import * as yup from "yup";
import logoImg from "../assets/logo.svg";
import SignInBackground from "../assets/sign-in-background.png";
import { FiLogIn, FiMail } from "react-icons/fi";
import { shade } from "polished";
import Input from "../components/input";
import Button from "../components/button";
import getValidationErrors from "../utils/getValidationErrors";
import { useToast } from "../hooks/Toast";
import { Link } from "react-router-dom";
import api from "../services/api";

interface ForgotPasswordFormData {
  email: string;
}

const ForgotPassword: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const formRef = useRef<FormHandles>(null);

  const { addToast } = useToast();

  //funções
  const handleSubmit = useCallback(
    async (data: ForgotPasswordFormData) => {
      try {
        setLoading(true);
        formRef.current?.setErrors({});
        const schema = yup.object().shape({
          email: yup.string().required("E-mail obrigatório").email(),
        });

        await schema.validate(data, {
          abortEarly: false,
        });

        await api.post("/password/forgot", {
          email: data.email,
        });

        addToast({
          type: "succes",
          title: "E-mail de recuperação enviado",
          description:
            "Enviamos um e-mail de recuperação. Cheque sua caixa de entrada.",
        });
      } catch (err) {
        //se for um erro do yup, tipo não digitou senha, email inválido, etc
        if (err instanceof yup.ValidationError) {
          const errors = getValidationErrors(err);
          formRef.current?.setErrors(errors);
          return;
        }
        //erros mais genéricos tipo senha/email errado; dispara um toast
        addToast({
          type: "error",
          title: "Erro na recuperação de senha",
          description: "Ocorreu um erro ao tentar recuperar a senha",
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
          <img src={logoImg} alt="GoBarber" />
          <Form ref={formRef} onSubmit={handleSubmit}>
            <h1>Recuperar senha </h1>
            <Input name="email" icon={FiMail} placeholder="E-mail"></Input>

            <Button loading={loading} name="submitButton" type="submit">
              Recuperar
            </Button>
          </Form>

          <Link to="/">
            Voltar ao login
            <FiLogIn />
          </Link>
        </AnimationContainer>
      </Content>
      <Background />
    </Container>
  );
};

//styles

const Container = styled.div`
  height: 100vh;
  display: flex;
  align-items: stretch;
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  width: 100%;
  max-width: 700px;
`;

const AppearFromLeft = keyframes`
  from {
    opacity: 0;
    transform: translateX(-50px)
  }
  to{
    opacity: 1;
    transform: translateX(0)
  }
`;

const AnimationContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  animation: ${AppearFromLeft} 1s;

  form {
    margin: 80px 0;
    width: 340px;
    text-align: center;
  }

  h1 {
    margin-bottom: 24px;
  }

  a {
    color: #f4ede8;
    display: block;
    margin-top: 24px;
    text-decoration: none;
    transition: 02s;

    &:hover {
      color: ${shade(0.2, "#f4ede8")};
    }
  }

  > a {
    color: #ff9000;
    display: block;
    margin-top: 24px;
    text-decoration: none;
    transition: 02s;

    display: flex;
    align-items: center;

    svg {
      margin-right: 16px;
    }

    &:hover {
      color: ${shade(0.2, "#ff9000")};
    }
  }
`;

const Background = styled.div`
  flex: 1;
  background: url(${SignInBackground}) no-repeat center;
  background-size: cover;
`;

export default ForgotPassword;
