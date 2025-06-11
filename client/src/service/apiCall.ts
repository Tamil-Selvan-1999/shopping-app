import axios from "axios";
import { response } from "../interface/interface";

import { BACKEND_URL } from "../config";

const apiCall = {
  get: async (url: string, overrideToken?: string) => {
    try {
      const token = overrideToken || localStorage.getItem("token");
      const headers = token ? { Authorization: `Bearer ${token}` } : undefined;
      const res = await axios.get(BACKEND_URL + "/" + url, {
        headers: headers,
      });
      return apiSuccess(res.data);
    } catch (error: any) {
      throw apiError(error);
    }
  },
  post: async (url: string, data: any, overrideToken?: string) => {
    try {
      const token = overrideToken || localStorage.getItem("token");
      const headers = token ? { Authorization: `Bearer ${token}` } : undefined;
      const res = await axios.post(BACKEND_URL + "/" + url, data, { headers });
      return apiSuccess(res.data);
    } catch (error: any) {
      throw apiError(error);
    }
  },
};

const apiSuccess = (response: response) => {
  return {
    status: response.status,
    data: response.data,
    msg: response.msg,
  };
};

const apiError = (error: any) => {
  return {
    status: "fail",
    data: {},
    msg: error?.response?.data?.msg || error.message || "",
  };
};

export default apiCall;
