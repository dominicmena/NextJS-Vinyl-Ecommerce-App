import { createContext, useReducer } from "react";
import Cookies from "js-cookie";

export const Store = createContext();

const initialState = {
  cart: Cookies.get('cart')
    ? JSON.parse(Cookies.get('cart'))
    : { cartItems: [], shippingAddress: {} },
};

function reducer(state, action) {
  switch (action.type) {
    case "CART_ADD_ITEM": {
      const newItem = action.payload;
      const existItem = state.cart.cartItems.find(
        (item) => item.slug === newItem.slug
      );
      const cartItems = existItem
        ? state.cart.cartItems.map((item) =>
            item.name === existItem.name ? newItem : item
          )
        : [...state.cart.cartItems, newItem];
      Cookies.set('cart', JSON.stringify({ ...state.cart, cartItems }));
      return { ...state, cart: { ...state.cart, cartItems } };
    }
    case "CART_REMOVE_ITEM": {
      const cartItems = state.cart.cartItems.filter(
        (item) => item.slug !== action.payload.slug ///
      );
      Cookies.set('cart', JSON.stringify({ ...state.cart, cartItems }));
      return { ...state, cart: { ...state.cart, cartItems } };
    }
    case 'CART_RESET':
        return {
            ...state,
            cart: {
                cartItems: [],
                shippingAddress: { location: {}},
                paymentMethod: '',
            },
        }
        case 'CART_CLEAR_ITEMS':
            return {...state, cart: { ...state.cart, cartItems: []}}
            
        case 'SAVE_SHIPPING_ADDRESS': 
        return {
            ...state,
            cart: {
                ...state.cart,
                shippingAddress: {
                    ...state.cart.shippingAddress,
                    ...action.payload,
                },
            },
        }
        case 'SAVE_PAYMENT_METHOD': 
        return {
            ...state,
            cart: {
                ...state.cart,
                paymentMethod: action.payload
            },
        }

    default:
      return state;
  }
}

export function StoreProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const value = { state, dispatch };
  return <Store.Provider value={value}>{children}</Store.Provider>;
}


// This code creates a React context called "Store" and a "StoreProvider" component that provides the state and a dispatch function to its children components. The state is initialized with an object containing a "cart" property that is either an empty cart or the cart stored in a browser cookie, and this state can be updated by dispatching actions to a reducer function. The reducer function handles different types of actions that can be dispatched, such as adding or removing an item from the cart, resetting the cart, saving shipping address and payment method. The updated state is then stored back into the cookie and returned as a new state.