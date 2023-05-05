import { LIST_CATEGORIES } from "../constants/api";
import Api from "./Api";

class CategoryService {
  async get(params) {
    const res = await Api.get(LIST_CATEGORIES, params);

    return res.body;
  }

  async create(title) {
    const params = {
      title: title,
    };

    const res = await Api.post(
      LIST_CATEGORIES,
      params,
      "application/x-www-form-urlencoded"
    );

    return res.body;
  }
}

export default new CategoryService();
