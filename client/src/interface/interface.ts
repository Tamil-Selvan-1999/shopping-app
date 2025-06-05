import store from "../store/store";

export interface Product {
  id: string;
  index: number;
  name: string;
  picture: string;
  about: string;
  isActive: boolean;
  productColor: string;
  company: string;
  address: string;
  registered: Date;
  latitude: number;
  longitude: number;
  tags: string[];
  isDue: boolean;
}

export interface ProductState {
  items: Product[];
  loading: boolean;
  error: string | null;
  isProductFetched: boolean;
}

export interface ModalState {
  showModal: boolean;
  selectedProduct: Product | null;
  isLoading: boolean;
  error: string | null;
}

export interface LoginData {
  username: string;
  password: string;
}

export interface UserProfile {
  first_name: string;
  last_name: string;
  role: "admin" | "customer";
}

export interface LoginState {
  isAdmin: boolean;
  isLoggedIn: boolean;
  loading: boolean;
  error: string | null;
  profile: UserProfile | null;
}

export interface AllProductsProps {
  productData: Product[];
  getAllProducts: () => void;
  getProduct: (item: Product) => void;
  closeModal: () => void;
}

export type response = {
  status: "success" | "fail";
  msg: string;
  data: any;
};

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
