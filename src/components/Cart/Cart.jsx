import React, { useContext, useState, useEffect } from "react";
import { cartContext } from "../../context/CartContext";
import { Watch } from "react-loader-spinner";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";

export default function Cart() {
  const { numOfCarttItem, allProducts, totalCartPrice, updateCount, deleteProduct, clearCart } = useContext(cartContext);
  const [loading, setLoading] = useState(true);
  const [loadingStates, setLoadingStates] = useState({});
  
  useEffect(() => {
    if (allProducts) {
      setLoading(false); // Once products are loaded, set loading to false
    }
  }, [allProducts]);

  async function updateProductCount(id, newCount) {
    setLoadingStates((prevStates) => ({ ...prevStates, [id]: true }));

    try {
      await updateCount(id, newCount);
      toast.success("Product updated successfully.");
    } catch (error) {
      console.error("Error updating product count:", error);
      toast.error("An error occurred while updating product count.");
    }

    setLoadingStates((prevStates) => ({ ...prevStates, [id]: false }));
  }

  async function deleteProductHandler(id) {
    try {
      await deleteProduct(id);
      toast.success("Product deleted successfully.");
    } catch (error) {
      console.error("Error deleting product:", error);
      toast.error("An error occurred while deleting product.");
    }
  }

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center vh-100">
        <Watch visible={true} height="150" width="150" radius="48" color="#0aad0a" ariaLabel="watch-loading" wrapperStyle={{}} wrapperClass="" />
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>User Cart</title>
      </Helmet>

      <div className="container">
        {allProducts.length ? (
          <div>
            <h2 className="fw-bold fs-5 mt-4">
              Shop Cart{" "}
              <span className="fs-2 text-main ms-2">
                {numOfCarttItem} Items
              </span>
            </h2>
            <div className="row mt-3">
              <div className="col-md-8">
                {allProducts.map((product, idx) => (
                  <div key={idx} className="card mb-3">
                    <div className="row g-0">
                      <div className="col-md-4">
                        <img
                          src={product.product.imageCover}
                          className="img-fluid rounded-start"
                          alt={product.product.title}
                        />
                      </div>
                      <div className="col-md-8">
                        <div className="card-body">
                          <h5 className="card-title mt-4 fw-bold">
                            {product.product.title}
                          </h5>
                          <h5 className="card-title mt-4">
                            {product.product.description}
                          </h5>
                          <p className="card-text">
                            Price: {product.price} LE
                          </p>
                          <div className=" align-items-center">
                            <p> {product.product.ratingsAverage} <span><i className="fa-solid fa-star rating-color"></i>
                              </span>

                            </p>
                            <p className="me-2">
                              Subtotal:{" "}
                              <span>{product.count} Items</span>
                            </p>
                            <button
                              disabled={loadingStates[product.product.id]}
                              onClick={() =>
                                updateProductCount(
                                  product.product.id,
                                  product.count - 1
                                )
                              }
                              className="btn btn-outline-dark me-2"
                            >
                              -
                            </button>
                            <button
                              disabled={loadingStates[product.product.id]}
                              onClick={() =>
                                updateProductCount(
                                  product.product.id,
                                  product.count + 1
                                )
                              }
                              className="btn btn-outline-success"
                            >
                              +
                            </button>
                          </div>
                          <button
                            onClick={() =>
                              deleteProductHandler(product.product.id)
                            }
                            className="btn mt-3 btn-outline-danger ms-auto"
                          >
                            Remove
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="col-md-4">
                <div className="card mt-3">
                  <div className="card-body">
                    <h5 className="card-title text-main">Total Cart Price</h5>
                    <p className="card-text text-main fw-bold fs-5">
                      {" "}
                      {totalCartPrice} LE
                    </p>
                    <button
                      onClick={clearCart}
                      className="btn btn-warning fw-bold "
                    >
                      Clear Cart
                    </button>
                    <Link
                      to={"/cashpayment"}
                      className="btn btn-primary d-block mt-3 text-white"
                    >
                      Confirm Cash Payment
                    </Link>
                    <Link
                      to={"/onlinepayment"}
                      className="btn btn-primary d-block bg-main text-white mt-2"
                    >
                      Confirm Online Payment
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="text-center mt-4">
            <h2 className="fw-bold fs-5">Your cart is empty</h2>
            <p className="fs-4">
              Browse our products to add items to your cart.
            </p>
            <Link to={"/products"} className="btn btn-primary mt-3">
              Browse Products
            </Link>
          </div>
        )}
      </div>
    </>
  );
}
