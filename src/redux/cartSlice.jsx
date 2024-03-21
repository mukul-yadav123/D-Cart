import { createSlice } from '@reduxjs/toolkit'
const initialState = JSON.parse(localStorage.getItem('cart')) ?? [];

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addToCart(state, action) {
            state.push(action.payload)
        },
        deleteFromCart(state, action) {
            return state.filter(item => item.description != action.payload.description);
        },
        emptyCart(state){
            state.length = 0;
        }
    }
})

export const { addToCart, deleteFromCart,emptyCart } = cartSlice.actions

export default cartSlice.reducer;