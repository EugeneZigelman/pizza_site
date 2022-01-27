import axios from 'axios'
import {
  CART_ADD_ITEM, CART_REMOVE_ITEM, CART_SAVE_SHIPPING_ADDRESS,
  CART_SAVE_PAYMENT_METHOD,
  CART_SAVE_SHIPPING_METHOD,
  CART_SAVE_TELEPHONE_METHOD
} from '../constants/cartConstants';

export const addToCart = (id, size, qty) => async (dispatch, getState) => { 
  
  console.log('hello from addToCart!')

  const { data } = await axios.get(`/api/products/${id}`);
  
// Цена пицц будет актуальной из базы данных
  dispatch({ 

    //Бежим в cartReducer--->>
    type: CART_ADD_ITEM,

    //--> Возвращаемся с добычей payload{...}-->:
    payload: {
      product: data._id,
      name: data.name,
      image: data.image,    
      diameter: data.pizzaDiameter[size],
      size: size,
      qty
    }
  });
  // console.log('после cartReducer')
  
  localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems));
}

export const removeFromCart = (id, size, qty) => async (dispatch, getState) => {

  console.log('hello from removeFromCart!')


  const { data } = await axios.get(`/api/products/${id}`);
  dispatch({
    type: CART_REMOVE_ITEM,
    payload: {
      product: data._id,
      name: data.name,
      image: data.image,
      diameter: data.pizzaDiameter[size],
      size: size,
      qty
    }
  })

  localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems));
};

export const saveShippingAddress = (address,city) => async (dispatch) => {
  dispatch({
    type: CART_SAVE_SHIPPING_ADDRESS,
    payload: {
      address: address, 
      city:city,
    }
  })
  localStorage.setItem('shippingAddress', JSON.stringify( {address, city}));
};

export const savePaymentMethod = (paymentMethod) => async (dispatch) => {
  dispatch({
    type: CART_SAVE_PAYMENT_METHOD,
    payload: paymentMethod
  })
  localStorage.setItem('paymentMethod', JSON.stringify( paymentMethod ));
};
export const saveShippingMethod = (shippingMethod) => async (dispatch) => {
  dispatch({
    type: CART_SAVE_SHIPPING_METHOD,
    payload: shippingMethod
  })
  localStorage.setItem('shippingMethod', JSON.stringify( shippingMethod ));
};


export const saveShippingTelephone = (shippingTelephone) => async (dispatch) => {
  dispatch({
    type: CART_SAVE_TELEPHONE_METHOD,
    payload: shippingTelephone
  })
  localStorage.setItem('shippingTelephone', JSON.stringify(shippingTelephone ));
};