import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  selectedProduts: [ ] ,
}

export const counterSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
  
    addToCart: (state, action) => {
      console.log("hhh");
    },
    increaseQuantity: (state, action) => {
      console.log("increaseQuantity");

    },
    decreaseQuantity: (state, action) => {
      console.log("decreaseQuantity");
      
    },
    deleteProduct: (state, action) => {
      console.log("delete");
    },

  },
})

export const {addToCart ,  increaseQuantity, decreaseQuantity , deleteProduct} = counterSlice.actions

export default counterSlice.reducer