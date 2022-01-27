import React, { useEffect } from 'react';
import { LinkContainer } from 'react-router-bootstrap';
import { Table, Button, Row, Col, } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../components/Message';
import Loader from '../components/Loader';
import { listProducts, deleteProduct, createProduct } from '../actions/productActions';
import { useNavigate } from 'react-router-dom';
import { PRODUCT_CREATE_RESET } from '../constants/productConstants';
import Paginate from '../components/Paginate';
import { useParams } from 'react-router-dom';
import Meta from '../components/Meta';


const ProductListScreen = () => {

  const params = useParams();
  const dispatch = useDispatch();
  let navigate = useNavigate();

  const pageNumber = params.pageNumber || 1;

  const productList = useSelector(state => state.productList);
  const { loading, error, products, page, pages } = productList;

  const productDelete = useSelector(state => state.productDelete);
  const { loading: loadingDelete, error: errorDelete, success: successDelete } = productDelete;

  const productCreate = useSelector(state => state.productCreate);
  const {
    loading: loadingCreate,
    error: errorCreate,
    success: successCreate,
    product: createdProduct
  } = productCreate;

  const userLogin = useSelector(state => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    dispatch({ type: PRODUCT_CREATE_RESET })
    if (!userInfo.isAdmin) {
      navigate('/login');
    }

    if (successCreate) {
      navigate(`/admin/product/${createdProduct._id}/edit`);
    } else {
      dispatch(listProducts('', pageNumber));
    }

  }, [dispatch, userInfo, navigate, successDelete,
    successCreate, createdProduct, pageNumber]);



  const deleteHandler = (id) => {
    if (window.confirm('Are you sure you want to delete?')) {
      dispatch(deleteProduct(id));
    }
  }

  const createProductHandler = () => {
    dispatch(createProduct());
  }

  return (
    <>
      <Meta title='Список товаров' />
      <Row className='align-items-center'>
        <Col>
          <h1 style={{ color: 'yellow' }}>Товары</h1>
        </Col>
        <Col className='text-right' >
          <Button className='my-3' onClick={createProductHandler}>
            <i className='fas fa-plus' style={{ color: 'yellow' }}></i> Создать товар
          </Button>
        </Col>
      </Row>

      {loadingDelete && <Loader />}
      {errorDelete && <Message variant='danger'>{errorDelete}</Message>}

      {loadingCreate && <Loader />}
      {errorCreate && <Message variant='danger'>{errorCreate}</Message>}

      {loading
        ? <Loader />
        : error ? <Message variant='danger'>{error}</Message>
          : (
            <>
              <Table bordered hover responsive className='table-sm'>
                <thead style={{ color: 'yellow' }}>
                  <tr>
                    <th>ID</th>
                    <th>Название</th>
                    <th>Цена</th>
                    <th>Категория</th>
                    <th>Бренд</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody style={{ color: 'white' }}>
                  {products.map(product => (

                    <tr key={product._id}>
                      <td>{product._id}</td>
                      <td>{product.name}</td>
                      <td>

                        ₪{product.pizzaPrice.medium},{product.pizzaPrice.big}
                      </td>
                      <td>
                        {product.category}
                      </td>
                      <td>
                        {product.brand}
                      </td>
                      <td>

                        <LinkContainer to={`/admin/product/${product._id}/edit`}>
                          <Button variant='dark' className='btn-sm'>
                            (<i className='fas fa-edit'></i>)
                          </Button>
                        </LinkContainer>
                        <Button
                          variant='danger'
                          className='btn-sm'
                          onClick={() => {
                            deleteHandler(product._id);
                          }}
                        >
                          <i className='fas fa-trash'></i>
                        </Button>

                      </td>

                    </tr>
                  ))}
                </tbody>
              </Table>
              <Paginate pages={pages} page={page} isAdmin={true} />
            </>
          )}
    </>
  )


}

export default ProductListScreen