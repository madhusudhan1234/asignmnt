import template from "lodash/fp/template";
import { CATALOG_USER_TOKEN } from "../constants";
import { COLLECTION_DETAIL, LIST_COLLECTIONS } from "../constants/api";
import { loadState } from "../utils/localStorage";
import Api from "./Api";

class CollectionService {
  async get(params) {
    const res = await Api.get(LIST_COLLECTIONS, params);

    return res.body;
  }

  async create(params) {
    const res = await Api.post(
      LIST_COLLECTIONS,
      params,
      "application/x-www-form-urlencoded",
      loadState(CATALOG_USER_TOKEN)
    );

    return res.body;
  }

  async getDetail(subcategoryId, cached = true) {
    const res = await Api.get(
      template(COLLECTION_DETAIL)({ subcategoryId }),
      {},
      cached
    );

    return res.body;
  }
}

export default new CollectionService();
