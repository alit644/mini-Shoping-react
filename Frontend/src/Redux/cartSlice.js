import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  selectedProduts: JSON.parse(localStorage.getItem("userProducts")) || [],
  selectedProdutsID: JSON.parse(localStorage.getItem("userProductsID")) || [],
};

export const counterSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      let productWithQuantity = { ...action.payload, quantity: 1 };
      state.selectedProduts.push(productWithQuantity);
      state.selectedProdutsID.push(action.payload.id);
      localStorage.setItem('userProducts' , JSON.stringify(state.selectedProduts))
      localStorage.setItem('userProductsID' , JSON.stringify(state.selectedProdutsID))
    },
    increaseQuantity: (state, action) => {
      let increaseProduct = state.selectedProduts.find((item) => {
        return item.id === action.payload.id;
      });

      increaseProduct.quantity += 1;
      localStorage.setItem("userProducts",  JSON.stringify(state.selectedProduts) )
    },
    decreaseQuantity: (state, action) => {
      let decreaseProduct = state.selectedProduts.find((item) => {
        return item.id === action.payload.id;
      });
        decreaseProduct.quantity -= 1;
        if (decreaseProduct.quantity === 0) {
          //! حذف العنصر من سلة المشتريات
          let newProduct = state.selectedProduts.filter((item) => {
            return item.id !== action.payload.id
          })
          state.selectedProduts = newProduct


          //!  home حذف العنصر من  
          let delProFormHome = state.selectedProdutsID.filter((item) => {
            return item !== action.payload.id
          })
          state.selectedProdutsID = delProFormHome
      localStorage.setItem("userProductsID",  JSON.stringify(state.selectedProdutsID) )

        }
      localStorage.setItem("userProducts",  JSON.stringify(state.selectedProduts) )

    },
    deleteProduct: (state, action) => {
      let deleteProduct = state.selectedProduts.filter((item) => {
        return item.id !== action.payload.id
      })
      state.selectedProduts = deleteProduct

      let delProFormHome = state.selectedProdutsID.filter((item) => {
        return item !== action.payload.id
      })
      state.selectedProdutsID = delProFormHome
      
      localStorage.setItem("userProductsID",  JSON.stringify(state.selectedProdutsID) )
      localStorage.setItem("userProducts",  JSON.stringify(state.selectedProduts) )

    },
  },
});

export const { addToCart, increaseQuantity, decreaseQuantity, deleteProduct } =
  counterSlice.actions;

export default counterSlice.reducer;
 