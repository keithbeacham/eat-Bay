import { View, Text } from "react-native";

export default function Tab() {
  return (
    <View
      style={{
        color: "black",
        justifyContent: "center",
        alignItems: "center",
        flex: 1,
      }}
    >
      <Text style={{ color: "black" }}>Home</Text>
    </View>
  );
}
