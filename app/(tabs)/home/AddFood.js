import { View, Text, StyleSheet, TextInput, Alert } from "react-native";
import { Stack, Redirect, useRouter } from "expo-router";
import Button from "../../components/Button";
import MapView from "react-native-maps";
import { useContext, useState } from "react";
import { UserContext } from "../../contexts/UserContext";
import { postFoodItem } from "../../../src/api/backEndApi";

export default function AddFood() {
  const { user, setUser } = useContext(UserContext);
  const [itemname, setItemName] = useState("")
  const [itemdesc, setItemDesc] = useState("")
  const [itemquantity, setItemQuantity] = useState("0")

  const router = useRouter();


  function submitFoodItem() {

    postFoodItem(user.users_shop_id, itemname, itemdesc, itemquantity)
      .then((response) => {
        Alert.alert('Success', 'Food Item created', [
          { text: 'OK' },])
        router.push("/account/ShopHome")
      })
      .catch((error) => {
        Alert.alert('Error', 'There was a problem adding the food item', [
          { text: 'OK' },])
      })
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
        initialRegion={{
          latitude: 50.95,
          longitude: -1.4,
          latitudeDelta: 0.15,
          longitudeDelta: 0.15,
        }}
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
    minHeight: 100,
    textAlignVertical: "top"
  },
});
