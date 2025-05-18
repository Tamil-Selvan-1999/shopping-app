import { Action, state } from "./interface/interface";

const initState: state = {
  items: [],
  loading: false,
  error: null,
};

function productReducer(state = initState, action: Action) {
  switch (action.type) {
    case "VIEW_ALL_PRODUCTS_REQUEST":
      return {
        ...state,
        loading: true,
        error: null,
      };
    case "VIEW_ALL_PRODUCTS_SUCCESS":
      return {
        ...state,
        loading: false,
        items: action.payload,
      };
    case "VIEW_ALL_PRODUCTS_FAILURE":
      return {
        ...state,
        loading: false,
        error: action.error,
      };
    default:
      return state;
  }
}

export default productReducer;
