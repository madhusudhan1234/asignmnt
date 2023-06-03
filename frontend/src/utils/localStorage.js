import { BHANJA_USER_TOKEN } from "../constants";

const loadState = (key = BHANJA_USER_TOKEN) => {
  try {
    const serializedState = localStorage.getItem(key);
    if (serializedState === null) {
      return undefined;
    }
    return JSON.parse(serializedState);
  } catch (error) {
    return undefined;
  }
};

const saveState = (key = BHANJA_USER_TOKEN, state) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem(key, serializedState);
  } catch (error) {
    console.error(error);
  }
};

const removeState = (key = BHANJA_USER_TOKEN) => {
  try {
    localStorage.removeItem(key);
  } catch (error) {
    console.error(error);
  }
};

export { loadState, saveState, removeState };
