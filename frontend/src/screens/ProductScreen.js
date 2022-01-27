import React, { useEffect, useState } from 'react';
import { Row, Col, Image } from 'react-bootstrap';
import { Link, useParams} from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Rating from '../components/Rating';
import { listProductDetails} from '../actions/productActions';
import Message from '../components/Message';
import Loader from '../components/Loader';
import { PRODUCT_CREATE_REVIEW_RESET } from '../constants/productConstants';
import Meta from '../components/Meta';
import BlockAddToCart from '../components/BlockAddToCart';
import Reviews from '../components/Reviews';

const ProductScreen = () => {

  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');

  const dispatch = useDispatch();

  // Через useParams() получаем доступ из `/product/${product._id}` к _id
  const params = useParams();
  
  // const product = products.find(p => p._id === params.id);
  // console.log(product.image);

  const productDetails = useSelector(state => state.productDetails);
  const { loading, error, product } = productDetails;

  const productReviewCreate = useSelector(state => state.productReviewCreate);
  const { success: successProductReview, error: errorProductReview } = productReviewCreate;

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin;

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

  useEffect(() => {
    if (successProductReview) {
      alert('Review successfully created');
      setRating(0);
      setComment('');
      dispatch({ type: PRODUCT_CREATE_REVIEW_RESET })
    }
    dispatch(listProductDetails(params.id))
  }, [dispatch, params, successProductReview]);

  const sizeText = 'big';

  return (
    <>


      {loading
        ? <Loader />
        : error
          ? (<Message variant='danger'> {error} </Message>)
          : (
            <div className="p-0  align-self-center">
              <Meta title={product.name} />

              <Row>

                {/* Картинка товара */} {/* Название, описание товара */}
                <Col md={7}>
                  <Image src={product.image} alt={product.name} fluid width="100%" />
                </Col>

                {/*Выбор размера и количества товара */}
                <Col md={5}  >

                  <div className="Description">
                    <span className="nameText mt-2"> {product.name} </span>
                    {product.rating && product.numReviews ?
                    (<Rating
                      value={product.rating}
                      text={` ${product.numReviews} reviews`}
                      />)
                      :
                      (<></>)
                    }

                    <p className="mt-2">{`${product.description}`}</p>

                    {product.pizzaDiameter ?
                      <>
                        <BlockAddToCart product={product} sizeText={sizeText} />

                        <div className="bagItem">
                          {/* {product.name}  */}
                          <div className="bag mt-2">
                            <div className="textbag">
                              {qtyPizza('medium') * product.pizzaPrice.medium + qtyPizza('big') * product.pizzaPrice.big}₪
                            </div>
                          </div>
                        </div>
                      </>
                      : <Loader />
                    }

                    <Link size="sm"
                      className="btn btn-dark p-2 mt-2 listGroupItem__add"
                      
                      width="100%"
                      to="/cart" >
                      Оформить заказ
                    </Link>
                  </div>
                </Col>

              </Row>

              <Reviews />


            </div>

          )
      }
    </>
  )
}

export default ProductScreen