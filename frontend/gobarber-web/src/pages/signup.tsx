import React, { useCallback, useRef } from "react";
import styled from "styled-components";
import logoImg from "../assets/logo.svg";
import { Form } from "@unform/web";
import { FormHandles } from "@unform/core";
import SignInBackground from "../assets/cadastro.png";
import { FiArrowLeft, FiMail, FiLock, FiUser } from "react-icons/fi";
import { shade } from "polished";
import Input from "../components/input";
import Button from "../components/button";
import getValidationErrors from "../utils/getValidationErrors";
import api from "../services/api";
import * as yup from "yup";

const SignUp: React.FC = () => {
  const formRef = useRef<FormHandles>(null);

  //funções
  const handleSubmit = useCallback(async (data: object) => {
    try {
      formRef.current?.setErrors({});
      const schema = yup.object().shape({
        name: yup.string().required("Nome origatório"),
        email: yup.string().required("E-mail obrigatório").email(),
        password: yup.string().min(6, "No mínimo 6 dígitos"),
      });

      await schema.validate(data, {
        abortEarly: false,
      });
    } catch (err) {
      const errors = getValidationErrors(err);
      formRef.current?.setErrors(errors);
    }
  }, []);

  return (
    <Container>
      <Background />

      <Content>
        <img src={logoImg} alt="GoBarber" />
        <Form ref={formRef} onSubmit={handleSubmit}>
          <h1>Faça seu cadastro </h1>
          <Input name="name" icon={FiUser} placeholder="Nome"></Input>
          <Input name="email" icon={FiMail} placeholder="E-mail"></Input>
          <Input
            name="password"
            icon={FiLock}
            placeholder="Senha"
            type="password"
          ></Input>
          <Button name="submitButton" type="submit">
            Cadastrar
          </Button>
        </Form>

        <a href="/">
          Já tem uma conta?
          <FiArrowLeft />
        </a>
      </Content>
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
  place-content: center;
  align-items: center;
  width: 100%;
  max-width: 700px;

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

export default SignUp;
