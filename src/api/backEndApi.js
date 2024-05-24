import {
  shopsData,
  foodData,
  usersData,
  reservationsData,
} from "../../data/test-data/index";

import generateReservationCode from "../reservationCode";

import axios from 'axios'

//export function getShops() {
//  return shopsData;
//}

const eatbayApi = axios.create({
  baseURL: "https://eatbay-be.onrender.com/api"
})

export function getShops() {
  return eatbayApi.get('/shops')
}

export function getShopById(shop_id) {
  const [shopObject] = shopsData.filter(
    (shopData) => shopData.shop_id === Number(shop_id)
  );
  return shopObject;
}

export function getFoodByShopId(shop_id) {
  return foodData.filter((foodItem) => foodItem.shop_id === Number(shop_id));
}

export function getFoodByFoodId(food_id) {
  const [foodItem] = foodData.filter(
    (foodItem) => foodItem.food_id === Number(food_id)
  );
  return foodItem;
}

export function getReservationsByUserId(user_id) {
  const reservations = reservationsData.filter(
    (reservation) => reservation.user_id === Number(user_id)
  );
  return reservations;
}

export function deleteReservationById(reservation_id) {}

export function postReservation(shop_id, food_id, email, reservation_code) {
  const body = {
    shop_id,
    food_id,
    email,
    reservation_code,
    status: "Pending collection",
  };
}
