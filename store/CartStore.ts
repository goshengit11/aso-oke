import { create } from "zustand";
import { persist } from "zustand/middleware";

type Product = {
  id: number | string;
  name: string;
  price: number;
  image: string;
};

type CartItem = Product & {
  quantity: number;
};

type CartStore = {
  cart: CartItem[];

  addToCart: (product: Product, qty?: number) => void;
  removeFromCart: (id: number | string) => void;
  increaseQty: (id: number | string) => void;
  decreaseQty: (id: number | string) => void;

  // ✅ ADD THIS
  clearCart: () => void;
};

export const useCartStore = create<CartStore>()(
  persist(
    (set) => ({
      cart: [],

      addToCart: (product, qty = 1) =>
        set((state) => {
          const existing = state.cart.find((item) => item.id === product.id);

          if (existing) {
            return {
              cart: state.cart.map((item) =>
                item.id === product.id
                  ? { ...item, quantity: item.quantity + qty }
                  : item,
              ),
            };
          }

          return {
            cart: [...state.cart, { ...product, quantity: qty }],
          };
        }),

      removeFromCart: (id) =>
        set((state) => ({
          cart: state.cart.filter((item) => item.id !== id),
        })),

      increaseQty: (id: string | number) =>
        set((state) => ({
          cart: state.cart.map((item) =>
            item.id === id ? { ...item, quantity: item.quantity + 1 } : item,
          ),
        })),

      decreaseQty: (id: string | number) =>
        set((state) => ({
          cart: state.cart
            .map((item) =>
              item.id === id ? { ...item, quantity: item.quantity - 1 } : item,
            )
            .filter((item) => item.quantity > 0),
        })),

      // ✅ IMPLEMENTATION
      clearCart: () => set({ cart: [] }),
    }),
    {
      name: "aso_oke_cart",
      partialize: (state) => ({ cart: state.cart }),
    },
  ),
);