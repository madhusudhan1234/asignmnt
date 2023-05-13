import { LIST_IMAGES } from "../constants/api";
import Api from "./Api";

class ImageService {
  async get(params) {
    const res = await Api.get(LIST_IMAGES, params);

    return res.body;
  }

  async create(formData) {
    const res = await Api.post(LIST_IMAGES, formData);

    return res.body;
  }
}

export default new ImageService();
