import React, { useEffect, useState } from 'react';
import {  useNavigate, useLocation } from 'react-router-dom';
import { Table, Row, Col, Button, Form } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { LinkContainer } from 'react-router-bootstrap';
import Message from '../components/Message';
import Loader from '../components/Loader';
import { getUserDetails, updateUserProfile } from '../actions/userActions';
import { orderListMyOrders } from '../actions/orderActions';
import { USER_UPDATE_PROFILE_RESET } from '../constants/userConstants';
import Meta from '../components/Meta';


const ProfileScreen = () => {

  const location = useLocation();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState(null);

  const dispatch = useDispatch();

  const userDetails = useSelector(state => state.userDetails);
  const { loading, error, user } = userDetails;

  const userLogin = useSelector(state => state.userLogin);
  const { userInfo } = userLogin;

  const userUpdateProfile = useSelector(state => state.userUpdateProfile);
  const { success } = userUpdateProfile;

  const orderListMy = useSelector(state => state.orderListMy);
  const { loading: loadingOrders, error: errorOrders, orders } = orderListMy;

  let navigate = useNavigate();
  useEffect(() => {
    if (!userInfo) {
      navigate('/login');
    } else {
      if (!user.name || success) {
        dispatch({type: USER_UPDATE_PROFILE_RESET})
        dispatch(getUserDetails('profile'));
        dispatch(orderListMyOrders());
      } else {
        setName(user.name);
        setEmail(user.email);
      }
    }
  }, [dispatch, userInfo, navigate, user.name, user.email,success]);

  const submitHandler = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setMessage('Password do not match');
    } else {
      // DISPATCH UPDATE PROFILE
      dispatch(updateUserProfile({ id: user._id, name, email, password }));

    }
  }

  return (
    <Row>
      <Meta title='Личная страница' />
      <Col md={3}>
        <span className="shippingAddress">Профиль</span>
        {message && <Message variant='danger'>{message}</Message>}
        {error && <Message variant='danger'>{error}</Message>}
        {success && <Message variant='success'>Профиль обновлен</Message>}
        {loading && <Loader />}
        <Form onSubmit={submitHandler}>

          <Form.Group controlId='name'>
            <Form.Label>Имя</Form.Label>
            <Form.Control
              type='name'
              placeholder='Enter name'
              value={name}
              onChange={(e) => setName(e.target.value)}
            >
            </Form.Control>
          </Form.Group>

          <Form.Group controlId='email'>
            <Form.Label>E-mail</Form.Label>
            <Form.Control
              type='email'
              placeholder='Enter email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            >
            </Form.Control>
          </Form.Group>

          <Form.Group controlId='password'>
            <Form.Label>Пароль</Form.Label>
            <Form.Control
              type='password'
              placeholder='Введите пароль'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            >
            </Form.Control>
          </Form.Group>

          <Form.Group controlId='confirmPassword'>
            <Form.Label>Подтвердите пароль</Form.Label>
            <Form.Control
              type='password'
              placeholder='Подтвердите пароль'
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            >
            </Form.Control>
          </Form.Group>

          <Button type='submit' variant='dark my-2'>
            Обновить
          </Button>

        </Form>

      </Col>
      <Col md={9}>
        <span className="shippingAddress">Заказы</span>
        {loadingOrders
          ? <Loader />
          : errorOrders
            ? <Message variant='danger'>{errorOrders}</Message>
            : (
              <Table bordered hover responsive >
                <thead className='textOrderDetails'>
                  <tr>
                    <th>ID заказа</th>
                    <th>Дата</th>
                    <th>Сумма</th>
                    <th>Оплачен</th>
                    <th>Доставлен</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody className='textOrderDetails'>
                  {orders.map(order => (
                    <tr key={order._id} >
                      <td> {order._id} </td>
                      <td> {order.createdAt.substring(0, 10)} </td>
                      <td> {order.totalPrice} </td>
                      <td> {order.isPaid
                        ? order.paidAt.substring(0, 10)
                        : (
                          <i className='fas fa-times' style={{ color: 'red' }}></i>
                        )}
                      </td>
                      <td> {order.isDelivered
                        ? order.deliveredAt.substring(0, 10)
                        : (
                          <i className='fas fa-times' style={{ color: 'red' }}></i>
                        )}
                      </td>
                      <td>
                        <LinkContainer to={`/order/${order._id}`}>
                          <Button variant="dark" className='btn-sm'>
                            Детали заказа
                          </Button>
                        </LinkContainer>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            )
        }
      </Col>
    </Row>
  )
}


export default ProfileScreen
