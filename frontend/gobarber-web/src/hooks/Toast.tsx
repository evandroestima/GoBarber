import React, { createContext, useContext, useCallback, useState } from "react";
import ToastContainer from "../components/toastContainer";
import { uuid } from "uuidv4";

interface ToastContextData {
  addToast(message: Omit<ToastMessage, "id">): void;
  removeToast(id: string): void;
}

export interface ToastMessage {
  //id pra quando for fazer map, ter uma key unica
  id: string;
  type?: "succes" | "error" | "info";
  title: string;
  description?: string;
}

const ToastContext = createContext<ToastContextData>({} as ToastContextData);

const ToastProvider: React.FC = ({ children }) => {
  //estados
  const [messages, setMessages] = useState<ToastMessage[]>([]);

  //funções
  const addToast = useCallback(
    //ta desestruturando do toastmessage (sem o id) o tipo titulo e descrição
    ({ type, title, description }: Omit<ToastMessage, "id">) => {
      const id = uuid();

      const toast = {
        id,
        type,
        title,
        description,
      };
      //seta as mensagens que tão la no state la em cima, sem sobrescreve-las
      setMessages((oldMessages) => [...oldMessages, toast]);
    },
    []
  );
  const removeToast = useCallback((id: string) => {
    setMessages((oldMessages) =>
      oldMessages.filter((message) => message.id !== id)
    );
  }, []);

  return (
    <ToastContext.Provider value={{ addToast, removeToast }}>
      {children}
      <ToastContainer messages={messages} />
    </ToastContext.Provider>
  );
};

function useToast(): ToastContextData {
  const context = useContext(ToastContext);

  if (!context) {
    throw new Error("useToast must be used within a ToastProvider");
  }
  return context;
}

export { ToastProvider, useToast };
