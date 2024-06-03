import React, { useContext, useEffect, useState } from "react";
import { View, StyleSheet, Image } from "react-native";
import { Stack } from "expo-router";
import MapView from "react-native-maps";
import { MapContext } from "../contexts/MapContext";

export default function ScreenContainer({ children }) {
  const { region, setRegion } = useContext(MapContext);

  return (
    <>
      <Stack.Screen
        style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        options={{
          headerTitle: () => (
            <Image
              style={{ width: 80, height: 25 }}
              source={require("../../assets/logo-small.png")}
            />
          ),
          headerBackTitle: "",
          title: "",
        }}
      />
      <MapView
        style={styles.map}
        provider={MapView.PROVIDER_GOOGLE}
        initialRegion={region}
      />
      <View style={styles.pageContainer}>{children}</View>
    </>
  );
}

const styles = StyleSheet.create({
  map: {
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    height: "100%",
  },
  pageContainer: {
    position: "absolute",
    top: "5%",
    left: "10%",
    width: "80%",
    height: "90%",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(255,255,255,0.8)",
    padding: 10,
    borderRadius: 10,
  },
  shopName: {
    fontWeight: "bold",
    fontSize: 25,
    marginRight: 20,
    textAlign: "center",
  },
});
