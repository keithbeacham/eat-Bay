export default function generateReservationCode(food_id, user_id, shop_id) {
  const reservationCode = `Food ID:${food_id}, User ID:${user_id}, Shop ID:${shop_id} `;
  return reservationCode;
}
