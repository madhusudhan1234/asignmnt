import { BHANJA_USER_TOKEN } from "../constants";
import { loadState } from "./localStorage";

const isLoggedIn = () => {
  return loadState(BHANJA_USER_TOKEN) !== undefined;
};

export { isLoggedIn };
