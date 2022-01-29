import React, { createContext, useEffect, useState } from "react";
import auth from "@react-native-firebase/auth";
import { Alert } from "react-native";

interface AuthContextData {
  signed: boolean;
  user: object | null;
  signOut(): void;
  signIn(email: string, password: string): Promise<void>;
  loadingAuth: boolean;
  loadingSignUp: boolean;
  signUp(email: string, password: string): Promise<void>;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export const AuthProvider: React.FC = ({ children }) => {
  const [loadingAuth, setLoadingAuth] = useState<boolean>(false);
  const [loadingSignUp, setLoadingSignUp] = useState<boolean>(false);
  const [user, setUser] = useState<object | null>(null);

  const messageError = new Map()
    .set("auth/weak-password", "Senha fraca")
    .set("auth/email-already-in-use", "Conta já existe");

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
  async function signUp(email: string, password: string) {
    setLoadingSignUp(true);
    auth()
      .createUserWithEmailAndPassword(email, password)
      .then(() => {
        Alert.alert("Usuário criado com sucesso.");
      })
      .catch((error) => {
        if (messageError.has(error.code)) {
          Alert.alert(messageError.get(error.code));
        } else {
          Alert.alert("Verifique seus dados e tente novamente.");
        }
      })
      .finally(() => {
        setLoadingSignUp(false);
      });
  }

  return (
    <AuthContext.Provider
      value={{
        signed: !!user,
        user,
        signOut,
        signIn,
        loadingAuth,
        signUp,
        loadingSignUp,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
