import store from "../store/store";

export interface Review {
  rating: number;
  comment: string;
  date: Date;
  reviewerName: string;
  reviewerEmail: string;
}

export interface Dimensions {
  width: number;
  height: number;
  depth: number;
}

export interface Meta {
  createdAt: Date;
  updatedAt: Date;
  barcode: string;
  qrCode: string;
}

export interface Product {
  productId: number;
  title: string;
  description: string;
  category: string;
  price: number;
  discountPercentage: number;
  rating: number;
  stock: number;
  tags: string[];
  brand: string;
  sku: string;
  weight: number;
  dimensions: Dimensions;
  warrantyInformation: string;
  shippingInformation: string;
  availabilityStatus: string;
  reviews: Review[];
  returnPolicy: string;
  minimumOrderQuantity: number;
  meta: Meta;
  images: string[];
  thumbnail: string;
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

export interface RegisterData {
  username: string;
  password: string;
  firstName: string;
  lastName: string;
}

export interface UserProfile {
  firstName: string;
  lastName: string;
  role: "admin" | "customer" | "moderator";
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
