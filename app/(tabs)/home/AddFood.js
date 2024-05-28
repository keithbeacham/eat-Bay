import { View, Text, StyleSheet, TextInput, Alert } from "react-native";
import { Stack, Redirect, useRouter } from "expo-router";
import Button from "../../components/Button";
import MapView from "react-native-maps";
import { useContext, useState } from "react";
import { UserContext } from "../../contexts/UserContext";
import { MapContext } from "../../contexts/MapContext";
import { postFoodItem } from "../../../src/api/backEndApi";

export default function AddFood() {
  const { user, setUser } = useContext(UserContext);
  const { region, setRegion } = useContext(MapContext);
  const [itemname, setItemName] = useState("");
  const [itemdesc, setItemDesc] = useState("");
  const [itemquantity, setItemQuantity] = useState("0");

  const router = useRouter();

  function submitFoodItem() {
    postFoodItem(user.users_shop_id, itemname, itemdesc, itemquantity)
      .then((response) => {
<<<<<<< HEAD
        Alert.alert('Success', 'Food Item created', [
          { text: 'OK' },])
        setItemName("")
        setItemDesc("")
        setItemQuantity("0")
       // router.push("/account/ShopHome")
=======
        Alert.alert("Success", "Food Item created", [{ text: "OK" }]);
        router.push("/account/ShopHome");
>>>>>>> 3af23c0f5f920f171a402806404878e8cd512c96
      })
      .catch((error) => {
        Alert.alert("Error", "There was a problem adding the food item", [
          { text: "OK" },
        ]);
      });
  }

  function cancelSubmitFoodItem() {
    setItemName("")
    setItemDesc("")
    setItemQuantity("0")
    router.push("/account/ShopHome")
  }

  return (
    <>
      <Stack.Screen
        options={{
          headerShown: true,
          title: "eatBay",
        }}
      />
      <MapView
        style={styles.map}
        provider={MapView.PROVIDER_GOOGLE}
        initialRegion={region}
      />
      <View style={styles.pageContainer}>
        <Text style={styles.bold25}>Add food item</Text>
        <Text>Fill in the fields below to add a new food item{"\n"}</Text>
        <>
          <TextInput
            style={styles.inputBox}
            onChangeText={(text) => setItemName(text)}
            value={itemname}
            placeholder={"Enter item name"}
          />
          <TextInput
            style={styles.multilineBox}
            onChangeText={(text) => setItemDesc(text)}
            value={itemdesc}
            placeholder={"Enter item description"}
            multiline
          />
          <TextInput
            style={styles.inputBox}
            onChangeText={(text) => setItemQuantity(text)}
            value={itemquantity}
            placeholder={"Enter quantity"}
          />
          <Button
            title="Add Item"
            onPress={() => {
              submitFoodItem();
            }}
          />
                    <Button
            title="Cancel"
            onPress={() => {
              cancelSubmitFoodItem();
            }}
          />
        </>
      </View>
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
  foodItem: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  text15: {
    fontSize: 15,
  },
  bold25: {
    fontWeight: "bold",
    fontSize: 25,
  },
  bold16: {
    fontWeight: "bold",
    fontSize: 16,
    textAlign: "center",
  },
  container: {},
  image: {
    // flex: 1,
    width: 50,
    height: 50,
    backgroundColor: "#0553",
  },
  inputBox: {
    borderWidth: 1,
    borderColor: "black",
    padding: 5,
    paddingLeft: 10,
    borderRadius: 5,
    width: "75%",
    marginBottom: 15,
  },
  multilineBox: {
    borderWidth: 1,
    borderColor: "black",
    padding: 5,
    paddingLeft: 10,
    borderRadius: 5,
    width: "75%",
    marginBottom: 15,
<<<<<<< HEAD
    minHeight: 80,
    textAlignVertical: "top"
=======
    minHeight: 100,
    textAlignVertical: "top",
>>>>>>> 3af23c0f5f920f171a402806404878e8cd512c96
  },
});
