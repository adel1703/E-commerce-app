import React, { useContext } from 'react';
import { useQuery } from 'react-query';
import HomeSlider from '../HomeSlider/HomeSlider';
import CategorySlider from '../CategorySlider/CategorySlider';
import { Link } from 'react-router-dom';
import { cartContext } from '../../context/CartContext';
import toast from 'react-hot-toast';
import { Helmet } from 'react-helmet';
import axios from 'axios';
import { Watch } from 'react-loader-spinner';
import { WishlistContext } from '../../context/WishlistContext';

export default function Products() {
  const { addProductToCart } = useContext(cartContext);
  const { addToWishlist } = useContext(WishlistContext);

  async function getProducts() {
    return axios.get('https://ecommerce.routemisr.com/api/v1/products');
  }

  const { data, isLoading } = useQuery('getAllProduct', getProducts, {
    cacheTime: 0,
  });

  async function addProductToCartHandler(id) {
    try {
      toast.promise(addProductToCart(id), {
        loading: 'Adding product to cart...',
        success: 'Product added to cart successfully.',
        error: 'Failed to add product to cart.',
      });
    } catch (error) {
      console.log(error);
      toast.error('Failed to add product to cart.');
    }
  }

  async function addToWishlistHandler(id) {
    try {
      toast.promise(
        addToWishlist(id),
        {
          loading: 'Adding product to wishlist...',
          success:  'Product added to wishlist.',
          error: 'Failed to add product to wishlist.',
          
        }
        
      );
    } catch (error) {
      console.log(error);
      toast.error('Failed to add product to wishlist.');
    }
  }

  if (isLoading) {
    return (
      <div className="d-flex justify-content-center align-items-center vh-100">
        <Watch visible={true} height="150" width="150" radius="48" color="#0aad0a" ariaLabel="watch-loading" wrapperStyle={{}} wrapperClass="" />
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>FreshCart</title>
      </Helmet>
      <div className="container mt-3">
        <div className="row mb-5">
          <div className="col-md-10">
            <HomeSlider />
          </div>
          <div className="col-md-2">
            <div>
              <img
                style={{ height: '150px' }}
                className="w-100"
                src={require('../../images/grocery-banner.png')}
                alt=""
              />
              <img
                style={{ height: '150px' }}
                className="w-100 mt-2"
                src={require('../../images/grocery-banner-2.jpeg')}
                alt=""
              />
            </div>
          </div>
        </div>

        <CategorySlider />
        <div className="row mt-5">
          {data.data.data.map((product, idx) => (
            <div key={idx} className="col-lg-3 col-md-4 col-sm-6 mb-4">
              <div className="card h-100">
                <Link to={`/productDetails/${product.id}`}>
                  <img src={product.imageCover} className="card-img-top" alt="" />
                </Link>
                <div className="card-body">
                  <h5 className="card-title">{product.title.split(' ').slice(0, 2).join(' ')}</h5>
                  <p className="card-text">{product.category.name}</p>
                  <div className="d-flex justify-content-between align-items-center">
                    <p className="card-price">
                      {product.priceAfterDiscount ? (
                        <>
                          <span className="text-decoration-line-through me-2">{product.price} LE</span>
                          <span className="text-main fs-5 fw-bold">{product.priceAfterDiscount} LE</span>
                          <p>
                      {" "}
                      <span>
                        {" "}
                        <i className="fa-solid fa-star rating-color"> </i>{" "}
                      </span>{" "}
                      {product.ratingsAverage}
                    </p>
                        </>
                      ) : (
                        <div>
                        <span className="text-main fs-5 fw-bold">{product.price} LE</span>
                        <p>
                      {" "}
                      <span>
                        {" "}
                        <i className="fa-solid fa-star rating-color"> </i>{" "}
                      </span>{" "}
                      {product.ratingsAverage}
                    </p>
                        </div>
                      )}
                    </p>
                    <div className="d-flex align-items-center">
                      <button onClick={() => addProductToCartHandler(product.id)} className="btn btn-warning me-2">
                        <i className="fas fa-cart-plus"></i>
                      </button>
                      <button onClick={() => addToWishlistHandler(product.id)} className="btn btn-danger">
                        <i className="fas fa-heart"></i>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
