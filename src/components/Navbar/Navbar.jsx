import React, { useContext } from 'react';
import logo from '../../images/freshcart-logo.svg';
import { Link, useNavigate } from 'react-router-dom';
import { authContext } from '../../context/AuthContext';
import { cartContext } from '../../context/CartContext';
import { WishlistContext } from '../../context/WishlistContext';


export default function Navbar() {
  const { token, setToken } = useContext(authContext);
  const { numOfCarttItem } = useContext(cartContext);
  const { numOfWhishlistItem } = useContext(WishlistContext);

  const navigate = useNavigate();

  function logout() {
    setToken(null);
    localStorage.removeItem('Token');
    localStorage.removeItem('UserID');
    navigate('/login');
  }

 

  return (
    <>
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/products">
            <img src={logo} alt="fresh cart" />
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            {token ? (
              <ul className="navbar-nav p-2 me-auto mb-2 mb-lg-0">
                <li className="nav-item">
                  <Link
                    className="nav-link active"
                    aria-current="page"
                    to="/products"
                  >
                    Home
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/categories">
                    Categories
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/brands">
                    Brands
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/orders">
                    Orders
                  </Link>
                </li>
                <li className="nav-item position-relative ">
                <Link className="nav-link" to="/cart">
                  <i class="fa-solid text-warning fs-5 fa-cart-shopping"></i>
                  <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-warning">
                    {numOfCarttItem ? numOfCarttItem : ""}
                  </span>
                </Link>
                
              </li>
                <li className="nav-item position-relative ">
              <Link  className="nav-link" to="/whishlist">                    
                  <i className='fa-solid fa-heart text-danger fs-5 ms-2'></i>
                  <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                    {numOfWhishlistItem ? numOfWhishlistItem : ""}
                  </span>
                </Link>
                  </li>

                
              </ul>
            ) : (
              ""
            )}

            <ul className=" align-items-center navbar-nav ms-auto mb-2 mb-lg-0">
              <ul className="list-unstyled d-flex">
                <li>
                  <i className="fw-bolder me-2 fa-brands fa-instagram "></i>
                </li>
                <li>
                  <i className="me-2 fa-brands fa-facebook-f"></i>
                </li>
                <li>
                  <i className="me-2 fa-brands fa-linkedin"></i>
                </li>
                <li>
                  <i className=" fw-bolder fa-brands fa-x"></i>
                </li>
              </ul>
              
              
              {token ? (
                <div className="d-flex justify-content-between">
                  <Link to="/userProfile">
                    <li className="nav-item">
                      <span
                        role="button"
                        className="nav-s fa-solid fs-5 text-main ms-2 fa-user me-3"
                      ></span>
                    </li>
                  </Link>
                  <li className="nav-item btn-outline-danger">
                    <span
                      role="button"
                      onClick={logout}
                      className="nav-s text-danger fw-bold"
                    >
                      Signout
                    </span>
                  </li>
                </div>
              ) : (
                <>
                  <li className="nav-item ms-2 fw-bold ">
                    <Link className="nav-link " to="/login">
                      <span className="text-main">Login</span>
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/register">
                      Register
                    </Link>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}
