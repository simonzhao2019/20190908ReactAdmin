import { INCREMENT, DECREMENT } from "./actionTypes";
export default function count(state = 1, action) {
  console.log("count()", state, action);
  switch (action.type) {
    
    case INCREMENT:
      return state + action.number;
      break;
    case DECREMENT:
      return state - action.number;
      break;
    default:
      return state;
      break;
  }
}
