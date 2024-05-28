import { Pressable, Text, StyleSheet, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function LikeButton({ onChange, selected }) {
  return (
    <Pressable
      style={[styles.likeButtonBase, selected && styles.likeButtonSelected]}
      onPress={onChange}
    >
      {selected ? (
        <Ionicons name="heart" size={40} color="tomato" />
      ) : (
        <Ionicons name="heart" size={40} color="grey" />
      )}
    </Pressable>
  );
}
const styles = StyleSheet.create({
  likeButtonBase: {
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 4,
    // borderWidth: 1,
    // borderColor: "grey",
    backgroundColor: "transparent",
  },
  likeButtonSelected: {
    backgroundColor: "white",
  },
});
