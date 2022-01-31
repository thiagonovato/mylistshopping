import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { MaterialIcons } from "@expo/vector-icons";

import theme from "../theme";

import { Receipts } from "../screens/Receipts";
import { Products } from "../screens/Products";
import { Upload } from "../screens/Upload";
import { Platform } from "react-native";
import { Lists } from "../screens/Lists";

const { Navigator, Screen } = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

export function AppRoutes() {
  return (
    <Navigator
      screenOptions={{
        tabBarActiveTintColor: theme.COLORS.PURPLE,
        tabBarInactiveTintColor: theme.COLORS.GRAY800,
        tabBarLabelPosition: "beside-icon",
        headerShown: false,
        tabBarStyle: {
          height: 80,
          paddingVertical: Platform.OS === "ios" ? 20 : 0,
        },
        tabBarLabelStyle: {
          fontFamily: theme.FONTS.REGULAR,
        },
      }}
    >
      <Screen
        name="Listas"
        component={Lists}
        options={{
          tabBarIcon: ({ size, color }) => (
            <MaterialIcons name="shopping-cart" size={size} color={color} />
          ),
        }}
      />
      <Screen
        name="Comprovantes"
        component={Receipts}
        options={{
          tabBarIcon: ({ size, color }) => (
            <MaterialIcons name="receipt" size={size} color={color} />
          ),
        }}
      />
      <Screen
        name="Upload"
        component={Upload}
        options={{
          tabBarIcon: ({ size, color }) => (
            <MaterialIcons name="backup" size={size} color={color} />
          ),
        }}
      />
    </Navigator>
  );
}
