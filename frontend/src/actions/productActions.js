import axios from 'axios';
import {
  PRODUCT_LIST_REQUEST, PRODUCT_LIST_SUCCESS, PRODUCT_LIST_FAIL,
  PRODUCT_DETAILS_REQUEST, PRODUCT_DETAILS_SUCCESS, PRODUCT_DETAILS_FAIL, PRODUCT_DELETE_REQUEST, PRODUCT_DELETE_SUCCESS, PRODUCT_DELETE_FAIL, PRODUCT_CREATE_REQUEST, PRODUCT_CREATE_SUCCESS, PRODUCT_CREATE_FAIL, PRODUCT_CREATE_RESET, PRODUCT_UPDATE_REQUEST, PRODUCT_UPDATE_SUCCESS, PRODUCT_UPDATE_FAIL, PRODUCT_CREATE_REVIEW_REQUEST, PRODUCT_CREATE_REVIEW_SUCCESS, PRODUCT_CREATE_REVIEW_FAIL, PRODUCT_TOP_REQUEST, PRODUCT_TOP_SUCCESS, PRODUCT_TOP_FAIL
} from '../constants/productConstants.js';

// Диспетчерская 
export const listProducts = (keyword = '', pageNumber = '') => async (dispatch) => {
  try {
    //Тип действия (action)-запрос всех данных по продуктам
    dispatch({ type: PRODUCT_LIST_REQUEST });

    // console.log('keyword from listProducts', keyword);

    //Осуществляем запрос всех данных по продуктам по эндпоинту типа http://localhost:3000/api/products
    const { data } = await axios
      .get(`/api/products?keyword=${keyword}&pageNumber=${pageNumber}`);

    //Тип действия (action)-данные успешно загружены и находятся в payload: data
    dispatch({ type: PRODUCT_LIST_SUCCESS, payload: data });
  }
  catch (error) {
    dispatch({
      type: PRODUCT_LIST_FAIL,
      payload: error.response && error.response.data.message
        ? error.response.data.message
        : error.message
    });
  }
}

export const listProductDetails = (id) => async (dispatch) => {

  try {
    dispatch({ type: PRODUCT_DETAILS_REQUEST }); //Тип действия (action)-запрос всех данных по продуктам
    const { data } = await axios.get(`/api/products/${id}`);//Осуществляем запрос всех данных по продуктам по эндпоинту типа http://localhost:3000/api/products/61b1cc1c4789091f6c2308cf


    dispatch({ type: PRODUCT_DETAILS_SUCCESS, payload: data });//Тип действия (action)-данные успешно загружены и находятся в payload: data
  }
  catch (error) {
    dispatch({
      type: PRODUCT_DETAILS_FAIL,
      payload: error.response && error.response.data.message
        ? error.response.data.message
        : error.message
    });
  }
}

// Удаление продукта
export const deleteProduct = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: PRODUCT_DELETE_REQUEST,
    });

    const { userLogin: { userInfo } } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`
      },
    }

    await axios.delete(`/api/products/${id}`, config);

    dispatch({
      type: PRODUCT_DELETE_SUCCESS,
    });
  }
  catch (error) {

    dispatch({
      type: PRODUCT_DELETE_FAIL,
      payload: error.response && error.response.data.message
        ? error.response.data.message
        : error.message
    });
  }
}

// Создание одного продукта
export const createProduct = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: PRODUCT_CREATE_REQUEST,
    });

    const { userLogin: { userInfo } } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`
      },
    }

    const { data } = await axios.post(`/api/products`, {}, config);

    dispatch({
      type: PRODUCT_CREATE_SUCCESS,
      payload: data
    });
  }
  catch (error) {

    dispatch({
      type: PRODUCT_CREATE_FAIL,
      payload: error.response && error.response.data.message
        ? error.response.data.message
        : error.message
    });
  }
}

export const updateProduct = (product) => async (dispatch, getState) => {
  try {
    dispatch({
      type: PRODUCT_UPDATE_REQUEST,
    });

    const { userLogin: { userInfo } } = getState();

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`
      },
    }

    const { data } = await axios.put(`/api/products/${product._id}`, product, config);

    dispatch({
      type: PRODUCT_UPDATE_SUCCESS,
      payload: data
    });
  }
  catch (error) {

    dispatch({
      type: PRODUCT_UPDATE_FAIL,
      payload: error.response && error.response.data.message
        ? error.response.data.message
        : error.message
    });
  }
}

export const createProductReview = (productId, review) => async (dispatch, getState) => {
  try {
    dispatch({
      type: PRODUCT_CREATE_REVIEW_REQUEST,
    });

    const { userLogin: { userInfo } } = getState();

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`
      },
    }

    await axios.post(`/api/products/${productId}/reviews`, review, config);

    dispatch({
      type: PRODUCT_CREATE_REVIEW_SUCCESS,
    });
  }
  catch (error) {

    dispatch({
      type: PRODUCT_CREATE_REVIEW_FAIL,
      payload: error.response && error.response.data.message
        ? error.response.data.message
        : error.message
    });
  }
}

export const listTopProducts = () => async (dispatch) => {
  try {
    dispatch({ type: PRODUCT_TOP_REQUEST });
    const { data } = await axios.get(`/api/products/top`);
    dispatch({ type: PRODUCT_TOP_SUCCESS, payload: data });
  }
  catch (error) {
    dispatch({
      type: PRODUCT_TOP_FAIL,
      payload: error.response && error.response.data.message
        ? error.response.data.message
        : error.message
    });
  }
}


