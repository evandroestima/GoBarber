import React, { useRef, useCallback } from "react";
import { Image, TextInput, Alert } from "react-native";
import { Form } from "@unform/mobile";
import styled from "styled-components/native";
import { ScrollView } from "react-native";
import getValidationErrors from "../utils/getValidationErrors";
import * as yup from "yup";
import logoImg from "../assets/logo.png";
import Input from "../components/Input";
import Button from "../components/Button";
import Icon from "react-native-vector-icons/Feather";
import { useNavigation } from "@react-navigation/native";
import { FormHandles } from "@unform/core";

interface SignUpFormData {
  name: string;
  email: string;
  password: string;
}

const SignUp: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const navigation = useNavigation();

  //refs
  const emailInputRef = useRef<TextInput>(null);
  const passwordInputRef = useRef<TextInput>(null);

  //funções
  const handleSubmit = useCallback(async (data: SignUpFormData) => {
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
      /* 
        await api.post("/users", data);

        history.push("/"); */
    } catch (err) {
      //se for um erro do yup, tipo não digitou senha, email inválido, etc
      if (err instanceof yup.ValidationError) {
        const errors = getValidationErrors(err);
        formRef.current?.setErrors(errors);
        return;
      }
      Alert.alert("Erro no cadastro, tente novamente");
    }
  }, []);

  return (
    <>
      <ScrollView
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={{ flex: 1 }}
      >
        <Container>
          <Image source={logoImg} />
          <Title>Crie sua conta</Title>
          <Form ref={formRef} onSubmit={handleSubmit}>
            <Input
              name="name"
              autoCapitalize="words"
              icon="user"
              placeholder="Nome"
              returnKeyType="next"
              onSubmitEditing={() => {
                emailInputRef.current?.focus();
              }}
            />
            <Input
              onSubmitEditing={() => {
                passwordInputRef.current?.focus();
              }}
              ref={emailInputRef}
              name="email"
              keyboardType="email-address"
              autoCorrect={false}
              autoCapitalize="none"
              icon="mail"
              placeholder="E-mail"
              returnKeyType="next"
            />
            <Input
              ref={passwordInputRef}
              name="password"
              textContentType="newPassword"
              icon="lock"
              returnKeyType="send"
              onSubmitEditing={() => formRef.current?.submitForm()}
              secureTextEntry
              placeholder="Senha"
            />

            <Button onPress={() => formRef.current?.submitForm()}>
              Entrar
            </Button>
          </Form>
        </Container>
      </ScrollView>

      <BackToSignInButton onPress={() => navigation.navigate("SignIn")}>
        <Icon name="arrow-left" size={20} color="#fff" />
        <BackToSignInButtonText>Voltar para login</BackToSignInButtonText>
      </BackToSignInButton>
    </>
  );
};

export default SignUp;

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

const BackToSignInButton = styled.TouchableOpacity`
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

const BackToSignInButtonText = styled.Text`
  color: #fff;
  font-size: 18px;
  font-family: "RobotoSlab-Regular";
  margin-left: 16px;
`;
