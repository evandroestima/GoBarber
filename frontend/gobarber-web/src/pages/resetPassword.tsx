/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useCallback, useRef } from "react";
import styled, { keyframes } from "styled-components";
import { Form } from "@unform/web";
import { FormHandles } from "@unform/core";
import * as yup from "yup";
import logoImg from "../assets/logo.svg";
import SignInBackground from "../assets/sign-in-background.png";
import { FiLock } from "react-icons/fi";
import { shade } from "polished";
import Input from "../components/input";
import Button from "../components/button";
import getValidationErrors from "../utils/getValidationErrors";
import { useToast } from "../hooks/Toast";
import { useHistory, useLocation } from "react-router-dom";
import api from "../services/api";

interface resetPasswordFormData {
  password: string;
  password_confirmation: string;
}

const resetPassword: React.FC = () => {
  const formRef = useRef<FormHandles>(null);

  const { addToast } = useToast();
  const history = useHistory();
  const location = useLocation();

  //funções
  const handleSubmit = useCallback(
    async (data: resetPasswordFormData) => {
      try {
        formRef.current?.setErrors({});
        const schema = yup.object().shape({
          password: yup.string().required("Senha obrigatória"),
          password_confirmation: yup
            .string()
            .oneOf(
              [yup.ref("password"), undefined],
              "As senhas devem ser iguais"
            ),
        });

        await schema.validate(data, {
          abortEarly: false,
        });

        const token = location.search.replace("?token=", "");

        if (!token) {
          addToast({
            type: "error",
            title: "Erro ao resetar senha",
            description:
              "Ocorreu um erro ao resetar sua senha, tente novamente",
          });
          return;
        }

        await api.post("/password/reset", {
          password: data.password,
          password_confirmation: data.password_confirmation,
          token,
        });

        history.push("/");
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
          title: "Erro ao resetar senha",
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
          <img src={logoImg} alt="GoBarber" />
          <Form ref={formRef} onSubmit={handleSubmit}>
            <h1> Resetar sua senha </h1>
            <Input
              name="password"
              icon={FiLock}
              placeholder="Nova senha"
              type="password"
            ></Input>
            <Input
              name="password_confirmation"
              icon={FiLock}
              placeholder="Confirmação da senha"
              type="password"
            ></Input>
            <Button name="submitButton" type="submit">
              Alterar senha
            </Button>
          </Form>
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

export default resetPassword;
