import React, { useEffect } from 'react';
import { Link, useNavigate} from 'react-router-dom';
import { Row, Col, Button, Image} from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../components/Message';
import CheckoutSteps from '../components/CheckoutSteps';
import { createOrder } from '../actions/orderActions'
import { listProducts } from '../actions/productActions';
import Meta from '../components/Meta';


// Для отправки сообщений по телеграму при получении заказа на отладке отключено,//для публичного репозитория убрал токен и закоммкентировал
// import TelegramBot from 'node-telegram-bot-api/lib/telegram.js';
// const token = 'XXX';
// const messageBot = new TelegramBot(token, { polling: true });
// let chatId;
// messageBot.on('message', (msg) => {
//   chatId = msg.chat.id;
  // send a message to the chat acknowledging receipt of their message
//   messageBot.sendMessage(chatId, 'Ваше сообщение получено...');
// });


const PlaceOrderScreen = () => {

  const dispatch = useDispatch();
  let navigate = useNavigate();

  useEffect(() => {
    dispatch(listProducts('', 1));
  }, [dispatch]);

  const productList = useSelector(state => state.productList);
  const { loading, error_product, products, page, pages } = productList;

  const cart = useSelector(state => state.cart);
  const { cartItems } = cart;

  const orderCreate = useSelector((state) => state.orderCreate);
  const { order, success, error } = orderCreate;

  const definePrice = (products, cartItems) => {
    for (let i = 0; i < cartItems.length; i++) {
      for (const product of products) {
        if (product._id === cartItems[i].product) {
          if (cartItems[i].diameter === product.pizzaDiameter.medium) {
            cartItems[i].price = product.pizzaPrice.medium;
            // console.log(i, price[i])
          } else if (cartItems[i].diameter === product.pizzaDiameter.big) {
            cartItems[i].price = product.pizzaPrice.big;
            // console.log(i, price[i])
          }
        }
      }
    }
  }

  if (products.length > 0 && !cartItems.price) {
    definePrice(products, cartItems);
  }

  useEffect(() => {
    if (success) {
      const string = 'Получен новый заказ ' + cart.shippingTelephone +' '+ cart.cartItems.length.toString()+'шт.';

      //Отправка сообщения менеджеру по телеграму при получении заказа отладке отключено
      // messageBot.sendMessage(chatId, string);

      navigate(`/order/${order._id}`);
    }
  }, [success]);

  // Calculate prices // cart.taxPrice = Number(cart.itemsPrice * 0.15).toFixed(2); Без налогов
  cart.itemsPrice = cart.cartItems.reduce((acc, item) => acc + item.qty * item.price, 0).toFixed(0);
  cart.shippingPrice = (cart.shippingMethod === 'courier' ? 15 : 0).toFixed(0);
  cart.totalPrice = Number(cart.itemsPrice) + Number(cart.shippingPrice);

  // console.log('cart.totalPrice', cart.totalPrice);

  const placeOrderHandler = () => {
    // console.log('hello from placeOrderHandler!');    

    dispatch(createOrder({
      orderItems: cart.cartItems,
      shippingAddress: cart.shippingAddress,
      paymentMethod: cart.paymentMethod,
      shippingMethod: cart.shippingMethod,
      shippingTelephone: cart.shippingTelephone,
      itemsPrice: cart.itemsPrice,
      shippingPrice: cart.shippingPrice,
      taxPrice: cart.taxPrice,
      totalPrice: cart.totalPrice,
    }));
  }

  return (
    <>
      <Meta title='Размещение заказа' />
      <CheckoutSteps step1 step2 step3 step4 />

      <Row>
        <Col md={8}>

          <div className='listGroupItem'>
            <p className='p-0 m-0 nameTextOrder'>Доставка заказа</p>

            <span>Метод доставки: </span>
            {cart.shippingMethod === 'getbyself' ? 'самовывоз' : 'курьером по Нагарии'}
            <br />
            <span>Телефон: </span>
            {cart.shippingTelephone}
            <br />
            <span>Адрес: </span>
            {cart.shippingAddress.address},
            {cart.shippingAddress.city}
          </div>

          <div className='listGroupItem'>
            <p className='p-0 m-0 nameTextOrder'>Оплата заказа</p>
            <span>Метод: </span>
            {cart.paymentMethod === 'cash' ? 'наличными' : 'перевод bit/paypal'}
          </div>


          <div className='p-0 m-0 nameTextOrder'>Детали заказа</div>

          {cart.cartItems.length === 0
            ? <Message variant='danger'> Ваша корзина пуста</Message>
            : (
              <>
                {cart.cartItems.map((item, indexed) => (

                  <Row className='p-0 m-0 textOrderDetails' key={indexed} >
                    <Col md={2}>
                      <Image src={item.image} alt={item.name} fluid rounded />
                    </Col>
                    <Col>
                      <Link to={`/product/${item.product}`} className='textOrderDetails'>{item.name}</Link>
                    </Col>
                    <Col md={5}>
                      {item.qty} x ₪{item.price} = ₪{(item.qty * item.price).toFixed(0)}
                    </Col>
                  </Row>
                ))}

              </>

            )
          }

        </Col>
        <Col md={4}>

          <div className='listGroupItem'>
            <p className='p-0 m-0 nameTextOrder'>Сумма заказа</p>

            <Row>
              <Col>
                Товары
              </Col>
              <Col>
                ₪{cart.itemsPrice}
              </Col>
            </Row>

            <Row>
              <Col>
                Доставка
              </Col>
              <Col>
                ₪{cart.shippingPrice}
              </Col>
            </Row>

            <Row>
              <Col>
                Всего
              </Col>
              <Col>
                ₪{cart.totalPrice}
              </Col>
            </Row>

            {error && <Message variant='danger'>{error}</Message>}

            <Button
              type='button'
              variant='primary my-2'
              disabled={cart.cartItems === 0}
              onClick={placeOrderHandler}
              className="btn btn-dark p-2 mt-2 listGroupItem__add rounded"
            >
              Продолжить
            </Button>
          </div>

        </Col>
      </Row>

    </>
  )
}

export default PlaceOrderScreen

