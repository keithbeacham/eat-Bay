import {
  shopsData,
  foodData,
  usersData,
  reservationsData,
} from "../../data/test-data/index";
import generateReservationCode from "../reservationCode";

export function getShops() {
  return shopsData;
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
    (reservation) =>
      reservation.user_id === user_id &&
      reservation.status === "Pending collection"
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
