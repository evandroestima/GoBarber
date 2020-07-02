import React, { ButtonHTMLAttributes } from "react";
import styled from "styled-components";
import { shade } from "polished";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {}

const Button: React.FC<ButtonProps> = (props) => {
  return <Container {...props} />;
};

//styles

const Container = styled.button`
  background: #ff9000;
  height: 56px;
  border: 0;
  color: #312e38;
  font-weight: 500;
  margin-top: 16px;
  border-radius: 10px;
  padding: 0 16px;
  width: 100%;
  transition: background-color 0.2s;

  &:hover {
    background: ${shade(0.2, "#ff9000")};
  }
`;

export default Button;
