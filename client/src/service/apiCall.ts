import axios from "axios";
import { response } from "../interface/interface";

const base_url = "http://localhost:4000/";

const apiCall = {
  get: async (url: string) => {
    try {
      const res = await axios.get(base_url + url);
      return apiSuccess(res.data);
    } catch (error: any) {
      return apiError(error);
    }
  },
  post: async (url: string, data: any) => {
    try {
      const token = localStorage.getItem("token");
      let res;
      if (token) {
        res = await axios.post(base_url + url, data, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
      } else {
        res = await axios.post(base_url + url, data);
      }
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
