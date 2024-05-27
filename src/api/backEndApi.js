import {
  shopsData,
  foodData,
  usersData,
  reservationsData,
} from "../../data/test-data/index";
import generateReservationCode from "../reservationCode";
import axios from 'axios';

const eatbayApi = axios.create({
  baseURL: "https://eatbay-be.onrender.com/api"
})

export function getShops() {
  return eatbayApi.get(`/shops`)
  .then((response) => {
    const shops = [...response.data.shops]
    shops.forEach((shop) => {
      shop.latitude = Number(shop.latitude)
      shop.longitude = Number(shop.longitude)
    })
    return shops
  })
}

export function getShopById(shop_id) {
  const [shopObject] = shopsData.filter(
    (shopData) => shopData.shop_id === Number(shop_id)
  );
  return shopObject;
}

export function getFoodByShopId(shop_id) {
  return eatbayApi.get(`/shops/${shop_id}/food`)
  .then((response) => {
    return response.data.foods
  })
}

export function getFoodByFoodId(food_id) {
  return eatbayApi.get(`/food/${food_id}`)
  .then((response) => {
    return response.data.food
  })
}

export function getReservationsByUserId(user_id) {
  return eatbayApi.get(`/users/${user_id}/reservations`)
  .then((response) => {
    const reservations = [...response.data.reservations].filter((reservation) => reservation.status === "Pending collection")
    return reservations;
  })
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

export function getReservationsByShopId(shop_id) {
  const reservations = reservationsData.filter(
    (reservation) =>
      reservation.shop_id === Number(shop_id) &&
      reservation.status === "Pending collection"
  );
  return reservations;
}

export function patchReservationByReservationId(reservation_id) {
  const body = {
    status: "sold",
  };
}
