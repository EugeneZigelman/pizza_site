import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation, useParams, Link } from 'react-router-dom';
import { Button, Col, Form, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../components/Message';
import Loader from '../components/Loader';
import { listProductDetails, updateProduct } from '../actions/productActions';
import { PRODUCT_UPDATE_RESET } from '../constants/productConstants';
import axios from 'axios';
import Meta from '../components/Meta';



const ProductEditScreen = () => {

  const location = useLocation();
  const params = useParams();

  const productId = params.id;

  const [name, setName] = useState('');
  // const [price, setPrice] = useState(0);
  const [image, setImage] = useState('');
  const [brand, setBrand] = useState('');
  const [category, setCategory] = useState('');
  // const [countInStock, setCountInStock] = useState(0);
  const [description, setDescription] = useState('');
  const [pizzaDiameterBig, setPizzaDiameterBig] = useState(0);
  const [pizzaDiameterMedium, setPizzaDiameterMedium] = useState(0);
  const [pizzaPriceMedium, setPizzaPriceMedium] = useState(0);
  const [pizzaPriceBig, setPizzaPriceBig] = useState(0);

  const [uploading, setUploading] = useState(false);

  const dispatch = useDispatch();

  const productDetails = useSelector(state => state.productDetails);
  const { loading, error, product } = productDetails;

  const productUpdate = useSelector(state => state.productUpdate);
  const { loading: loadingUpdate, error: errorUpdate, success: successUpdate } = productUpdate;

  let navigate = useNavigate();

  useEffect(() => {

    if (successUpdate) {
      dispatch({ type: PRODUCT_UPDATE_RESET });
      navigate('/admin/productlist');
    } else {
      if (!product.name || product._id !== productId) {
        dispatch(listProductDetails(productId));
      } else {
        setName(product.name);        
        setImage(product.image);
        setBrand(product.brand);
        setCategory(product.category);
        setDescription(product.description);
        setPizzaDiameterBig(product.pizzaDiameter.big);
        setPizzaDiameterMedium(product.pizzaDiameter.medium);
        setPizzaPriceMedium(product.pizzaPrice.medium);
        setPizzaPriceBig(product.pizzaPrice.big);
      }
    }
  }, [product, dispatch, productId, successUpdate, navigate]);

  const uploadFileHandler = async (e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append('image', file);
    setUploading(true);

    try {

      const config = {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      }
      const { data } = await axios.post('/api/upload', formData, config);
      setImage(data);
      setUploading(false);

    } catch (error) {
      console.error(error);
      setUploading(false);
    }

  }

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(updateProduct({
      _id: productId,
      name,
      image,
      brand,
      category,
      description,
      pizzaDiameterMedium,
      pizzaDiameterBig,
      pizzaPriceMedium,
      pizzaPriceBig
    }))
  }

  return (
    <>
      <Meta title='Редактирование товара' />
      <Link to='/admin/productlist' className='btn btn-dark my-3'>
        Назад
      </Link>
      <div >
        <div flex className="nameTextOrder mt-2">Редактировать товар</div>
        {loadingUpdate && <Loader />}
        {errorUpdate && <Message variant='danger'>{errorUpdate}</Message>}
        {
          loading
            ? <Loader />
            : error
              ? <Message variant='danger'> {error} </Message>
              : (
                <Form
                  onSubmit={submitHandler}
                  // className='carouselDiv'
                  // style={{ width: '36rem' }}
                >

                  <Form.Group controlId='name'>
                    <Form.Label>Название</Form.Label>
                    <Form.Control
                      type='name'
                      placeholder='Введите название...'
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    >
                    </Form.Control>
                  </Form.Group>

                  <Form.Group controlId='image'>
                    <Form.Label>Картинка</Form.Label>
                    <Form.Control
                      type='text'
                      placeholder='Url картинки...'
                      value={image}
                      onChange={(e) => setImage(e.target.value)}
                    >
                    </Form.Control>

                    <Form.Control
                      // id='image-file'
                      type='file'
                      Label='Choose image file'
                      custom onChange={uploadFileHandler}
                    ></Form.Control>

                    {uploading && <Loader />}
                  </Form.Group>

                  <Form.Group controlId='brand'>
                    <Form.Label>Бренд</Form.Label>
                    <Form.Control
                      type='text'
                      placeholder='Введите бренд...'
                      value={brand}
                      onChange={(e) => setBrand(e.target.value)}
                    >
                    </Form.Control>
                  </Form.Group>

                  <Form.Group controlId='category'>
                    <Form.Label>Категория поиска</Form.Label>
                    <Form.Control
                      type='text'
                      placeholder='Введите категории поиска...'
                      value={category}
                      onChange={(e) => setCategory(e.target.value)}
                    >
                    </Form.Control>
                  </Form.Group>

                  <Form.Group controlId='description'>
                    <Form.Label>Описание</Form.Label>
                    <Form.Control
                      type='text'
                      placeholder='Введите описание...'
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                    >
                    </Form.Control>
                  </Form.Group>


                  <Form.Group controlId='diameter_price_Medium' >
                    <Row >
                      <Col>
                        <Form.Label>Выбор размера средней пиццы</Form.Label>
                        <Form.Control
                          type='text'
                          placeholder='Enter description'
                          value={pizzaDiameterMedium}
                          onChange={(e) => setPizzaDiameterMedium(e.target.value)}
                        >
                        </Form.Control>
                      </Col>
                      <Col>
                        <Form.Label>Выбор цены средней пиццы</Form.Label>
                        <Form.Control
                          type='text'
                          placeholder='Enter description'
                          value={pizzaPriceMedium}
                          onChange={(e) => setPizzaPriceMedium(e.target.value)}
                        >
                        </Form.Control>
                      </Col>
                    </Row>
                  </Form.Group>

                  <Form.Group controlId='diameter_price_Big'>
                    <Row>
                      <Col>
                        <Form.Label>Выбор размера большой пиццы</Form.Label>
                        <Form.Control
                          type='text'
                          placeholder='Enter description'
                          value={pizzaDiameterBig}
                          onChange={(e) => setPizzaDiameterBig(e.target.value)}
                        >
                        </Form.Control>
                      </Col>
                      <Col>
                        <Form.Label>Выбор цены большой пиццы</Form.Label>
                        <Form.Control
                          type='text'
                          placeholder='Enter description'
                          value={pizzaPriceBig}
                          onChange={(e) => setPizzaPriceBig(e.target.value)}
                        >
                        </Form.Control>
                      </Col>
                    </Row>
                  </Form.Group>



                  <Button type='submit' variant='success' className='mt-2 '>
                    Внести изменения
                  </Button>

                </Form>
              )
        }

      </div>
    </>
  )
}

export default ProductEditScreen
