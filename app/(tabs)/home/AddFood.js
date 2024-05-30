import { View, Text, StyleSheet, TextInput, Alert, Image } from "react-native";
import { Stack, Redirect, useRouter, useLocalSearchParams } from "expo-router";
import Button from "../../components/Button";
import MapView from "react-native-maps";
import { useContext, useState } from "react";
import { UserContext } from "../../contexts/UserContext";
import { MapContext } from "../../contexts/MapContext";
import {
  getFollowersByShopId,
  postFoodItem,
} from "../../../src/api/backEndApi";
import { sendNotifications } from "../../../src/notifications";

export default function AddFood() {
  const { user, setUser } = useContext(UserContext);
  const { region, setRegion } = useContext(MapContext);
  const shop = useLocalSearchParams();
  const [itemname, setItemName] = useState("");
  const [itemdesc, setItemDesc] = useState("");
  const [itemquantity, setItemQuantity] = useState("");

  const router = useRouter();

  function submitFoodItem() {
    return Promise.all([
      postFoodItem(user.users_shop_id, itemname, itemdesc, itemquantity),
      getFollowersByShopId(user.users_shop_id),
    ])
      .then((values) => {
        const message = {
          title: "eatBay alert",
          body: `${shop.shop_name} at ${shop.address} has just posted some food! Checkout eatBay to see what they have available.`,
        };
        return sendNotifications(values[1], message);
      })
      .then(() => {
        Alert.alert("Success", "Food Item created and notifications sent", [
          { text: "OK" },
        ]);
        setItemName("");
        setItemDesc("");
        setItemQuantity("");
      })
      .catch((error) => {
        Alert.alert("Error", "There was a problem adding the food item", [
          { text: "OK" },
        ]);
        console.log("sendNotifications in AddFood>", error);
      });
  }

  function cancelSubmitFoodItem() {
    router.push("/account/ShopHome");
  }

  return (
    <>
      <Stack.Screen
        options={{
          headerShown: true,
          title: false, headerLeft: () => (
            <View style={{ flexDirection: 'row' }} >
              <Image
                style={{ marginRight: 10 }} 
                source={require('../../../assets/logo.png')}
              />
            </View>
          ),
        }}
      />
      { <MapView
        style={styles.map}
        provider={MapView.PROVIDER_GOOGLE}
        initialRegion={region}
      /> }
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
            title="Back"
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
    minHeight: 80,
    textAlignVertical: "top",
  },
});
