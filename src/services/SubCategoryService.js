import template from "lodash/fp/template";
import { BHANJA_USER_TOKEN } from "../constants";
import { LIST_SUBCATEGORIES, SUBCATEGORY_DETAIL } from "../constants/api";
import { loadState } from "../utils/localStorage";
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
      "application/x-www-form-urlencoded",
      loadState(BHANJA_USER_TOKEN)
    );

    return res.body;
  }

  async getDetail(subcategoryId, cached = true) {
    const res = await Api.get(
      template(SUBCATEGORY_DETAIL)({ subcategoryId }),
      {},
      cached
    );

    return res.body;
  }
}

export default new SubCategoryService();
