import axios from "axios";
import { useFormik } from "formik";
import React, { useState } from "react";
import { Helmet } from "react-helmet";
import {  ColorRing } from "react-loader-spinner";
import { useNavigate } from "react-router-dom";
import * as yup from 'yup';

const regSchema = yup.object({
  name: yup.string().min(3, 'Too Short!').max(50, 'Too Long!').required('Required'),
  email: yup.string().email('Invalid email').required('Required'),
  phone: yup.string().required().matches(/^01[0125][0-9]{8}$/, 'Invalid phone number'),
  password: yup.string().min(6).max(12).required(),
  rePassword: yup.string().oneOf([yup.ref('password'), null], 'passwords must match').required(),
});

export default function Register() {

  
const [isCreated, setIsCreated] = useState(false);
const [isError, setIsError] = useState(undefined);
const [isLoading, setisLoading] = useState(false);

const navigate = useNavigate();

  async function sendData(data){
    setisLoading(true);
    console.log("dataaaaaa is " , data)
    await axios.post(`https://ecommerce.routemisr.com/api/v1/auth/signup` , data )
    .then( (resp) => {
      console.log("in succuess case: " , resp);
      setIsCreated(true);
      setTimeout(() => {
        setIsCreated(false);
        navigate('/login')
        setisLoading(false);
      }, 2500);
      
    } )
    .catch( (err) => {
      console.log("in error case: " , err );
      setIsError(err.response.data.message)
      setTimeout(() => {
        setIsError(undefined);
      }, 2500);
      setisLoading(false);

    } )
  }

  function onSubmit(values) {
    console.log("submitted...", values);
    sendData(values);
  };

  const regFormik = useFormik({
    initialValues:{ name: "",
    email: "",
    phone: "",  
    password: "",
    rePassword: ""},
    onSubmit: onSubmit,
    validationSchema: regSchema
  });

  return (
    <>
    <Helmet>
    <title>Register</title>
  </Helmet>
    <div className="w-50 m-auto mt-3 mb-3">
      {isCreated ? (
        <div className="alert alert-success text-center">
          {" "}
          Congratulation your account has been created.{" "}
        </div>
      ) : (
        ""
      )}
      {isError ? (
        <div className="alert alert-danger text-center"> {isError} </div>
      ) : (
        ""
      )}
      <h2 className="text-center fw-bolder text-main">Register Now</h2>
      <form onSubmit={regFormik.handleSubmit}>
        <label className="mb-1 fw-bold" htmlFor="name">
          name
        </label>
        <input
          onBlur={regFormik.handleBlur}
          onChange={regFormik.handleChange}
          value={regFormik.values.name}
          id="name"
          name="name"
          type="text"
          placeholder="Enter your name"
          className="form-control mb-3"
        />
        {regFormik.errors.name && regFormik.touched.name ? (
          <div className="alert alert-danger">{regFormik.errors.name}</div>
        ) : null}

        <label className="mb-1 fw-bold" htmlFor="email">
          email
        </label>
        <input
          onBlur={regFormik.handleBlur}
          onChange={regFormik.handleChange}
          value={regFormik.values.email}
          id="email"
          name="email"
          type="email"
          placeholder="Enter your email"
          className="form-control mb-3"
        />
        {regFormik.errors.email && regFormik.touched.email ? (
          <div className="alert alert-danger">{regFormik.errors.email}</div>
        ) : null}

        <label className="mb-1 fw-bold" htmlFor="phone">
          phone
        </label>
        <input
          onBlur={regFormik.handleBlur}
          onChange={regFormik.handleChange}
          value={regFormik.values.phone}
          id="phone"
          name="phone"
          type="text"
          placeholder="Enter your phone"
          className="form-control mb-3"
        />
        {regFormik.errors.phone && regFormik.touched.phone ? (
          <div className="alert alert-danger">{regFormik.errors.phone}</div>
        ) : null}

        <label className="mb-1 fw-bold" htmlFor="password">
          password
        </label>
        <input
          onBlur={regFormik.handleBlur}
          onChange={regFormik.handleChange}
          value={regFormik.values.password}
          id="password"
          name="password"
          type="password"
          placeholder="Enter your password"
          className="form-control mb-3"
        />
        {regFormik.errors.password && regFormik.touched.password ? (
          <div className="alert alert-danger">{regFormik.errors.password}</div>
        ) : null}

        <label className="mb-1 fw-bold" htmlFor="rePassword">
          rePassword
        </label>
        <input
          onBlur={regFormik.handleBlur}
          onChange={regFormik.handleChange}
          value={regFormik.values.rePassword}
          id="rePassword"
          name="rePassword"
          type="password"
          placeholder="Enter your rePassword"
          className="form-control mb-3"
        />
        {regFormik.errors.rePassword && regFormik.touched.rePassword ? (
          <div className="alert alert-danger">
            {regFormik.errors.rePassword}
          </div>
        ) : null}
        <button type="submit" className="fw-bolder btn bg-main text-white">
         { isLoading ? <ColorRing
            visible={true}
            height="40"
            width="40"
            ariaLabel="color-ring-loading"
            wrapperStyle={{}}
            wrapperClass="color-ring-wrapper"
            colors={["white", "white", "white", "white", "white"]}
          /> : "Register" } 
        </button>
      </form>
    </div>
    </>
  );
}
