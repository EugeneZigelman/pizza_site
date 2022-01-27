import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../components/Message';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { Card, Row, Col, Button, Image, ListGroup, Form, ButtonGroup } from 'react-bootstrap';
import { addToCart, removeFromCart } from '../actions/cartActions';
import { listProducts } from '../actions/productActions';
import Meta from '../components/Meta';


const CartScreen = () => {

  const params = useParams();
  // const productId = params.id;

  // const location = useLocation();
  // const qty = (new URLSearchParams(location.search).get('qty')) ? Number((new URLSearchParams(location.search).get('qty'))) : 1;

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(listProducts('', 1));
  }, [dispatch]);

  // Список товаров из базы данных при открытии сайта
  const productList = useSelector(state => state.productList);
  const { loading, error, products, page, pages } = productList;

  const cart = useSelector(state => state.cart);
  const { cartItems } = cart;

  const { userInfo } = useSelector(state => state.userLogin);

  // useEffect(() => {
  //   if (productId) {
  //     dispatch(addToCart(productId, qty));
  //   }
  // }, [dispatch, productId, qty]);

  let navigate = useNavigate();

  // const handler = () => {
  //   console.log('hello from handler!')
  // }

  const checkoutHandler = () => {
    if (userInfo) {
      navigate('/shipping');
    } else {
      navigate('/login');
    }
  }

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

  // .product -> ._id
  return (
    <Row>
      <Meta title='Корзина' />
      <Col md={12}>

        {cartItems.length === 0
          ? <Message>
            Ваша корзина пустая <Link to='/'>Назад </Link>
          </Message>
          : (
            <>
              {cartItems.map(item => (
                <ListGroup.Item key={item.product} className="listGroupItem">
                  <Row>
                    <Col md={2} className="mx-1">
                      <Image src={item.image} alt={item.name} fluid rounded />
                    </Col>
                    <Col md={3} >
                      <Link
                        className="listGroupItem plusMinusOne"
                        to={`/product/${item.product}`}
                      >
                        {item.name}
                      </Link>

                    </Col>
                    <Col md={3} className="listGroupItem plusMinusOne">
                      {item.diameter}см<br />
                      <span className="listGroupItem plusMinusOne">₪{item.price}</span>
                    </Col>

                    <Col md={3}>
                      <ButtonGroup aria-label="Basic example">
                        <Button
                          className=" rounded m-0 px-2 py-0"
                          type='button'
                          variant='danger'
                          onClick={() => dispatch(removeFromCart(item.product, item.size, 1))}
                        >-</Button>

                        <span className="listGroupItem plusMinusOne">{item.qty}шт.</span>

                        <Button
                          className=" rounded m-0 px-2 py-0"
                          variant='success'
                          type='button'
                        
                          onClick={() => dispatch(addToCart(item.product, item.size, 1))}
                          // onClick={() => handler()}
                        >+</Button>
                      </ButtonGroup>
                    </Col >

                  </Row>

                </ListGroup.Item>
              ))}
            </>
          )}

      </Col>
      <Col md={6}>
        <Card className="mt-2 mx-1 listGroupItem">
          <ListGroup variant='flush' >
            <ListGroup.Item className="listGroupItem">
              <div className="listGroupItem__sum text-center plusMinusOne">
                Сумма за {cartItems.reduce((acc, item) => acc + item.qty, 0)}шт.
                ₪{cartItems.reduce((acc, item) => acc + item.qty * item.price, 0).toFixed(0)}
              </div>
            </ListGroup.Item>
            <ListGroup.Item className="d-grid gap-1 listGroupItem ">
              <Button className="btn btn-dark p-4 mt-2 listGroupItem__add rounded"
                disabled={cartItems.length === 0}
                onClick={checkoutHandler}
                
              >
                К Оформлению Заказа
              </Button>
            </ListGroup.Item>
          </ListGroup>
        </Card>
      </Col>

    </Row>
  )
}

export default CartScreen
