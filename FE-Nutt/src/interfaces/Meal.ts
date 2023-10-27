import Food from "./Food";

export default interface Meal {
  date: string; // YYYY-MM-DD
  time: string; // HH:MM
  mealTime: "아침" | "점심" | "저녁" | "간식";
  foods: Food[];
  img: string;
}
