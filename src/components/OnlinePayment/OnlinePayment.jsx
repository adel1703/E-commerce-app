import React, { useContext, useState } from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { cartContext } from "../../context/CartContext";
import { Helmet } from "react-helmet";
import { ColorRing } from "react-loader-spinner";

export default function CashPayment() {
  // Retrieve cartId from context
  const { cartId } = useContext(cartContext);

  const [isLoading, setIsLoading] = useState(false);
  const paymentDone = useNavigate();

  // Define validation schema using Yup
  const validationSchema = Yup.object().shape({
    phone: Yup.string()
      .required("Phone number is required")
      .matches(/^\d{11}$/, "Phone number must be 10 digits"),
    city: Yup.string().required("City is required"),
    details: Yup.string().required("Payment details are required"),
  });

  // Function to confirm cash payment

  // Function to confirm online payment
  const confirmOnlinePayment = (values) => {
    setIsLoading(true); // Set isLoading to true when starting the payment process
    return new Promise((resolve, reject) => {
      axios
        .post(
          `https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}`,
          values,
          {
            headers: { token: localStorage.getItem("Token") },
            params: { url: "http://localhost:3000" },
          }
        )
        .then((res) => {
          console.log(res);
          if (res.data.status === "success") {
            setIsLoading(false); // Set isLoading to false when the payment process is complete
            resolve(); // Resolve promise when payment is successful
            window.open(res.data.session.url, "_self");
          }
        })
        .catch((error) => {
          setIsLoading(false); // Set isLoading to false if an error occurs during the payment process
          reject(error); // Reject promise in case of any error
          setTimeout(() => {
            paymentDone("/products");
            window.location.reload(); // Reload the page after navigating to /products
            toast.error(`Can't complete payment. ${error.message}`, {
              duration: 3000,
              position: "top-center",
            });
          }, 1500);
        });
    });
  };

  return (
    <>
      <Helmet>
        <title>Payment</title>
      </Helmet>
      <div className="w-50 m-auto mt-5 mb-5">
        <h1 className="text-center">Online Payment Gateway</h1>
        <Formik
          initialValues={{
            phone: "",
            city: "",
            details: "",
          }}
          validationSchema={validationSchema}
          onSubmit={confirmOnlinePayment}
        >
          {({ errors, touched, values }) => (
            <Form>
              <div className="mb-3">
                <label htmlFor="phone" className="form-label">
                  Phone Number
                </label>
                <Field
                  type="text"
                  name="phone"
                  className={`form-control ${
                    errors.phone && touched.phone ? "is-invalid" : ""
                  }`}
                />
                {errors.phone && touched.phone && (
                  <div className="invalid-feedback">{errors.phone}</div>
                )}
              </div>

              <div className="mb-3">
                <label htmlFor="city" className="form-label">
                  City
                </label>
                <Field
                  type="text"
                  name="city"
                  className={`form-control ${
                    errors.city && touched.city ? "is-invalid" : ""
                  }`}
                />
                {errors.city && touched.city && (
                  <div className="invalid-feedback">{errors.city}</div>
                )}
              </div>

              <div className="mb-3">
                <label htmlFor="details" className="form-label">
                  Payment Details
                </label>
                <Field
                  as="textarea"
                  name="details"
                  className={`form-control ${
                    errors.details && touched.details ? "is-invalid" : ""
                  }`}
                />
                {errors.details && touched.details && (
                  <div className="invalid-feedback">{errors.details}</div>
                )}
              </div>

              <div className="d-flex justify-content-around ms-5 me-5">
                {isLoading ? (
                  <ColorRing
                    visible={true}
                    height={40}
                    width={40}
                    ariaLabel="color-ring-loading"
                    wrapperStyle={{}}
                    wrapperClass="color-ring-wrapper"
                    colors={["blue", "blue", "blue", "blue", "blue"]}
                  />
                ) : (
                  <button
                    type="submit"
                    className="btn bg-primary text-white"
                  >
                    Confirm Online Payment
                  </button>
                )}
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </>
  );
}
