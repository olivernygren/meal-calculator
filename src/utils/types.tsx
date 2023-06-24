import { UnitsEnum } from "./enums/enums";

export interface Meal {
  foodItems: Array<FoodItem>;
  totalCost: number;
}

export interface FoodItem {
  name: string;
  cost: number;
  amount: FoodItemAmount;
}

export interface FoodItemAmount {
  amount: number;
  unit: UnitsEnum;
}