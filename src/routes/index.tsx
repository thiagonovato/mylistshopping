import React, { useContext, useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { AppRoutes } from "./app.routes";
import AuthContext from "../contexts/AuthContext";
import { ProductsProvider } from "../contexts/ProductsContext";

import { SignIn } from "../screens/SignIn";
import { SignUp } from "../screens/SignUp";
import { RecoveryPassword } from "../screens/RecoveryPassword";
import { ListsProvider } from "../contexts/ListContext";
import { Products } from "../screens/Products";
import { UploadProvider } from "../contexts/UploadContext";

const Stack = createNativeStackNavigator();

export function Routes() {
  const { signed } = useContext(AuthContext);

  return (
    <NavigationContainer>
      {signed ? (
        <ListsProvider>
          <ProductsProvider>
            <UploadProvider>
              {/* <AppRoutes /> */}
              <Stack.Navigator initialRouteName="Home">
                <Stack.Screen
                  name="Home"
                  component={AppRoutes}
                  options={{ headerShown: false }}
                />
                <Stack.Screen
                  name="Products"
                  component={Products}
                  options={{ headerShown: false }}
                />
              </Stack.Navigator>
            </UploadProvider>
          </ProductsProvider>
        </ListsProvider>
      ) : (
        <Stack.Navigator initialRouteName="SignIn">
          <Stack.Screen
            name="SignIn"
            component={SignIn}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="SignUp"
            component={SignUp}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="RecoveryPassword"
            component={RecoveryPassword}
            options={{ headerShown: false }}
          />
        </Stack.Navigator>
      )}
    </NavigationContainer>
  );
}
