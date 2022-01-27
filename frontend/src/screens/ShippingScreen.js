import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Form } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';

import FormContainer from '../components/FormContainer';
import CheckoutSteps from '../components/CheckoutSteps';
import { saveShippingMethod, saveShippingAddress, saveShippingTelephone } from '../actions/cartActions';
import Meta from '../components/Meta';


const ShippingScreen = () => {

  const officeAddress = 'ул.Вайцман, 70a /וויצמן 70א';
  const officeCity = 'г.Нагария / נהרייה';

  const dispatch = useDispatch();
  let navigate = useNavigate();

  const cart = useSelector(state => state.cart);
  const { shippingAddress, shippingMethod, shippingTelephone } = cart;  

  const [telephone, setTelephone] = useState(shippingTelephone);
  const [shipping, setShipping] = useState(shippingMethod);
  const [address, setAddress] = useState(shippingAddress.address);
  const [city, setCity] = useState(shippingAddress.city);
  
  if (Object.keys(telephone).length === 0 && telephone.constructor === Object) {
    setTelephone('');
  }

  if (shippingMethod === 'courier' || shippingMethod === 'getbyself') {
    // Ничего не делаем
  } else {
    // Если нет метода доставки из локального хранилища,то по умолчанию делаем самовывоз
    // и записываем в корзину  
    setShipping('getbyself');
    dispatch(saveShippingMethod(shipping));
  }

  // console.log('init-', shippingMethod.data, shippingAddress.data.address, shippingAddress.data.city); 

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(saveShippingAddress(address, city));
    dispatch(saveShippingTelephone(telephone));
    navigate('/payment');
  }

  const shippingHandler = (e) => {
    setShipping(e);
    dispatch(saveShippingMethod(e));
    if (e === 'courier') {
      setAddress(shippingAddress.address);
      setCity(shippingAddress.city);
    }
    else {
      setAddress(officeAddress);
      setCity(officeCity);
    }
  }


  return (
    <FormContainer>
      <Meta title='Доставка' />
      <CheckoutSteps step1 step2 />

      <Form onSubmit={submitHandler} className="formRadioFromPayment p-2" >

        <span className="shippingAddress">Тип доставки</span>

        <Form.Check
          type='radio'
          label='Самовывоз (₪0)'
          readOnly
          id='getbyself'
          value='getbyself'
          checked={shipping === 'getbyself' ? true : false}
          name='shippingMethod'
          onChange={(e) => shippingHandler(e.target.value)}
        >
        </Form.Check>

        <Form.Check
          type='radio'
          label='Курьер по Нагарии ₪15'
          id='courier'
          name='shippingMethod'
          readOnly
          value='courier'
          checked={shipping === 'courier' ? true : false}
          onChange={(e) => shippingHandler(e.target.value)}
        >
        </Form.Check>

        <span className="shippingAddress">Телефон</span>
        <Form.Group controlId='telephone'>         
          <Form.Control
            type='text'
            placeholder='Введите телефон'
            value={telephone}
            onChange={(e) => setTelephone(e.target.value)}
            required
          >
          </Form.Control>
        </Form.Group>

        <Form.Control plaintext className='shippingAddress' readOnly value={shipping === 'courier' ? 'Адрес доставки' : 'Адрес пиццерии'} />

        <Form.Group controlId='address'>
          <Form.Label>Улица, дом</Form.Label>
          <Form.Control
            type='text'
            placeholder='Введите адрес'
            value={shipping === 'courier' ? address : officeAddress}
            onChange={(e) => setAddress(e.target.value)}
            required
          >
          </Form.Control>
        </Form.Group>

        <Form.Group controlId='city'>

          <Form.Label>Город (селение)</Form.Label>

          <Form.Control
            type='text'
            placeholder='Введите город (селение)'
            value={shipping === 'courier' ? city : officeCity}
            required
            onChange={(e) => { setCity(e.target.value) }}
          >
          </Form.Control>
        </Form.Group>






        <Button type='submit' className="btn btn-dark p-2 mt-2 listGroupItem__add rounded" >
          Продолжить
        </Button>

      </Form>
    </FormContainer >
  )
}

export default ShippingScreen
