import React from "react";
import { Image } from "react-native";

import styled from "styled-components/native";
import { SafeAreaView } from "react-native";
import logoImg from "../assets/logo.png";

const SignIn: React.FC = () => {
  return (
    <Container>
      <Image source={logoImg} />
    </Container>
  );
};

export default SignIn;

//styles

const Container = styled.View``;
