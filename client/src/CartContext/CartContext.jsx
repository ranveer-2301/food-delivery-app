import React, { createContext, useContext, useReducer, useEffect, useCallback } from 'react';
import axios from 'axios';

const CartContext = createContext();

// REDUCER
const cartReducer = (state, action) => {
  switch (action.type) {
    case 'HYDRATE_CART' : 
    return action.payload;

    case 'ADD_ITEM': {
      const { _id, item, quantity } = action.payload;
      const exists = state.find(ci =>ci._id === _id);
      if (exists) {
        return state.map(ci =>
          ci._id === _id ? { ...ci, quantity: ci.quantity + quantity } : ci
        );
      }
      return [...state, { _id, item, quantity }];
    }

    case 'REMOVE_ITEM': {
      console.log("state in remove item ", state);
      console.log("action.payload", action.payload)
      const newState =  state.filter(ci => ci.item._id !== action.payload);
      console.log("newState in remove item ", newState);
      return newState;
    }

    case 'UPDATE_ITEM': {
      const { _id, quantity } = action.payload;
      return state.map(ci =>
        ci._id === _id ? { ...ci, quantity } : ci
      );
    }

    case 'CLEAR_CART' : 
    console.log("this is clear cart in redux")
    return [];

    default:
      return state;
  }
};

// INITIALIZER
const initializer = () => {
  // if (typeof window === 'undefined') return [];
  // const localCart = localStorage.getItem('cart');
  // return localCart ? JSON.parse(localCart) : [];

  try{
    return JSON.parse(localStorage.getItem('cart') || '[]');
  }catch {
    return [];
  }
};

export const CartProvider = ({ children }) => {
  const [cartItems, dispatch] = useReducer(cartReducer, [], initializer);

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cartItems));
  }, [cartItems]);

  // HYDRATE FROM SERVER API
  useEffect(() => {
    const token = localStorage.getItem('authToken')
    axios.get('http://localhost:5000/api/cart', {
      withCredentials: true,
      headers: {Authorization : `Bearer ${token}`},
    })
    .then(res => dispatch({ type: 'HYDRATE_CART', payload: res.data }))
    .catch(err => {if(err.response?.status !== 401) console.error(err)})
  }, []);

  // DISPATCHERS WRAPPED IN useCallback
  const addToCart = useCallback(async(item, qty) => {
    const token = localStorage.getItem('authToken')
    const res = await axios.post(
      'http://localhost:5000/api/cart',
      { itemId: item._id, quantity: qty },
      {
        withCredentials: true,
        headers: { Authorization: `Bearer ${token}` }
      }
    )
    console.log("res in addtocart", res)
    dispatch({ type: 'ADD_ITEM', payload: res.data });
  }, []);

  const removeFromCart = useCallback(async _id => {
    const token = localStorage.getItem('authToken')
    await axios.delete(
      `http://localhost:5000/api/cart/${_id}`,
      {
        withCredentials: true,
        headers: { Authorization: `Bearer ${token}` }
      }
    )
    dispatch({ type: 'REMOVE_ITEM', payload: _id  });
  }, []);

  const updateQuantity = useCallback(async(_id, qty) => {
    console.log("qty", qty)
    const token = localStorage.getItem('authToken')
    try {
          const res = await axios.post(
      `http://localhost:5000/api/cart/${_id}`,
      { quantity: qty },
      {
        withCredentials: true,
        headers: { Authorization: `Bearer ${token}` }
      }
    )
    console.log("res in update qantity", res)
    dispatch({ type: 'UPDATE_ITEM', payload: res.data });
    } catch (error) {
      console.log("error ", error)
    }
  }, []);

  const clearCart = useCallback(async() =>{
    const token = localStorage.getItem('authToken')
      console.log("token in clear cart", token)
   try {
     const res = await axios.delete(
      `http://localhost:5000/api/cart/clear`,
      {
        withCredentials: true,
        headers: { Authorization: `Bearer ${token}` }
      }
    )
    console.log("res in clear cart ", res)
   } catch (error) {
    console.log("error in clear cart", error)
   }
    dispatch({ type: 'CLEAR_CART'})
  }, [])

  const totalItems = cartItems.reduce((sum, ci) => sum + ci.quantity, 0)
  const totalAmount = cartItems.reduce((sum, ci) => {
    const price = ci?.item?.price ?? 0;
    const qty = ci?.quantity ?? 0;
    return sum + price * qty
  }, 0)

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        totalItems,
        totalAmount
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);