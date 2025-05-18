import axios from "axios";
import { Action } from "./interface/interface";
import { Dispatch } from "@reduxjs/toolkit";

const url = "http://localhost:4000";

export const ViewAllProducts = () => {
  return async (dispatch: Dispatch<Action>) => {
    dispatch({ type: "VIEW_ALL_PRODUCTS_REQUEST" });

    try {
      const response = await axios.get(`${url}/products`);
      dispatch({
        type: "VIEW_ALL_PRODUCTS_SUCCESS",
        payload: response.data,
      });
    } catch (error: any) {
      dispatch({
        type: "VIEW_ALL_PRODUCTS_FAILURE",
        error: error.message || "Failed to fetch products",
      });
    }
  };
};
