import React from "react";
import styled from "styled-components/native";
import { RectButton, RectButtonProperties } from "react-native-gesture-handler";

interface ButtonProps extends RectButtonProperties {
  children: string;
}

const Button: React.FC<ButtonProps> = ({ children, ...rest }) => {
  return (
    <Container {...rest}>
      <ButtonText>{children}</ButtonText>
    </Container>
  );
};

export default Button;

//Styles

const Container = styled(RectButton)`
  width: 334px;
  height: 60px;
  background: #ff9000;
  border-radius: 10px;
  margin-top: 8px;

  justify-content: center;
  align-items: center;
`;

const ButtonText = styled.Text`
  font-size: 18px;
  color: #f4ede8;
  font-family: "RobotoSlab-Medium";
`;
