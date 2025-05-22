import axios from "axios";
import { Action, Product } from "../interface/interface";
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

export const ViewProduct = (item: Product) => {
  return (dispatch: Dispatch<Action>) =>
    dispatch({
      type: "VIEW_PRODUCT",
      payload: item,
    });
};

export const CloseProduct = () => {
  return (dispatch: Dispatch<Action>) =>
    dispatch({
      type: "CLOSE_PRODUCT",
    });
};

export const Login = () => {
  return async (dispatch: Dispatch) => {
    dispatch({ type: "LOGIN" });
    try {
      const response = await axios.post(`${url}/login`);
      dispatch({
        type: "LOGIN_SUCCESS",
        payload: response.data,
      });
    } catch (error: any) {
      dispatch({
        type: "LOGIN_FAILURE",
        error: error.message || "Failed to login",
      });
    }
  };
};
