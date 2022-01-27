import React from 'react';
import {  Row, Col, ListGroup} from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart} from '../actions/cartActions';
import Loader from './Loader';

const BlockAddToCart = ({ product,sizeText}) => {

  const dispatch = useDispatch();  

  // console.log(sizeText);

  // const productDetails = useSelector(state => state.productDetails);
  // const { loading, error, product } = productDetails;

  // console.log('product', product.pizzaDiameter.medium);

  const cart = useSelector(state => state.cart);
  const { cartItems } = cart;

  const qtyPizza = (size) => {
    const existItem = cartItems.find(
      x => (x.product === product._id && x.size === size));
    if (existItem) {
      return existItem.qty
    } else {
      return 0
    }
  }

  // Для экрана ProductScreen- big
  let clNameDiam ;
  let clNamePrice ;
  let clNameAdd ;
  let colAdd;


  // Для экрана HomeScreen- small
  if (sizeText === 'small') {
    clNameDiam = "p-1 fs-5 text-end align-self-center listGroupItem__sum ";
    clNamePrice = "p-1 fs-5 text-start align-self-center listGroupItem__sum ";
    clNameAdd = "fs-5 listGroupItem__add ";
    colAdd = 7;
  } else if (sizeText === 'big') {
    // Для экрана ProductScreen- big
    clNameDiam = "p-2 text-end align-self-center listGroupItem__sum fs-4";
    clNamePrice = "p-2 text-start align-self-center listGroupItem__sum fs-4";
    clNameAdd = "fs-4 listGroupItem__add ";
    colAdd = 6;
  }

  return (

    <>
      {
        product.pizzaDiameter.medium>0.1 ?
          <ListGroup >
            <ListGroup.Item variant="flush" className="listGroupItem text-center">

              <Row variant="flush" className="p-0 ">

                <Col className={clNameDiam} >
                  {product.pizzaDiameter.medium}см
                </Col>
                <Col className={clNamePrice}>
                  {product.pizzaPrice.medium}₪
                </Col>

                <Col md={colAdd} className="p-0">
                  <ListGroup.Item                    
                    className={clNameAdd}
                    action
                    onClick={() => {
                      dispatch(addToCart(product._id, 'medium', 1));
                    }}>
                    +В корзину<i className="fas fa-shopping-cart "></i> ({qtyPizza('medium')})
                  </ListGroup.Item>
                </Col>

              </Row>

              {product.pizzaPrice.big>0.1
                ?
                <Row className="p-0 mt-2">
                  <Col className={clNameDiam} >
                    {product.pizzaDiameter.big}см
                  </Col>
                  <Col className={clNamePrice}>
                    {product.pizzaPrice.big}₪
                  </Col>

                  <Col md={colAdd} className="p-0">
                    <ListGroup.Item
                      className={clNameAdd}
                      action
                      onClick={() => {
                        dispatch(addToCart(product._id, 'big', 1));
                      }}>
                      +В корзину<i className="fas fa-shopping-cart "></i> ({qtyPizza('big')})
                    </ListGroup.Item>
                  </Col>

                </Row>
                :
                <></>
              }

            </ListGroup.Item>
          </ListGroup>

          : <Loader />
      }
    </>




  )
}

export default BlockAddToCart
