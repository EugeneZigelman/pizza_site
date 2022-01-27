import React, {useState } from 'react';
import { useNavigate} from 'react-router-dom';
import { Col, Button, Form } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import CheckoutSteps from '../components/CheckoutSteps';
import { savePaymentMethod, } from '../actions/cartActions'
import FormContainer from '../components/FormContainer';
import Meta from '../components/Meta';


const PaymentScreen = () => {

  const dispatch = useDispatch();
  let navigate = useNavigate();

  const cart = useSelector(state => state.cart);
  const { shippingAddress, paymentMethod } = cart; 

  const [payment, setPayment] = useState(paymentMethod);

  if (!shippingAddress) {
    navigate('/shipping');
  }

  if (paymentMethod==='cash' || paymentMethod==='bit') {
    // Ничего не делаем
  } else {
    // Если нет метода оплаты из локального хранилища,то по умолчанию делаем наличные 'cash' // и записываем в корзину  
    setPayment('cash');
    dispatch(savePaymentMethod(payment));
  }

  

  const paymentHandler = (e) => {
    setPayment(e);
    dispatch(savePaymentMethod(e))
  }


  const submitHandler = (e) => {
    e.preventDefault();
    navigate('/placeorder');
  }

  return (
    <FormContainer>
      <Meta title='Оплата' />
      <CheckoutSteps step1 step2 step3 />

      <span className="nameText">Метод оплаты</span>

      <Form onSubmit={submitHandler} className="formRadioFromPayment p-2">
        <Form.Group >
          <Form.Label as='legend'>
            Выберите метод оплаты:
          </Form.Label>
          <Col>

            <Form.Check
              type='radio'
              label='Наличными'
              id='cash'
              readOnly
              name='paymentMethod'
              value='cash' //наличными             
              checked={payment === 'cash' ? true : false}
              onChange={(e) => paymentHandler(e.target.value)}

            >
            </Form.Check>

            <Form.Check
              type='radio'
              label='Перевод bit/paypal'
              readOnly
              id='bit'
              name='paymentMethod'
              checked={payment === 'bit' ? true : false}
              value='bit'
              onChange={(e) => paymentHandler(e.target.value)}
            >
            </Form.Check>

          </Col>
        </Form.Group>

        <Button type='submit' className="btn btn-dark p-2 mt-2 listGroupItem__add rounded">
          Продолжить
        </Button>

      </Form>


    </FormContainer>
  )
}

export default PaymentScreen
