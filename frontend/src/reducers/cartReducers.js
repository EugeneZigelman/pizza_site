import {
  CART_ADD_ITEM, CART_REMOVE_ITEM, CART_SAVE_SHIPPING_ADDRESS,
  CART_SAVE_PAYMENT_METHOD,
  CART_SAVE_SHIPPING_METHOD,
  CART_SAVE_TELEPHONE_METHOD,
} from '../constants/cartConstants';

export const cartReducer = (state = { cartItems: [], shippingAddress: {} }, action) => {
  switch (action.type) {

    case CART_ADD_ITEM:
      const item = action.payload;

      const existItem = state.cartItems.find(
        x => (x.product === item.product && x.diameter === item.diameter));

      if (existItem) {
        // Надо увеличить существующий qty на 1
        existItem.qty += 1;

        state.cartItems.map(x => (
          x.product === existItem.product
            ? existItem
            : x
        ));

        return {
          ...state,
        }
      } else {
        return {
          ...state,
          cartItems: [...state.cartItems, item]
        }
      }

    case CART_REMOVE_ITEM:
      const itemRemove = action.payload;

      const existItemRemove = state.cartItems.find(
        x => (x.product === itemRemove.product && x.diameter === itemRemove.diameter));

      if (existItemRemove) {
        // Надо уменьшить существующий qty на 1
        existItemRemove.qty -= 1;
      }

      if (existItemRemove && existItemRemove.qty >= 1) {
        state.cartItems.map(x => (
          x.product === existItemRemove.product
            ? existItemRemove
            : x
        ));
        return {
          ...state,
        }
      } else {

        // function filterByIdAndDiameter(item) {
        //   console.log(
        //     item.diameter, existItemRemove.diameter,
        //     item.product, existItemRemove.product,
        //     (existItemRemove.diameter !== item.diameter),
        //     (existItemRemove.product !== item.product)
        //   )

        //   if (existItemRemove.diameter !== item.diameter && existItemRemove.product !== item.product) {
        //     return true
        //   }
        //   return false
        // }

        // console.log(state)
        // console.log(state.cartItems.filter(filterByIdAndDiameter))

        return {
          ...state,
          cartItems: state.cartItems.filter
            (x => (x.diameter !== existItemRemove.diameter || x.product !== existItemRemove.product))
        }
      }

    case CART_SAVE_SHIPPING_ADDRESS:
      return {
        ...state,
        shippingAddress: action.payload,
      }
    case CART_SAVE_PAYMENT_METHOD:     
      
      return {
        ...state,
        paymentMethod: action.payload,
      }
    
    case CART_SAVE_SHIPPING_METHOD:

      // console.log('hello from cartReducer!')
      
      return {
        ...state,
        shippingMethod: action.payload,
      }
    
    case CART_SAVE_TELEPHONE_METHOD:
      
      return {
        ...state,
        shippingTelephone: action.payload,
      }
    
    // eslint-disable-next-line no-fallthrough
    default:
      return state
  }


}