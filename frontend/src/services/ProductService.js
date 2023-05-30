import { LIST_PRODUCTS } from "../constants/api";
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
}

export default new ProductService();
