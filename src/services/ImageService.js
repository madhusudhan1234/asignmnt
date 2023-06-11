import { BHANJA_USER_TOKEN } from "../constants";
import { LIST_IMAGES } from "../constants/api";
import { loadState } from "../utils/localStorage";
import Api from "./Api";

class ImageService {
  async get(params) {
    const res = await Api.get(LIST_IMAGES, params);

    return res.body;
  }

  async create(formData) {
    const res = await Api.post(
      LIST_IMAGES,
      formData,
      "multipart/form-data",
      loadState(BHANJA_USER_TOKEN)
    );

    return res.body;
  }
}

export default new ImageService();
