import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Row, Col } from 'react-bootstrap';
import Product from '../components/Product';
import Message from '../components/Message';
import Loader from '../components/Loader';
import Meta from '../components/Meta';
import { listProducts } from '../actions/productActions.js'
import { useParams, Link } from 'react-router-dom';
import Paginate from '../components/Paginate';
import ProductCarousel from '../components/ProductCarousel';



const HomeScreen = () => {

  const params = useParams();

  const keyword = params.keyword;
 
  // console.log('params', params, params.keyword);
  // console.log('keyword from HomeScreen', keyword);

  const pageNumber = params.pageNumber || 1;

  const dispatch = useDispatch();
  const productList = useSelector(state => state.productList);
  const { loading, error, products, page, pages } = productList;

  useEffect(() => {
    // console.log('keyword from HomeScreen listProducts', keyword);
    dispatch(listProducts(keyword, pageNumber));
  }, [dispatch, keyword, pageNumber]);

  return (
    <>
      <Meta title='Пиццерия Via Toledo' />

      {!keyword
        ? <ProductCarousel />
        : (<Link to='/' className='btn btn-dark mt-1'>
          На главную страницу
        </Link>)
      }

      {loading
        ? (<Loader />)
        : error ? (<Message variant='danger'>{error}</Message>)
          : (

            <>
              <Row >
                {products.map(product => (
                  <Col key={product._id} xs={12} sm={12} md={6} lg={4} xl={3} >
                    <Product product={product} />
                  </Col>
                ))}
              </Row>

              <Paginate
                pages={pages}
                page={page}
                keyword={keyword ? keyword : ''}
              />

            </>
          )}

    </>
  )
}

export default HomeScreen
