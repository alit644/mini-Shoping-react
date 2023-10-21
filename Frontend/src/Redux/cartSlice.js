import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  selectedProduts: [],
};

export const counterSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      let productWithQuantity = { ...action.payload, quantity: 1 };
      state.selectedProduts.push(productWithQuantity);
    },
    increaseQuantity: (state, action) => {
      let increaseProduct = state.selectedProduts.find((item) => {
        return item.id === action.payload.id;
      });

      increaseProduct.quantity += 1;
    },
    decreaseQuantity: (state, action) => {
      let decreaseProduct = state.selectedProduts.find((item) => {
        return item.id === action.payload.id;
      });
        decreaseProduct.quantity -= 1;
        if (decreaseProduct.quantity === 0) {
          let newProduct = state.selectedProduts.filter((item) => {
            return item.id !== action.payload.id
          })
          state.selectedProduts = newProduct
        }
    },
    deleteProduct: (state, action) => {
      let deleteProduct = state.selectedProduts.filter((item) => {
        return item.id !== action.payload.id
      })
      state.selectedProduts = deleteProduct
    },
  },
});

export const { addToCart, increaseQuantity, decreaseQuantity, deleteProduct } =
  counterSlice.actions;

export default counterSlice.reducer;
