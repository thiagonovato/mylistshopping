import React, { createContext, useEffect, useState } from "react";
import auth from "@react-native-firebase/auth";
import { Alert } from "react-native";

interface AuthContextData {
  signed: boolean;
  user: object | null;
  signOut(): void;
  signIn(email: string, password: string): Promise<void>;
  loadingAuth: boolean;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export const AuthProvider: React.FC = ({ children }) => {
  const [loadingAuth, setLoadingAuth] = useState<boolean>(false);
  const [user, setUser] = useState<object | null>(null);

  useEffect(() => {
    auth().onAuthStateChanged((userInfo) => {
      setUser(userInfo);
    });
  }, []);

  async function signOut() {
    auth().signOut();
  }

  async function signIn(email: string, password: string) {
    setLoadingAuth(true);
    auth()
      .signInWithEmailAndPassword(email, password)
      .catch(() => {
        Alert.alert("Erro ao logar", "Verifique seus dados e tente novamente.");
      })
      .finally(() => {
        setLoadingAuth(false);
      });
  }

  return (
    <AuthContext.Provider
      value={{ signed: !!user, user, signOut, signIn, loadingAuth }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
