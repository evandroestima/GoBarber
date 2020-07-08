import React, { useCallback, useState, useContext, useEffect } from "react";
import api from "../services/api";
import { createContext } from "react";
import AsyncStorage from "@react-native-community/async-storage";

interface SignInCredentials {
  email: string;
  password: string;
}

interface AuthState {
  token: string;
  user: object;
}

interface AuthContextData {
  user: object;
  //toda vez que o metodo é assincrono, ele obrigatoriamente retorna uma promise
  signIn(credentials: SignInCredentials): Promise<void>;
  loading: boolean;
  signOut(): void;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export const AuthProvider: React.FC = ({ children }) => {
  //setStates
  const [data, setData] = useState<AuthState>({} as AuthState);
  const [loading, setLoading] = useState(true);

  //useEffects
  useEffect(() => {
    async function loadStoragedData(): Promise<void> {
      const [token, user] = await AsyncStorage.multiGet([
        "@GoBarber:token",
        "@GoBarber:user",
      ]);

      if (token[1] && user[1]) {
        setData({
          token: token[1],
          user: JSON.parse(user[1]),
        });

        setLoading(false);
      }
    }
  }, []);

  //funções
  const signOut = useCallback(async () => {
    await AsyncStorage.multiRemove(["@GoBarber:token", "@GoBarber:user"]);

    setData({} as AuthState);
  }, []);

  const signIn = useCallback(async ({ email, password }) => {
    const response = await api.post("sessions", {
      email,
      password,
    });
    const { token, user } = response.data;

    await AsyncStorage.setItem("@GoBarber:user", JSON.stringify(user));
    await AsyncStorage.setItem("@GoBarber:token", token);

    await AsyncStorage.multiSet([
      ["@GoBarber:user", JSON.stringify(user)],
      ["@GoBarber:token", token],
    ]);

    setData({ token, user });
  }, []);

  return (
    <AuthContext.Provider value={{ user: data.user, loading, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth(): AuthContextData {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  return context;
}
