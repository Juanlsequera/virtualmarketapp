import { createSlice } from "@reduxjs/toolkit";

const getTotalPrice = (products) => {
  return products.reduce(
    (total, product) => total + product.totalPricePerProduct,
    0
  );
};

export const shopSlice = createSlice({
  name: "shoppingCart",
  initialState: {
    products: [],
    totalPrice: null,
  },
  reducers: {
    addProduct: (state, action) => {
      const productInCart = state.products.find(
        (product) => product.sku === action.payload.sku
      );
      if (productInCart) {
        productInCart.quantity += 1;
        productInCart.totalPricePerProduct +=
          productInCart.taloPriceWithTaxAndRecharge;
      } else {
        state.products.push({
          ...action.payload,
          quantity: 1,
          totalPricePerProduct: action.payload.taloPriceWithTaxAndRecharge,
        });
      }
      state.totalPrice = getTotalPrice(state.products);
    },
    deleteItemProduct: (state, action) => {
      const productInCart = state.products.find(
        (product) => product.sku === action.payload.sku
      );
      if (productInCart) {
        if (productInCart.quantity > 1) {
          productInCart.quantity -= 1;
          productInCart.totalPricePerProduct -=
            productInCart.taloPriceWithTaxAndRecharge;
        } else {
          state.products = state.products.filter(
            (product) => product.sku !== action.payload.sku
          );
        }
      }
      state.totalPrice = getTotalPrice(state.products);
    },
    deleteProduct: (state, action) => {
      state.products = state.products.filter(
        (product) => product.sku !== action.payload.sku
      );
      state.totalPrice = getTotalPrice(state.products);
    },
    setPrice: (state, action) => {
      state.totalPrice = action.payload;
    },
    reset: (state) => {
      state.products = [];
      state.totalPrice = null;
    },
  },
});

export const { addProduct, deleteItemProduct, deleteProduct, reset } =
  shopSlice.actions;

export default shopSlice.reducer;
