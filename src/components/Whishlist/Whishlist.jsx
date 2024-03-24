import React, { useContext } from "react";
import {  Watch } from "react-loader-spinner";
import toast from "react-hot-toast";
import { Helmet } from "react-helmet";
import { WishlistContext } from "../../context/WishlistContext";

export default function Whishlist() {
    const { numOfWhishlistItem, allProducts, deleteProductFromWhishlist } =
    useContext(WishlistContext);


  if (!allProducts) {
    return (
      <div className="d-flex justify-content-center align-items-center vh-100">
        <Watch
          visible={true}
          height="150"
          width="150"
          radius="48"
          color="#0aad0a"
          ariaLabel="watch-loading"
          wrapperStyle={{}}
          wrapperClass=""
        />
      </div>
    );
  }

  async function deletedProduct(id) {
    const toastId = toast.loading("Waiting...", {
      position: "top-center",
    });
  
    try {
      const res = await deleteProductFromWhishlist(id);
      if (res) {
        toast.success("Product deleted successfully.", {
          position: "top-center",
          id: toastId,
        });
      } else {
        throw new Error("Error occurred.");
      }
    } catch (error) {
      toast.error("ERROR OCCURRED.", {
        position: "top-center",
        id: toastId,
      });
    }
  }
  

  return (
    <>
    <Helmet>
      <title>User Favorites</title>
    </Helmet>

    <div className="container mt-3 mb-3">
      
    <div className="d-flex justify-content-between align-items-center">
        <h2 className="fw-bold fs-5">
          Wishlist{" "}
          <span className="fs-2 text-danger ms-2">{numOfWhishlistItem} Items</span>
        </h2>
      </div>
    
      <div className="row  g-3">
        {allProducts.map((product, idx) => (
          <div key={idx} className="col-lg-2 col-md-4 col-sm-8">
            <div className="card h-100 d-flex flex-column">
              <img src={product.imageCover} className="card-img-top w-100" alt="" />
              <div className="card-body">
                <h5 className="text-center ">{product.title}</h5>
                  <div className="">
                    <p>Brand: {product.brand.name}. </p>
                    <p>
                      
                      {product.ratingsAverage}
                      <span>
                        
                        <i className="fa-solid fa-star rating-color"> </i>
                      </span>
                    </p>
                </div>
              </div>
            <button 
              onClick={() => deletedProduct(product.id)} 
              className="btn w-50 btn-outline-danger  m-auto mb-2">
              Remove
            </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  </>
  );
}
