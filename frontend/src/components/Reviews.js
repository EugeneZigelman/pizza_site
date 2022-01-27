import React, { useEffect, useState } from 'react';
import { Row, Col, Button,  ListGroup, Form, Accordion } from 'react-bootstrap';
import { Link, useParams} from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Rating from '../components/Rating';
import { listProductDetails, createProductReview } from '../actions/productActions';

import Message from '../components/Message';

import { PRODUCT_CREATE_REVIEW_RESET } from '../constants/productConstants';


const Reviews = () => {

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

  useEffect(() => {
    if (successProductReview) {
      alert('Review successfully created');
      setRating(0);
      setComment('');
      dispatch({ type: PRODUCT_CREATE_REVIEW_RESET })
    }
    dispatch(listProductDetails(params.id))
  }, [dispatch, params, successProductReview]);


  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      createProductReview(params.id, {
        rating,
        comment,
      })
    )
  }


  return (
    <>
      {/* Отзывы */}
      <Col md={6}>
        <Row >
          <Col md={12} >
            <h5 className="listGroupItem mt-4">Отзывы</h5>
            {product.reviews.length === 0 && <Message>No Reviews</Message>}
            <ListGroup
              variant='flush'
              className="text-start"
            >
              {product.reviews.map(review => (
                <ListGroup.Item key={review._id} className="listGroupItem">
                  {review.name}
                  <Rating value={review.rating} />
                  <p> {review.createdAt.substring(0, 10)} </p>
                  {review.comment}
                </ListGroup.Item>
              ))}

              <ListGroup.Item>

                <Accordion flush >
                  <Accordion.Item eventKey="0">
                    <Accordion.Header>Напишите свой отзыв</Accordion.Header>
                    <Accordion.Body>
                      {errorProductReview &&
                        <Message variant='danger'>
                          {errorProductReview}
                        </Message>}
                      {userInfo
                        ? (
                          <Form onSubmit={submitHandler}>
                            <Form.Group controlId='rating'>
                              <Form.Label>Рейтинг</Form.Label>
                              <Form.Control
                                as='select'
                                value={rating}
                                onChange={(e) => setRating(e.target.value)}
                              >
                                <option value=''>Выберите...</option>
                                <option value='1'>1 - Плохо</option>
                                <option value='2'>2 - Посредственно</option>
                                <option value='3'>3 - Хорошо</option>
                                <option value='4'>4 - Очень хорошо</option>
                                <option value='5'>5 - Превосходно</option>
                              </Form.Control>
                            </Form.Group>
                            <Form.Group controlId='comment'>

                            </Form.Group>
                            <Form.Label>Комментарий</Form.Label>
                            <Form.Control
                              as='textarea'
                              row='3'
                              value={comment}
                              onChange={(e) => setComment(e.target.value)}
                            ></Form.Control>
                            <Button type='submit' variant='primary' className=" mt-2 font_gold">
                              Добавить отзыв
                            </Button>
                          </Form>
                        )
                        : <Message>
                          Пожалуйста, <Link to='/login'>зарегистрируйтесь</Link> для добавления отзыва
                        </Message>
                      }
                    </Accordion.Body>
                  </Accordion.Item>
                </Accordion>

              </ListGroup.Item>

            </ListGroup>
            <div className="d-grid">
              <Link size="sm" className="btn btn-dark mt-2" width="100%" to="/" >
                Назад
              </Link>
            </div>
          </Col>
        </Row>
      </Col>
    </>
  )
}

export default Reviews
