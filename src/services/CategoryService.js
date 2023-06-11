import { BHANJA_USER_TOKEN } from "../constants";
import { LIST_CATEGORIES } from "../constants/api";
import { loadState } from "../utils/localStorage";
import Api from "./Api";

class CategoryService {
  async get(cached = true) {
    const res = await Api.get(LIST_CATEGORIES, {}, cached);

    return res.body;
  }

  async create(title) {
    const params = {
      title: title,
    };

    const res = await Api.post(
      LIST_CATEGORIES,
      params,
      "application/x-www-form-urlencoded",
      loadState(BHANJA_USER_TOKEN)
    );

    return res.body;
  }
}

export default new CategoryService();
