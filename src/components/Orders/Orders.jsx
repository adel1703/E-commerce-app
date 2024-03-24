import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { Watch } from 'react-loader-spinner';
import { authContext } from '../../context/AuthContext';
import { Helmet } from 'react-helmet';
import ordersStyle from './orders.module.css';

export default function Orders() {
  const [allOrders, setAllOrders] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const { userData } = useContext(authContext);

  useEffect(() => {
    if (userData) {
      const userID = userData.id;
      axios.get(`https://ecommerce.routemisr.com/api/v1/orders/user/${userID}`)
        .then((res) => {
          setAllOrders(res.data);
          setIsLoading(false);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [userData]);

  if (isLoading) {
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

  return (
    <>
      <Helmet>
        <title>Orders</title>
      </Helmet>
      {allOrders && allOrders.length ? (
        <div className="container-fluid mt-4 mb-4 pt-2">
          <div className="row mb-2">
            {allOrders.map((order, idx) => (
              <div key={idx} className="col-10 m-auto">
                <div className={ordersStyle.orderCard}>
                  {order.cartItems.map((product, secidx) => (
                    <div key={secidx}>
                      <img src={product.product.imageCover} className="w-25 mb-2" alt={product.product.title} />
                      <h5 className=" mb-2">{product.product.title.split(" ").slice(0, 8).join(" ")}</h5>
                      <div className="d-flex">
                        <p className='me-3'>Price: {product.price}</p>
                        <p>Count: {product.count}</p>
                      </div>
                    </div>
                  ))}
                  <div className={ordersStyle.orderDetails}>
                    <h5>Payment method: {order.paymentMethodType}</h5>
                    <h5>Order Price: {order.totalOrderPrice}</h5>
                    <p>This order is delivering to "{userData.name}" on phone number: "{order.user.phone}" and the email: "{order.user.email}"</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <h1 className='text-center text-main'>No orders Found</h1>
      )}
    </>
  );
}
