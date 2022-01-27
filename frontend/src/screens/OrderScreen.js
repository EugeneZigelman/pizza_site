import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Row, Col, Image, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../components/Message';
import Loader from '../components/Loader';
import { getOrderDetails, payOrder, deliverOrder } from '../actions/orderActions';
import axios from 'axios';
import { PayPalButton } from "react-paypal-button-v2";
import { ORDER_PAY_RESET, ORDER_DELIVER_RESET } from '../constants/orderConstants'
import Meta from '../components/Meta';


const OrderScreen = () => {

  let navigate = useNavigate();

  const params = useParams();
  const orderId = params.id;
  const dispatch = useDispatch();

  const [sdkReady, setSdkReady] = useState(false);

  const orderDetails = useSelector((state) => state.orderDetails)
  const { order, loading, error } = orderDetails;

  const orderDeliver = useSelector((state) => state.orderDeliver)
  const { loading: loadingPay, success: successPay } = orderDeliver;

  const orderPay = useSelector((state) => state.orderPay)
  const { loading: loadingDeliver, success: successDeliver } = orderPay;

  // Правильно
  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin;

  if (!loading) {
    order.itemsPrice = order.orderItems.reduce((acc, item) => acc + item.qty * item.price, 0).toFixed(2);
  }

  // let navigate = useNavigate();

  /* useEffect(() => {
    dispatch(getOrderDetails(orderId));
  }, [dispatch, orderId]); */

  useEffect(() => {

    if (!userInfo) {
      navigate('/login')
    }

    const addPayPalScript = async () => {
      const { data: clientId } = await axios.get('/api/config/paypal');
      // console.log(clientId);Для проверки clientId 
      const script = document.createElement('script');
      script.type = 'text/javascript';
      script.src = `https://www.paypal.com/sdk/js?client-id=${clientId}&currency=ILS`;
      script.async = true;
      script.onload = () => {
        setSdkReady(true);
      }
      document.body.appendChild(script);
    }

    if (!order || successPay || successDeliver || order._id !== orderId) {
      // if (!order ) {
      dispatch({ type: ORDER_PAY_RESET })
      dispatch({ type: ORDER_DELIVER_RESET })
      dispatch(getOrderDetails(orderId))
      // }
    } else if (!order.isPaid) {
      if (!window.paypal) {
        addPayPalScript();
      }
    } else {
      setSdkReady(true);
    }
    // addPayPalScript() Для проверки clientId    
  }, [order, orderId, successPay, dispatch, successDeliver, userInfo, navigate]);

  const deliverHandler = () => {
    dispatch(deliverOrder(order));
  }


  const successPaymentHandler = (paymentResult) => {
    dispatch(payOrder(orderId, paymentResult));
  }

  const successPaymentHandler_fromCash = (paymentResult) => {
    paymentResult = {
      id: 42,
      status: 'completed',
      update_time: Date.now(),
      payer: {
        email_address: 'xxx'
      }
    }
    dispatch(payOrder(orderId, paymentResult));
  }

  const il = new Intl.Locale('he-IL')

  return loading
    ? <Loader />
    : error
      ? <Message variant='danger'>{error}</Message>
      : <>
        <Meta title='Заказ' />
        <div className='p-0 m-0 shippingAddress'>Заказ № {order._id}</div>
        <Row className='listGroupItem'>
          <Col md={8}>
            <div >

              <p className='p-0 m-0 nameTextOrder'>Доставка заказа</p>
              <p className='p-0 m-0'>Пользователь: {order.user.name}</p>
              <p className='p-0 m-0'>Телефон: {order.shippingTelephone}</p>
              <p className='p-0 m-0'>
                <a href={`mailto: S{order.user.email}`} className='listGroupItem'>
                  E-mail: {order.user.email}
                </a>
              </p>

              <p className='p-0 m-0'>
                Адрес: {order.shippingAddress.address}, {order.shippingAddress.city}
              </p>
              {order.isDelivered
                ? <Message variant='success'>Заказ доставлен {order.deliveredAt}</Message>
                : <Message variant='danger'>Заказ не доставлен </Message>
              }

              <p className='p-0 m-0 nameTextOrder'>Оплата заказа</p>
              <p>
                Метод оплаты: {order.paymentMethod === 'cash' ? 'наличными' : 'bit/paypal'}
              </p>
              {order.isPaid
                ? <Message variant='success'>Заказ оплачен {order.paidAt}</Message>
                : <Message variant='danger'>Заказ не оплачен</Message>
              }

              <p className='p-0 m-0 nameTextOrder'>Детали заказа</p>
              <div>
                {order.orderItems.length === 0
                  ? <Message variant='danger'> Your order is empty</Message>
                  : (

                    <div>
                      {order.orderItems.map((item, indexed) => (
                        <div key={item._id}>
                          <Row className='p-0 m-0 textOrderDetails'>
                            <Col md={2}>
                              <Image src={item.image} alt={item.name} fluid rounded />
                            </Col>
                            <Col md={5}>
                              <Link to={`/product/${item.product}`} className='p-0 m-0 textOrderDetails'>{item.name}</Link>
                            </Col>
                            <Col md={5}>
                              {item.qty} x ₪{item.price} = ₪{(item.qty * item.price).toFixed(0)}
                            </Col>
                          </Row>
                        </div>
                      ))}
                    </div>


                  )
                }
              </div>


            </div>
          </Col>

          <Col md={4} className='listGroupItem'>

            <p className='p-0 m-0 nameTextOrder'>Сумма заказа</p>

            <Row>
              <Col>
                Товары
              </Col>
              <Col>
                ₪{(Math.round(order.itemsPrice * 100) / 100).toFixed(0)}
              </Col>
            </Row>



            <Row>
              <Col>
                Доставка
              </Col>
              <Col>
                ₪{order.shippingPrice}
              </Col>
            </Row>



            <Row>
              <Col>
                Всего
              </Col>
              <Col>
                ₪{order.totalPrice}
              </Col>
            </Row>

            <p className='pt-5 mt-0 nameTextOrder'>Для подтверждения заказа сначала позвоните по телефону 0536120636!</p>

            {!order.isPaid && order.paymentMethod !== 'cash' && (
              <>
                {loadingPay && <Loader />}
                {
                  !sdkReady
                    ? <Loader />
                    :
                    <>

                      <
                        PayPalButton
                        shippingPreference="NO_SHIPPING"
                        currency="ILS"
                        amount={(Math.round(order.totalPrice * 100) / 100).toFixed(0)}
                        onSuccess={successPaymentHandler}
                      />
                    </>
                }
              </>
            )}

            {loadingDeliver && <Loader />}

            {userInfo && userInfo.isAdmin && (

              <>
                <Button
                  type='button'
                  className="btn btn-dark p-2 mt-2 listGroupItem__add rounded"
                  onClick={deliverHandler}>
                  Отметить заказ как доставленный
                </Button>

                <Button
                  type='button'
                  className="btn btn-dark p-2 mt-2 listGroupItem__add rounded"
                  onClick={successPaymentHandler_fromCash}>
                  Отметить заказ как оплаченный
                </Button>
              </>

            )}



          </Col>
        </Row >

      </>

}

export default OrderScreen

