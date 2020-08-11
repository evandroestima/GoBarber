import React, { ButtonHTMLAttributes } from "react";
import styled from "styled-components";
import { shade } from "polished";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  loading?: boolean;
};

const Button: React.FC<ButtonProps> = ({ children, loading, ...rest }) => {
  return (
    <Container type="button" {...rest}>
      {loading ? "Carregando..." : children}
    </Container>
  );
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
