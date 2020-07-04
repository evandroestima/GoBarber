import React from "react";
import styled from "styled-components";
import Toast from "./toast";
import { useTransition } from "react-spring";
import { ToastMessage } from "../hooks/Toast";

interface ToastContainerProps {
  messages: ToastMessage[];
}

const ToastContainer: React.FC<ToastContainerProps> = ({ messages }) => {
  const messagesWithTransitions = useTransition(
    messages,
    (message) => message.id,
    {
      from: { right: "-120%" },
      enter: { right: "0%" },
      leave: { right: "-120%" },
    }
  );

  return (
    <Container>
      {messagesWithTransitions.map(({ item, key, props }) => {
        return <Toast key={key} style={props} message={item}></Toast>;
      })}
    </Container>
  );
};

//styles

const Container = styled.div`
  position: absolute;
  right: 0;
  top: 0;
  padding: 30px;
  overflow: hidden;
`;

export default ToastContainer;
