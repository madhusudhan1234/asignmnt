import { template } from "lodash/fp";
import { CATALOG_USER_TOKEN } from "../constants";
import { LIST_PRODUCTS, PRODUCT_DETAIL } from "../constants/api";
import { loadState } from "../utils/localStorage";
import Api from "./Api";

class ProductService {
  async create(payload) {
    const res = await Api.post(
      LIST_PRODUCTS,
      payload,
      "application/x-www-form-urlencoded",
      loadState(CATALOG_USER_TOKEN)
    );

    return res.body;
  }

  async getDetail(productId, cached = true) {
    const res = await Api.get(
      template(PRODUCT_DETAIL)({ productId }),
      {},
      cached
    );

    return res.body;
  }
}

export default new ProductService();
