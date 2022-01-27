import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Row, Col, Button, Form } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../components/Message';
import Loader from '../components/Loader';
import { register } from '../actions/userActions';
import FormContainer from '../components/FormContainer';
import Meta from '../components/Meta';


// Было LoginScreen = (location) без /* const location = useLocation(); */
const RegisterScreen = () => {

  const location = useLocation();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState(null);

  const dispatch = useDispatch();

  const userRegister = useSelector(state => state.userRegister);
  const { loading, error, userInfo } = userRegister;

  const redirect = location.search ? location.search.split('=')[1] : '/';

  let navigate = useNavigate();
  useEffect(() => {
    if (userInfo) {
      navigate(redirect);
    }
  }, [userInfo, redirect, navigate]);

  const submitHandler = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setMessage('Password do not match');
    } else {
      // DISPATCH REGISTER
      dispatch(register(name, email, password));
    }
  }

  return (
     
    <FormContainer>
      <Meta title='Регистрация' />
      <span className='p-0 m-0 nameTextOrder'>Регистрация</span>
      {message && <Message variant='danger'>{message}</Message>}
      {error && <Message variant='danger'>{error}</Message>}
      {loading && <Loader />}
      <Form onSubmit={submitHandler}>

        <Form.Group controlId='name'>
          <Form.Label>Имя</Form.Label>
          <Form.Control
            type='name'
            placeholder='Введите имя'
            value={name}
            onChange={(e) => setName(e.target.value)}
          >
          </Form.Control>
        </Form.Group>

        <Form.Group controlId='email'>
          <Form.Label>E-mail</Form.Label>
          <Form.Control
            type='email'
            placeholder='Введите email'
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

        <Button type='submit' className="btn btn-dark p-1 mt-3 listGroupItem__add rounded">
         Зарегистрироваться
        </Button>

      </Form>

      <Row className="mt-3">
        <Col>
          Уже есть аккаунт?
          <Link
            to={redirect ? `/login?redirect=${redirect}` : '/login'}
            className="btn btn-dark p-1 m-0 listGroupItem__add rounded"
          >
            Войти
          </Link>
        </Col>
      </Row>

    </FormContainer>
  )
}

export default RegisterScreen
