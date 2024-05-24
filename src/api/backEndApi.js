import { shopsData, foodData, usersData } from "../../data/test-data/index";

export function getShops() {
  return shopsData;
}

export function getShopById(shop_id) {
  return shopsData.filter((shopData) => {
    return shopData.shop_id === shop_id;
  });
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
