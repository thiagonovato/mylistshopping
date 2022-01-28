import React, { createContext, useEffect, useState } from "react";
import auth from "@react-native-firebase/auth";

interface AuthContextData {
  signed: boolean;
  user: object | null;
  signOut(): void;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export const AuthProvider: React.FC = ({ children }) => {
  const [user, setUser] = useState<object | null>(null);

  useEffect(() => {
    auth().onAuthStateChanged((userInfo) => {
      setUser(userInfo);
    });
  }, []);

  async function signOut() {
    auth().signOut();
  }

  return (
    <AuthContext.Provider value={{ signed: !!user, user, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
