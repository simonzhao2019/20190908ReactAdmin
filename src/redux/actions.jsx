import { INCREMENT, DECREMENT } from "./actionTypes";
export const increment = number => ({ type: INCREMENT, number });
export const decrement = number => ({ type: DECREMENT, number });