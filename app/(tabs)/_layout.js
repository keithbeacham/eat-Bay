import React, { useState } from "react";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Tabs } from "expo-router";
import { UserContext } from "../contexts/UserContext";
import { MapProvider } from "../contexts/MapContext";

export default function TabLayout() {
  const [user, setUser] = useState({
    isLoggedIn: false,
    user_id: "test",
    type: "customer",
    users_shop_id: 9,
  });

  return (
    <MapProvider>
      <UserContext.Provider value={{ user, setUser }}>
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
          {user.isLoggedIn ? (
            <Tabs.Screen
              name="account"
              options={{
                title: "Account",
                tabBarIcon: ({ color }) => (
                  <FontAwesome size={28} name="user" color={color} />
                ),
              }}
            />
          ) : (
            <Tabs.Screen
              name="account"
              options={{
                title: "Login",
                tabBarIcon: ({ color }) => (
                  <FontAwesome size={28} name="user" color={color} />
                ),
              }}
            />
          )}
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
      </UserContext.Provider>
    </MapProvider>
  );
}
