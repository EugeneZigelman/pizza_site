import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import {  Row, Col, Button, Form } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../components/Message';
import Loader from '../components/Loader';
import { login } from '../actions/userActions';
import FormContainer from '../components/FormContainer';
import Meta from '../components/Meta';

// Было LoginScreen = (location) без /* const location = useLocation(); */
const LoginScreen = () => {

  const location = useLocation();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const dispatch = useDispatch();

  const userLogin = useSelector(state => state.userLogin);
  const { loading, error, userInfo } = userLogin;

  const redirect = location.search ? location.search.split('=')[1] : '/';

  let navigate = useNavigate();
  // const checkoutHandler = () => {
  //   navigate('/login?redirect=shipping');
  // }


  useEffect(() => {
    if (userInfo) {
      navigate(redirect);
    }
  }, [userInfo, redirect, navigate]);

  const submitHandler = (e) => {
    e.preventDefault();
    // DISPATCH LOGIN
    dispatch(login(email, password))


  }

  return (
    <FormContainer>
      <Meta title='Авторизация' />
      <h1>Sign in</h1>
      {error && <Message variant='danger'>{error}</Message>}
      {loading && <Loader />}
      <Form onSubmit={submitHandler}>

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
            placeholder='Enter password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          >
          </Form.Control>
        </Form.Group>

        <Button type='submit' className="btn btn-dark p-2 mt-2 listGroupItem__add rounded">
          Войти
        </Button>

      </Form>

      <Row className='mt-2'>
        <Col md={12}>
          Новый пользователь?
          <Link
            to={redirect ? `/register?redirect=${redirect}` : '/register'}
            className="btn btn-dark p-1 m-1 listGroupItem__add rounded"
          >
            Зарегистрируйтесь
          </Link>
        </Col>
      </Row>

    </FormContainer>
  )
}

export default LoginScreen
