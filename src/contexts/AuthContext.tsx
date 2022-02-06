import React, { createContext, useEffect, useState } from "react";
import auth from "@react-native-firebase/auth";
import { GoogleSignin } from "@react-native-google-signin/google-signin";

import { Alert } from "react-native";

interface AuthContextData {
  signed: boolean;
  user: object | null;
  signOut(): void;
  signIn(email: string, password: string): Promise<void>;
  loadingAuth: boolean;
  loadingSignUp: boolean;
  loadingRecoveryPassword: boolean;
  loadingSignInWithGoogle: boolean;
  signUp(email: string, password: string): Promise<void>;
  recoveryPassword(email: string): Promise<void>;
  signInWithGoogle(): void;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export const AuthProvider: React.FC = ({ children }) => {
  const [loadingAuth, setLoadingAuth] = useState<boolean>(false);
  const [loadingSignUp, setLoadingSignUp] = useState<boolean>(false);
  const [loadingSignInWithGoogle, setLoadingSignInWithGoogle] =
    useState<boolean>(false);
  const [loadingRecoveryPassword, setLoadingRecoveryPassword] =
    useState<boolean>(false);
  const [user, setUser] = useState<object | null>(null);

  const messageError = new Map()
    .set("auth/weak-password", "Senha fraca")
    .set("auth/email-already-in-use", "Conta já existe");

  useEffect(() => {
    const subscribe = auth().onAuthStateChanged((userInfo) => {
      setUser(userInfo);
    });
    return () => subscribe();
  }, []);

  async function signOut() {
    auth().signOut();
  }

  async function signIn(email: string, password: string) {
    setLoadingAuth(true);
    auth()
      .signInWithEmailAndPassword(email, password)
      .catch(() => {
        Alert.alert("Erro", "Verifique seus dados e tente novamente.");
      })
      .finally(() => {
        setLoadingAuth(false);
      });
  }

  async function signInWithGoogle() {
    try {
      setLoadingSignInWithGoogle(true);
      const { idToken } = await GoogleSignin.signIn();
      const googleCredential = auth.GoogleAuthProvider.credential(idToken);
      return auth().signInWithCredential(googleCredential);
    } finally {
      setLoadingSignInWithGoogle(false);
    }
  }
  async function signUp(email: string, password: string) {
    setLoadingSignUp(true);
    auth()
      .createUserWithEmailAndPassword(email, password)
      .then(() => {
        Alert.alert("", "Usuário criado com sucesso.");
      })
      .catch((error) => {
        if (messageError.has(error.code)) {
          Alert.alert("Erro", messageError.get(error.code));
        } else {
          Alert.alert("Erro", "Verifique seus dados e tente novamente.");
        }
      })
      .finally(() => {
        setLoadingSignUp(false);
      });
  }

  async function recoveryPassword(email: string) {
    setLoadingRecoveryPassword(true);
    auth()
      .sendPasswordResetEmail(email)
      .then(() => {
        Alert.alert("", "Email de recuperação enviado.");
      })
      .catch((error) => {
        if (messageError.has(error.code)) {
          Alert.alert("Erro", messageError.get(error.code));
        } else {
          Alert.alert("Erro", "Verifique seus dados e tente novamente.");
        }
      })
      .finally(() => {
        setLoadingRecoveryPassword(false);
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
        recoveryPassword,
        loadingRecoveryPassword,
        signInWithGoogle,
        loadingSignInWithGoogle,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
