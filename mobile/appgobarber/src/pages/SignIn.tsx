import React, { useCallback, useRef } from "react";
import { Image, TextInput, Alert } from "react-native";
import { Form } from "@unform/mobile";
import styled from "styled-components/native";
import { ScrollView } from "react-native";
import logoImg from "../assets/logo.png";
import Input from "../components/Input";
import Button from "../components/Button";
import Icon from "react-native-vector-icons/Feather";
import { useNavigation } from "@react-navigation/native";
import { FormHandles } from "@unform/core";
import * as yup from "yup";
import getValidationErrors from "../utils/getValidationErrors";
import api from "../services/api";
import { useAuth } from "../hooks/Auth";

interface SignInFormData {
  email: string;
  password: string;
}

const SignIn: React.FC = () => {
  const navigation = useNavigation();
  const formRef = useRef<FormHandles>(null);
  const passwordInputRef = useRef<TextInput>(null);
  const { signIn } = useAuth();

  //funções
  const handleSubmit = useCallback(
    async (data: SignInFormData) => {
      try {
        formRef.current?.setErrors({});
        const schema = yup.object().shape({
          email: yup.string().required("E-mail obrigatório").email(),
          password: yup.string().required("Senha obrigatória"),
        });

        await schema.validate(data, {
          abortEarly: false,
        });

        await signIn({
          email: data.email,
          password: data.password,
        });
      } catch (err) {
        //se for um erro do yup, tipo não digitou senha, email inválido, etc
        if (err instanceof yup.ValidationError) {
          const errors = getValidationErrors(err);
          formRef.current?.setErrors(errors);
          return;
        }
        //erros mais genéricos tipo senha/email errado; dispara um toast
        Alert.alert("Erro na autenticação", "E-mail ou senha Incorretos");
      }
    },
    //ta dependendo do signIn vindo do contexto
    [signIn]
  );

  return (
    <>
      <ScrollView
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={{ flex: 1 }}
      >
        <Container>
          <Image source={logoImg} />
          <Title>Faça seu login</Title>
          <Form onSubmit={handleSubmit} ref={formRef}>
            <Input
              name="email"
              autoCorrect={false}
              autoCapitalize="none"
              keyboardType="email-address"
              icon="mail"
              returnKeyType="next"
              onSubmitEditing={() => {
                passwordInputRef.current?.focus();
              }}
              placeholder="E-mail"
            />
            <Input
              ref={passwordInputRef}
              name="password"
              secureTextEntry
              returnKeyType="send"
              /*  onSubmitEditing={() => {
                formRef.current?.submitForm();
              }} */
              icon="lock"
              placeholder="Senha"
            />
            <Button
              onPress={() => {
                formRef.current?.submitForm();
              }}
            >
              Entrar
            </Button>
          </Form>

          <ForgotPassword onPress={() => {}}>
            <ForgotPasswordText>Esqueci minha senha</ForgotPasswordText>
          </ForgotPassword>
        </Container>
      </ScrollView>

      <CreateAccountButton
        onPress={() => {
          navigation.navigate("SignUp");
        }}
      >
        <Icon name="log-in" size={20} color="#ff9000" />
        <CreateAccountButtonText>Criar conta</CreateAccountButtonText>
      </CreateAccountButton>
    </>
  );
};

export default SignIn;

//styles

const Container = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
  padding: 0 30px;
`;

const Title = styled.Text`
  font-size: 24px;
  color: #f4ede8;
  font-family: "RobotoSlab-Medium";
  margin: 64px 0 24px;
`;
const ForgotPassword = styled.TouchableOpacity`
  margin-top: 24px;
`;

const ForgotPasswordText = styled.Text`
  color: #f4ede8;
  font-size: 16px;
  font-family: "RobotoSlab-Regular";
`;

const CreateAccountButton = styled.TouchableOpacity`
  position: absolute;
  left: 0;
  bottom: 0;
  right: 0;
  background: #321e38;
  border-top-width: 1px;
  border-color: #232129;
  padding: 16px 0;

  display: flex;
  justify-content: center;
  flex-direction: row;
`;

const CreateAccountButtonText = styled.Text`
  color: #ff9000;
  font-size: 18px;
  font-family: "RobotoSlab-Regular";
  margin-left: 16px;
`;
