import React, { useEffect } from "react";
import styled, { css } from "styled-components";
import {
  FiAlertCircle,
  FiXCircle,
  FiCheckCircle,
  FiInfo,
} from "react-icons/fi";
import { animated } from "react-spring";
import { ToastMessage, useToast } from "../hooks/Toast";

interface ContainerProps {
  type?: "succes" | "error" | "info";
  hasDescription: number;
}

interface ToastProps {
  message: ToastMessage;
  style: object;
}

const icons = {
  info: <FiInfo size={24} />,
  error: <FiAlertCircle size={24} />,
  succes: <FiCheckCircle size={24} />,
};

const Toast: React.FC<ToastProps> = ({ message, style }) => {
  const { removeToast } = useToast();

  useEffect(() => {
    const timer = setTimeout(() => {
      removeToast(message.id);
    }, 3000);

    return () => {
      clearTimeout(timer);
    };
  }, [removeToast, message.id]);

  return (
    //!!message.hasdescription transforma em boolean então se tiver, retorna true e tem description
    <Container
      type={message.type}
      hasDescription={Number(!!message.description)}
      style={style}
    >
      {icons[message.type || "info"]}

      <div>
        <strong>{message.title}</strong>
        {message.description && <p>{message.description}</p>}
      </div>
      <button type="button" onClick={() => removeToast(message.id)}>
        <FiXCircle size={18} />
      </button>
    </Container>
  );
};

//styles
const toastTypeVariations = {
  info: css`
    background: #ebf8ff;
    color: #3172b7;
  `,
  succes: css`
    background: #e6fffa;
    color: #2e656a;
  `,
  error: css`
    background: #e30;
    color: #fff;
  `,
};

const Container = styled(animated.div)<ContainerProps>`
  width: 360px;
  position: relative;
  padding: 16px 30px 16px 16px;
  border-radius: 10px;
  box-shadow: 2px 2px 8px rgba(0, 0, 0, 0.2);

  display: flex;

  & + div {
    margin-top: 8px;
  }

  background: #ebf8ff;
  color: #3172b7;

  /* se for do tipo succes, chama o css */
  ${(props) => toastTypeVariations[props.type || "info"]}

  /* o > serve pra pegar o svg (ícone) que está diretamente dentro do toast */
  > svg {
    margin: 4px 12px 0 0;
  }

  div {
    flex: 1;

    p {
      margin-top: 4px;
      font-size: 14px;
      opacity: 0.8;
      line-height: 20px;
    }
  }

  button {
    position: absolute;
    right: 8px;
    top: 15px;
    opacity: 0.6;
    border: 0;
    background: transparent;
    color: inherit;
  }
  /* se não tiver descrição, aplica o css */
  ${(props) =>
    !props.hasDescription &&
    css`
      align-items: center;

      svg {
        margin-top: 0;
      }
    `}
`;

export default Toast;
