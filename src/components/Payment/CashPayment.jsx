import React, { useContext } from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { cartContext } from "../../context/CartContext";
import { Helmet } from "react-helmet";

export default function CashPayment() {
  // Retrieve cartId from context
  const { cartId, getUserCart } = useContext(cartContext);
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
  const confirmCashPayment = (values) => {
    return new Promise((resolve, reject) => {
      // Display loading toast
      const loadingToastId = toast.loading("Waiting for payment confirmation...");

      axios
        .post(
          `https://ecommerce.routemisr.com/api/v1/orders/${cartId}`,
          values,
          {
            headers: { token: localStorage.getItem("Token") },
          }
        )
        .then((res) => {
          console.log(res);
          if (res.data.status === "success") {
            resolve(); // Resolve promise when payment is successful
            getUserCart();
            setTimeout(() => {
              paymentDone("/orders");
              window.location.reload(); // Reload the page after navigating to /products
              toast.success("Payment Completed Successfully.", {
                duration: 3000,
                position: "top-center",
              });
              toast.dismiss(loadingToastId); // Dismiss loading toast on success
            }, 1500);
          } else {
            reject(new Error("Payment failed")); // Reject promise when payment fails
          }
        })
        .catch((error) => {
          toast.error(`Can't complete payment. ${error.message}`, {
            duration: 3000,
            position: "top-center",
          });
          reject(error); // Reject promise in case of any error
          setTimeout(() => {
            paymentDone("/products");
            window.location.reload(); // Reload the page after navigating to /products
            toast.dismiss(loadingToastId); // Dismiss loading toast on error
          }, 1500);
        });
    });
  };

  return (
    <>
      <Helmet>
        <title>Cash Payment</title>
      </Helmet>
      <div className="w-50 m-auto mt-5 mb-5">
        <h1 className="text-center">Cash Payment Gateway</h1>
        <Formik
          initialValues={{
            phone: "",
            city: "",
            details: "",
          }}
          validationSchema={validationSchema}
          onSubmit={confirmCashPayment}
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
                <button
                  type="submit"
                  className="btn bg-main text-white"
                >
                  Confirm Cash Payment
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </>
  );
}
