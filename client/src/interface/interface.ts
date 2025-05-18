import store from "../store";

export interface Product {
  id: string;
  name: string;
  picture: string;
  about: string;
  isActive: boolean;
}

export interface state {
  items: [] | Product[];
  loading: boolean;
  error: string | null;
}

export interface AllProductsProps {
  productData: Product[];
  getAllProducts: () => void;
}

export type Action =
  | { type: "VIEW_ALL_PRODUCTS_REQUEST" }
  | { type: "VIEW_ALL_PRODUCTS_SUCCESS"; payload: Product[] }
  | { type: "VIEW_ALL_PRODUCTS_FAILURE"; error: string };

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
