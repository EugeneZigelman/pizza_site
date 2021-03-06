import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Carousel,  Image } from 'react-bootstrap';
import Loader from './Loader';
import Message from './Message';
import { listTopProducts } from '../actions/productActions';
import { useDispatch, useSelector } from 'react-redux';

const ProductCarousel = () => {


  const dispatch = useDispatch();

  const productTopRated = useSelector(state => state.productTopRated);
  const { loading, error, products } = productTopRated;

  useEffect(() => {
    dispatch(listTopProducts())
  }, [dispatch]);

  return loading
    ? <Loader />
    : error
      ? <Message variant='danger'>{error}</Message>
      : (

        <div className="wrapperCarousel">
          <div className="carouselDiv">
            <Carousel pause='hover' className='bg-light ' >
              {products.map((product) => (
                <Carousel.Item key={product._id}>

                  <Link to={`/product/${product._id}`}>

                    <Image
                      src={product.image}
                      alt={product.name}
                      fluid                   
                      className='myImage'
                    />

                    <Carousel.Caption className='carousel-caption'>
                      <h2> {product.name} </h2>
                    </Carousel.Caption>
                  </Link>

                </Carousel.Item>
              ))}
            </Carousel>
          </div >
        </div>

      )

}

export default ProductCarousel
