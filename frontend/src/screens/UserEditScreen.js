import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation, useParams, Link } from 'react-router-dom';
import { Button, Form } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../components/Message';
import Loader from '../components/Loader';
import { getUserDetails, updateUser } from '../actions/userActions';
import FormContainer from '../components/FormContainer';
import { USER_UPDATE_RESET } from '../constants/userConstants';
import Meta from '../components/Meta';


const UserEditScreen = () => {

  const location = useLocation();
  const params = useParams();

  const userId = params.id;

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [isAdmin, setIsAdmin] = useState(false);

  const dispatch = useDispatch();

  const userDetails = useSelector(state => state.userDetails);
  const { loading, error, user } = userDetails;

  const userUpdate = useSelector(state => state.userUpdate);
  const { loading: loadingUpdate, error: errorUpdate, success: successUpdate } = userUpdate;

  let navigate = useNavigate();

  useEffect(() => {
    if (successUpdate) {
      dispatch({ type: USER_UPDATE_RESET });
      navigate('/admin/userlist')
    } else {
      if (!user.name || user._id !== userId) {
        dispatch(getUserDetails(userId));
      } else {
        setName(user.name);
        setEmail(user.email);
        setIsAdmin(user.isAdmin);
      }
    }

  }, [user, dispatch, userId, successUpdate]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(updateUser({ _id: user._id, name, email, isAdmin }));

  }

  return (

    <>
      <Meta title='Редактирование покупателей' />
      <Link to='/admin/userlist' className='btn btn-light my-3'>
        Назад
      </Link>
      <FormContainer>
        <span className='p-0 m-0 nameTextOrder'>Редактирование пользователя</span>
        {loadingUpdate && <Loader />}
        {errorUpdate && <Message variant='danger'>{errorUpdate}</Message>}
        {
          loading
            ? <Loader />
            : error
              ? <Message variant='danger'> {error} </Message>
              : (
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

                  <Form.Group controlId='isAdmin'>

                    <Form.Check
                      type='checkbox'
                      label='Администратор'
                      checked={isAdmin}
                      onChange={(e) => setIsAdmin(e.target.checked)}
                    >
                    </Form.Check>
                  </Form.Group>



                  <Button type='submit' variant='dark my-2'>
                    Обновить
                  </Button>

                </Form>
              )
        }

      </FormContainer>
    </>
  )
}

export default UserEditScreen
