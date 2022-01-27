import React, { useEffect } from 'react';
import { LinkContainer } from 'react-router-bootstrap';
import { Table, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../components/Message';
import Loader from '../components/Loader';
import { listUsers, deleteUser } from '../actions/userActions';
import { useNavigate } from 'react-router-dom';
import Meta from '../components/Meta';


const UserListScreen = () => {

  const dispatch = useDispatch();
  let navigate = useNavigate();

  const userList = useSelector(state => state.userList);
  const { loading, error, users } = userList;

  const userLogin = useSelector(state => state.userLogin);
  const { userInfo } = userLogin;

  const userDelete = useSelector(state => state.userDelete);
  const { success: successDelete } = userDelete;

  useEffect(() => {
    if (userInfo && userInfo.isAdmin) {
      dispatch(listUsers());
    } else {
      navigate('/login');
    }
  }, [dispatch, userInfo, navigate,successDelete]);

  const deleteHandler = (id) => {
    if (window.confirm('Are you sure you want to delete?')) {
      dispatch(deleteUser(id));
    }    
  }

  return (
    <>
      <Meta title='Список покупателей' />
      <span className="text-center fs-3 card1 ">Users</span>
      {loading
        ? <Loader />
        : error ? <Message variant='danger'>{error}</Message>
          : (
            <Table bordered hover responsive className='table-sm text-center textOrderDetails '>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Имя</th>
                  <th>E-MAIL</th>
                  <th>ADMIN</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {users.map(user => (
                  <tr key={user._id}>
                    <td>{user._id}</td>
                    <td>{user.name}</td>
                    <td>
                      <a href={`mailto: ${user.email}`} className="text-center textOrderDetails ">{user.email}</a>
                    </td>
                    <td>{user.isAdmin
                      ? (<i className='fas fa-check' style={{ color: 'green' }}></i>)
                      : (<i className='fas fa-times' style={{ color: 'red' }}></i>)
                    }</td>
                    <td>
                      <LinkContainer to={`/admin/user/${user._id}/edit`}>
                        <Button variant='dark' className='btn-sm'>
                          (<i className='fas fa-edit'></i>)
                        </Button>
                      </LinkContainer>
                      <Button
                        variant='danger'
                        className='btn-sm'
                        onClick={() => {
                          deleteHandler(user._id);
                        }}
                      >
                        <i className='fas fa-trash'></i>
                      </Button>
                    </td>

                  </tr>
                ))}
              </tbody>
            </Table>
          )}
    </>
  )
}

export default UserListScreen
