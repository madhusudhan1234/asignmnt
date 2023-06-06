import { template } from "lodash/fp";
import { LIST_PRODUCTS, PRODUCT_DETAIL } from "../constants/api";
import Api from "./Api";

class ProductService {
  async create(payload) {
    const res = await Api.post(
      LIST_PRODUCTS,
      payload,
      "application/x-www-form-urlencoded"
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
