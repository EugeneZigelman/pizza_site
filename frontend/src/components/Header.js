import React from 'react';
import { Container, Nav, Navbar, NavDropdown } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../actions/userActions';
import SearchBox from './SearchBox';


const Header = () => {

  const dispatch = useDispatch();

  const cart = useSelector(state => state.cart);
  const { cartItems } = cart; 

  // console.log(cartItems.length);

  const userLogin = useSelector(state => state.userLogin);
  const { userInfo } = userLogin;

  const logoutHandler = () => {
    dispatch(logout());
  }

  return (
    <header className='head1'>

      <Navbar variant='dark' expand="lg" collapseOnSelect  >
        <Container className='p-0 mx-2'>
          <LinkContainer to="/">
            <Navbar.Brand>
              <img
                alt="Нет картинки"
                src="/LOGO.png"
                width="130"
                height="80"
                className="d-inline-block align-center"
              /></Navbar.Brand>
          </LinkContainer>

          <Navbar.Toggle aria-controls="basic-navbar-nav" className='head2' />
          <Navbar.Collapse id="basic-navbar-nav" className='head2'>

            {/* Поиск по типу продукта */}
            <SearchBox />

            <Nav className="ms-auto " >



              <LinkContainer to="/cart">
                <Nav.Link >
                  <div className="head2">
                    <i className="fas fa-shopping-cart "></i> Корзина ({cartItems.length})
                  </div>
                </Nav.Link>
              </LinkContainer>

              {userInfo ? (

                <NavDropdown title={userInfo.name} id='username' className="head2">
                  <LinkContainer to="/profile" className="head2">
                    <NavDropdown.Item className='head2 '>
                      Личная страница
                    </NavDropdown.Item>
                  </LinkContainer>
                  <NavDropdown.Item onClick={logoutHandler} className='head2 '>
                    Выйти из аккаунта
                  </NavDropdown.Item>
                </NavDropdown>

              ) : (
                <LinkContainer to="/login">
                  <Nav.Link className="head2">
                    <i className="fas fa-user"></i> Войти
                  </Nav.Link>
                </LinkContainer>
              )}

              <LinkContainer to="/about">
                <Nav.Link >
                  <div className="head2">
                    О нас
                  </div>
                </Nav.Link>
              </LinkContainer>

              {userInfo && userInfo.isAdmin && (

                <NavDropdown title='Админ' id='adminmenu' >
                  <LinkContainer to="/admin/userlist">
                    <NavDropdown.Item className="head2">
                      Пользователи
                    </NavDropdown.Item>
                  </LinkContainer>

                  <LinkContainer to="/admin/productlist">
                    <NavDropdown.Item className="head2">
                      Товары
                    </NavDropdown.Item>
                  </LinkContainer>

                  <LinkContainer to="/admin/orderlist">
                    <NavDropdown.Item className="head2">
                      Заказы
                    </NavDropdown.Item>
                  </LinkContainer>

                </NavDropdown>
              )}



            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

    </header>
  )
}

export default Header

