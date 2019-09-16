import { INCREMENT, DECREMENT } from "./actionTypes";
export const increment = number => ({ type: INCREMENT, number });
export const decrement = number => ({ type: DECREMENT, number });
export function incrementAsync(number) {
  return dispatch => {
    // 1. 执行异步代码
    setTimeout(() => {
      // 2. 有结果后, 分发同步action
      dispatch(increment(number));
    }, 1000);
  };
}