import axios from "axios";

const BASE_URL = "https://boi-backend-oyws.onrender.com/api/v1";

// Axios instance
const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

const token: string =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJlOTQ4YzgxNC0xMDQwLTQ4ZTAtYjhmNi02NDYwYmEwYjRiN2IiLCJlbWFpbCI6InRlc3RAZ21haWwuY29tIiwic3RhdHVzIjoiYWN0aXZlIiwiaWF0IjoxNzgxNzg4MzEyLCJleHAiOjE3ODE4OTYzMTJ9.x10rjMT9dmkOBXmWBaUYyOdOjqStYnd0S4R6RkMsI1I";

// Helper for auth headers
const authConfig = (token: string) => ({
  headers: {
    Authorization: `Bearer ${token}`,
    Accept: "application/json",
  },
});

export const initializeAsoOkeCheckout = async (data: CheckoutPayload) => {
  try {
    const res = await api.post(
      "/products/fashion-aso-oke/checkout",
      data,
      authConfig(token),
    );

    return res.data;
  } catch (err: any) {
    throw err.response?.data || err;
  }
};

export const getProductsTok = async () => {
  try {
    const res = await api.get(
      "/products/fashion-aso-oke/products",
      token ? authConfig(token) : undefined,
    );
    return res.data;
  } catch (err: any) {
    throw err.response?.data || err;
  }
};

// ====================
// AUTH
// ====================

export const loginUser = async (data: { email: string; password: string }) => {
  try {
    const res = await api.post("/auth/login", data);
    return res.data;
  } catch (err: any) {
    throw err.response?.data || err;
  }
};

export const signupUser = async (data: {
  name: string;
  email: string;
  password: string;
}) => {
  try {
    const res = await api.post("/auth/signup", data);
    return res.data;
  } catch (err: any) {
    console.error("Signup error:", err.response?.data || err.message);
    throw err.response?.data || err;
  }
};

// Fetch products list
export const getProducts = async (token?: string) => {
  try {
    const res = await api.get(
      "/products/fashion-aso-oke/products",
      token ? authConfig(token) : undefined,
    );
    return res.data;
  } catch (err: any) {
    throw err.response?.data || err;
  }
};

// Fetch orders list
export const getOrders = async (token?: string) => {
  try {
    const res = await api.get(
      "/products/fashion-aso-oke/orders",
      token ? authConfig(token) : undefined,
    );
    return res.data;
  } catch (err: any) {
    throw err.response?.data || err;
  }
};

// ASO OKE ORDER

export interface AsoOkeOrderItem {
  product_id: string;
  quantity: number;
}

export const createAsoOkeOrder = async (
  token: string,
  items: AsoOkeOrderItem[],
) => {
  try {
    const res = await api.post(
      "/products/fashion-aso-oke/orders",
      { items },
      authConfig(token),
    );

    return res.data;
  } catch (err: any) {
    throw err.response?.data || err;
  }
};

// ASO OKE CHECKOUT

export interface CheckoutPayload {
  email: string;
  amount: number;
  callback_url: string;
  metadata?: Record<string, any>;
}

export interface UpdateAsoOkeProductPayload {
  name?: string;
  description?: string;
  price?: number;
  stock_quantity?: number;
  product_url?: string;
  is_active?: boolean;
}

export const updateAsoOkeProduct = async (
  token: string,
  productId: string,
  data: UpdateAsoOkeProductPayload,
) => {
  try {
    const res = await api.patch(
      `/products/fashion-aso-oke/products/${productId}`,
      data,
      authConfig(token),
    );

    return res.data;
  } catch (err: any) {
    throw err.response?.data || err;
  }
};

export const deleteAsoOkeProduct = async (token: string, productId: string) => {
  try {
    const res = await api.delete(
      `/products/fashion-aso-oke/products/${productId}`,
      authConfig(token),
    );

    return res.data;
  } catch (err: any) {
    throw err.response?.data || err;
  }
};

export interface CreateAsoOkeProductPayload {
  name: string;
  price: number;
  stock_quantity: number;
  description: string;
  product_url?: string;
  is_active: boolean;
}

export const createAsoOkeProduct = async (
  token: string,
  data: CreateAsoOkeProductPayload,
) => {
  try {
    const res = await api.post(
      "/products/fashion-aso-oke/products",
      data,
      authConfig(token),
    );

    return res.data;
  } catch (err: any) {
    throw err.response?.data || err;
  }
};
