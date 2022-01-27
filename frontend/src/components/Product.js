import React from 'react';
import { Card, Col} from 'react-bootstrap';
import Rating from './Rating';
import { Link } from 'react-router-dom';
import BlockAddToCart from './BlockAddToCart';


const Product = ({ product }) => {

  const sizeText = 'small';

  // console.log('product Product', product);

  return (
    // Ссылки <a типа "http://localhost:3000/product/1"
    <Card className="text-center fs-3 card1 h-100"  // fs-'font-size'
    >
      <Link to={`/product/${product._id}`}>
        <Card.Img src={product.image} variant='top' />
      </Link>

      <Card.Body className='g-0'>
        <Link to={`/product/${product._id}`}>
          <Col >
            <Card.Text className='cardTitle' >
              {product.name}
            </Card.Text>
            <Card.Text className='cardTextDescr' >
              {`${product.description}`}
            </Card.Text>

          </Col>
        </Link>
      </Card.Body>      

      <BlockAddToCart product={product} sizeText={sizeText} />
      
      <Card.Text as='div' className="text-center fs-4 ">
        <Rating
          value={product.rating}
          text={`${product.numReviews} отз. `}
        // color='gold' вместо этого дефолтное значение пропса в Rating.js
        />
      </Card.Text>

    </Card>
  )
}



export default Product
