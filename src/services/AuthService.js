import { BHANJA_USER_TOKEN } from "../constants";
import { DETAIL_ME, LOGIN } from "../constants/api";
import { loadState } from "../utils/localStorage";
import Api from "./Api";

class AuthService {
  async get() {
    const res = await Api.get(
      DETAIL_ME,
      {},
      false,
      loadState(BHANJA_USER_TOKEN)
    );

    return res.body;
  }

  async login(payload) {
    const res = await Api.post(LOGIN, payload, "application/json");

    return res.body;
  }
}

export default new AuthService();
