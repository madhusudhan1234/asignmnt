import { LIST_SUBSCRIBERS } from "../constants/api";
import Api from "./Api";

class SubscriberService {
  async get() {
    const res = await Api.get(LIST_SUBSCRIBERS);

    return res.body;
  }

  async create(params) {
    const res = await Api.post(
      LIST_SUBSCRIBERS,
      params,
      "application/x-www-form-urlencoded"
    );

    return res.body;
  }
}

export default new SubscriberService();
