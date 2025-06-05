import axios from "axios";
import { response } from "../interface/interface";

const base_url = "http://localhost:4000/";

const apiCall = {
  get: async (url: string, overrideToken?: string) => {
    try {
      const token = overrideToken || localStorage.getItem("token");
      const headers = overrideToken
        ? { Authorization: `Bearer ${token}` }
        : undefined;
      const res = await axios.get(base_url + url, { headers });
      return apiSuccess(res.data);
    } catch (error: any) {
      return apiError(error);
    }
  },
  post: async (url: string, data: any, overrideToken?: string) => {
    try {
      const token = overrideToken || localStorage.getItem("token");
      const headers = overrideToken
        ? { Authorization: `Bearer ${token}` }
        : undefined;
      const res = await axios.post(base_url + url, data, { headers });
      return apiSuccess(res.data);
    } catch (error: any) {
      return apiError(error);
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
