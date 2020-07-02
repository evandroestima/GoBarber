import React from "react";
import styled from "styled-components";
import logoImg from "../assets/logo.svg";
import SignInBackground from "../assets/sign-in-background.png";
import { FiLogIn, FiMail, FiLock } from "react-icons/fi";
import { shade } from "polished";
import Input from "../components/input";
import Button from "../components/button";

const SignIn: React.FC = () => {
  return (
    <Container>
      <Content>
        <img src={logoImg} alt="GoBarber" />
        <form>
          <h1>Faça seu login </h1>
          <Input name="email" icon={FiMail} placeholder="E-mail"></Input>
          <Input
            name="password"
            icon={FiLock}
            placeholder="Senha"
            type="Senha"
          ></Input>
          <Button name="submitButton" type="submit">
            Entrar
          </Button>
          <a href="forgot">Esqueci minha senha</a>
        </form>

        <a href="signup">
          Criar conta
          <FiLogIn />
        </a>
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

export default SignIn;
