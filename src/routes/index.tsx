import React, { useContext, useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";

import { AppRoutes } from "./app.routes";
import { SignIn } from "../screens/SignIn";
import AuthContext from "../contexts/AuthContext";
import { ProductsProvider } from "../contexts/ProductsContext";

export function Routes() {
  const { signed } = useContext(AuthContext);

  return (
    <NavigationContainer>
      {signed ? (
        <ProductsProvider>
          <AppRoutes />
        </ProductsProvider>
      ) : (
        <SignIn />
      )}
    </NavigationContainer>
  );
}
