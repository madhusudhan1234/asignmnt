import { CATALOG_USER_TOKEN } from "../constants";
import { loadState } from "./localStorage";

const isLoggedIn = () => {
  return loadState(CATALOG_USER_TOKEN) !== undefined;
};

export { isLoggedIn };
