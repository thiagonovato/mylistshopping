import React from "react";
import AppLoading from "expo-app-loading";
import { StatusBar } from "expo-status-bar";
import { ThemeProvider } from "styled-components/native";
import {
  useFonts,
  Roboto_400Regular,
  Roboto_500Medium,
} from "@expo-google-fonts/roboto";

import { Routes } from "./src/routes";
import theme from "./src/theme";
import { AuthProvider } from "./src/contexts/AuthContext";

import { GoogleSignin } from "@react-native-google-signin/google-signin";

GoogleSignin.configure({
  scopes: ["email"],
  webClientId:
    "11998200883-npbk70ffd9r3u9qvmenev94kmvgnh8el.apps.googleusercontent.com",
  offlineAccess: true,
});

export default function App() {
  const [fontsLoaded] = useFonts({
    Roboto_400Regular,
    Roboto_500Medium,
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  }

  return (
    <ThemeProvider theme={theme}>
      <StatusBar style="light" />
      <AuthProvider>
        <Routes />
      </AuthProvider>
    </ThemeProvider>
  );
}
