import React from "react";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Tabs } from "expo-router";
import { UserProvider } from "../contexts/UserContext";

export default function TabLayout() {
  return (
    <UserProvider>
      <Tabs
        screenOptions={{
          tabBarActiveTintColor: "chocolate",
          headerShown: false,
        }}
      >
        <Tabs.Screen
          name="home"
          options={{
            title: "Home",
            tabBarIcon: ({ color }) => (
              <FontAwesome size={28} name="home" color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="account"
          options={{
            title: "Login/Account",
            tabBarIcon: ({ color }) => (
              <FontAwesome size={28} name="user" color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="aboutUs"
          options={{
            title: "About us",
            tabBarIcon: ({ color }) => (
              <FontAwesome size={28} name="thumbs-up" color={color} />
            ),
          }}
        />
      </Tabs>
    </UserProvider>
  );
}
