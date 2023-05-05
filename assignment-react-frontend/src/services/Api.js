import Http from "axios";

const cache = [];
const BASE_URL = process.env.REACT_APP_API_ENDPOINT;

class Api {
  async get(resource, params = {}, cacheEnable = true) {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
      params: params,
    };

    try {
      let res = {};
      let key = encodeURIComponent(resource + JSON.stringify(params));

      if (cacheEnable && cache[key]) {
        res = cache[key];
      } else {
        res = await Http.get(`${BASE_URL}${resource}`, config);
        cache[key] = res;
      }

      return this.successResponse(res);
    } catch (error) {
      return this.errorResponse(error);
    }
  }

  async post(resource, params = {}, contentType = "multipart/form-data") {
    let config = {
      headers: {
        "Content-Type": contentType,
      },
    };

    try {
      let response = await Http.post(`${BASE_URL}${resource}`, params, config);
      return this.successResponse(response);
    } catch (error) {
      return this.errorResponse(error);
    }
  }

  successResponse(response) {
    return this.response(response);
  }

  errorResponse(error) {
    console.log(error);
    throw this.response(error.response);
  }

  response({ data, status, headers }) {
    return {
      body: data,
      status,
      headers,
    };
  }
}

export default new Api();
