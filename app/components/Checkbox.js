import { Pressable, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function Checkbox({ onChange, checked, style }) {
  return (
    <Pressable
      style={[styles.checkboxBase, checked && styles.checkboxChecked, style]}
      onPress={onChange}
    >
      {checked && <Ionicons name="checkmark" size={24} color="white" />}
    </Pressable>
  );
}
const styles = StyleSheet.create({
  checkboxBase: {
    width: 28,
    height: 28,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 4,
    borderWidth: 2,
    borderColor: "black",
    backgroundColor: "transparent",
  },
  checkboxChecked: {
    backgroundColor: "blue",
  },
});
