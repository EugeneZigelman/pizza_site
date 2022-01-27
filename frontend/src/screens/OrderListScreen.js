import React, { useEffect } from 'react';
import { LinkContainer } from 'react-router-bootstrap';
import { Table, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../components/Message';
import Loader from '../components/Loader';
import { listOrders } from '../actions/orderActions';
import { useNavigate } from 'react-router-dom';
import Meta from '../components/Meta';


const OrderListScreen = () => {

  const dispatch = useDispatch();
  let navigate = useNavigate();

  const orderList = useSelector(state => state.orderList);
  const { loading, error, orders } = orderList;

  const userLogin = useSelector(state => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    if (userInfo && userInfo.isAdmin) {
      dispatch(listOrders());
    } else {
      navigate('/login');
    }
  }, [dispatch, userInfo, navigate,]);

  return (
    <>
      <Meta title='Список заказов' />
      <p className='p-0 m-0 nameTextOrder'>Заказы</p>
      {loading
        ? <Loader />
        : error ? <Message variant='danger'>{error}</Message>
          : (
            <Table hover responsive className='table-sm'>
              <thead className='textOrderDetails'>
                <tr>
                  <th>ID</th>
                  <th>Покупатель</th>
                  <th>Дата</th>
                  <th>Сумма</th>
                  <th>Оплачено</th>
                  <th>Доставлено</th>
                  <th></th>
                </tr>
              </thead>
              <tbody className='textOrderDetails'>
                {orders.map(order => (
                  <tr key={order._id}>
                    <td>{order._id}</td>
                    <td>{order.user && order.user.name}</td>
                    <td>${order.totalPrice}</td>
                    <td>
                      {order.createdAt.substring(0, 10)}
                    </td>
                    <td>{order.isPaid
                      ? order.paidAt.substring(0, 10)
                      : (<i className='fas fa-times' style={{ color: 'red' }}></i>)
                    }</td>
                    <td>{order.isDelivered
                      ? order.deliveredAt.substring(0, 10)
                      : (<i className='fas fa-times' style={{ color: 'red' }}></i>)
                    }</td>




                    <td>
                      <LinkContainer to={`/order/${order._id}`}>
                        <Button variant='dark' className='btn-sm'>
                          Детали заказа
                        </Button>
                      </LinkContainer>
                      
                    </td>

                  </tr>
                ))}
              </tbody>
            </Table>
          )}
    </>
  )
}

export default OrderListScreen
