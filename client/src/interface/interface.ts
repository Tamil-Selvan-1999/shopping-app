import store from "../store/store";

export interface Product {
  id: string;
  name: string;
  picture: string;
  about: string;
  isActive: boolean;
}

export interface ProductState {
  items: Product[];
  loading: boolean;
  error: string | null;
}

export interface ModalState {
  showModal: boolean;
  selectedProduct: Product | null;
}

export interface AllProductsProps {
  productData: Product[];
  getAllProducts: () => void;
  getProduct: (item: Product) => void;
  closeModal: () => void;
}

export type Action =
  | { type: "VIEW_ALL_PRODUCTS_REQUEST" }
  | { type: "VIEW_ALL_PRODUCTS_SUCCESS"; payload: Product[] }
  | { type: "VIEW_PRODUCT"; payload: Product }
  | { type: "CLOSE_PRODUCT" }
  | { type: "VIEW_ALL_PRODUCTS_FAILURE"; error: string };

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
