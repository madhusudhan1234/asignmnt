import { LIST_SUBCATEGORIES } from "../constants/api";
import Api from "./Api";

class SubCategoryService {
  async get(params) {
    const res = await Api.get(LIST_SUBCATEGORIES, params);

    return res.body;
  }

  async create(params) {
    const res = await Api.post(
      LIST_SUBCATEGORIES,
      params,
      "application/x-www-form-urlencoded"
    );

    return res.body;
  }
}

export default new SubCategoryService();
