import generateReservationCode from "../reservationCode";
import axios from "axios";

const eatbayApi = axios.create({
  baseURL: "https://eatbay-be.onrender.com/api",
});

export function getShops() {
  return eatbayApi.get(`/shops`).then((response) => {
    const shops = [...response.data.shops];
    shops.forEach((shop) => {
      shop.latitude = Number(shop.latitude);
      shop.longitude = Number(shop.longitude);
    });
    return shops;
  });
}

export function getShopById(shop_id) {
  return eatbayApi.get(`/shops/${shop_id}`).then((response) => {
    return response.data.shop;
  });
}

export function getFoodByShopId(shop_id) {
  return eatbayApi.get(`/shops/${shop_id}/food`).then((response) => {
    return response.data.foods;
  });
}

export function getFoodByFoodId(food_id) {
  return eatbayApi.get(`/food/${food_id}`).then((response) => {
    return response.data.food;
  });
}

export function getReservationsByUserId(user_id) {
  return eatbayApi.get(`/users/${user_id}/reservations`).then((response) => {
    const reservations = [...response.data.reservations].filter(
      (reservation) => reservation.status === "Pending collection"
    );
    return reservations;
  });
}

export function deleteReservationById(reservation_id) {
  return eatbayApi
    .delete(`/reservations/${reservation_id}`)
    .then((response) => {
      return;
    });
}

export function postReservation(shop_id, food_id, user_id) {
  const body = {
    shop_id,
    food_id,
    user_id,
    status: "Pending collection",
  };
  return eatbayApi.post(`/reservations`, body).then((response) => {
    return response;
  });
}

export function getReservationsByShopId(shop_id) {
  return eatbayApi.get(`/shops/${shop_id}/reservations`).then((response) => {
    const reservations = [...response.data.reservations].filter(
      (reservation) => reservation.status === "Pending collection"
    );
    return reservations;
  });
}

export function patchReservationByReservationId(reservation_id) {
  const body = {
    status: "Sold",
  };
  return eatbayApi
    .patch(`/reservations/${reservation_id}`, body)
    .then((response) => {
      return response;
    });
}

export function postFoodItem(shop_id, itemname, itemdesc, itemquantity) {
  const body = {
    shop_id: shop_id,
    item_name: itemname,
    quantity: itemquantity,
    item_description: itemdesc,
  };
  return eatbayApi.post(`/shops/${shop_id}/food`, body).then((response) => {
    return response;
  });
}

export function getFollowersByShopId(shop_id) {
  return eatbayApi.get(`/shops/${shop_id}/followers`).then((response) => {
    return response.data.followers;
  });
}

export function getUserById(user_id) {
  return eatbayApi.get(`/users/${user_id}`).then((response) => {
    return response.data.user;
  });
}

export function postFollowers(user_id, shop_id, push_token) {
  const body = { shop_id, user_id, push_token };
  return eatbayApi
    .post(`/shops/${shop_id}/followers`, body)
    .then((response) => {
      return response;
    });
}
