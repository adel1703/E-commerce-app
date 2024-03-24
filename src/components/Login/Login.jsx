import axios from "axios";
import { useFormik } from "formik";
import React, { useState } from "react";
import { useContext } from "react";
import { ColorRing } from "react-loader-spinner";
import { useNavigate, Link } from "react-router-dom";
import * as yup from 'yup';
import { authContext } from "../../context/AuthContext";
import { Helmet } from "react-helmet";

const regSchema = yup.object({
  email: yup.string().email('Invalid email').required('Required'),
  password: yup.string().min(6).max(12).required(),
});

export default function Login() {

  const [isCreated, setIsCreated] = useState(false);
  const [isError, setIsError] = useState(undefined);
  const [isLoading, setisLoading] = useState(false);

  const navigate = useNavigate();
  const { setToken, getUserInfo, userData } = useContext(authContext);

  async function sendData(data) {
    setisLoading(true);
    console.log("dataaaaaa is ", data)
    await axios.post(`https://ecommerce.routemisr.com/api/v1/auth/signin`, data)
      .then((resp) => {
        console.log("in succuess case: ", resp);
        localStorage.setItem("Token", resp.data.token);
        localStorage.setItem("UserID", userData.id);
        setToken(resp.data.token);
        getUserInfo();
        console.log("The token is ", resp.data.token);
        setIsCreated(true);
        setTimeout(() => {
          setIsCreated(false);
          navigate('/products')
          setisLoading(false);
        }, 2500);

      })
      .catch((err) => {
        console.log("in error case: ", err);
        setIsError(err.response.data.message)
        setTimeout(() => {
          setIsError(undefined);
        }, 2500);
        setisLoading(false);

      })
  }

  function onSubmit(values) {
    console.log("submitted...", values);
    sendData(values);
  };

  const regFormik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit: onSubmit,
    validationSchema: regSchema
  });

  return <>
    <Helmet>
      <title>Login</title>
    </Helmet>

    <div className="w-50 m-auto mt-3 mb-3">
      {isCreated ? (
        <div className="alert alert-success text-center"> Welcome back. </div>
      ) : (
        ""
      )}
      {isError ? (
        <div className="alert alert-danger text-center"> {isError} </div>
      ) : (
        ""
      )}
      <h2 className="text-center fw-bolder text-main">Login</h2>
      <form onSubmit={regFormik.handleSubmit}>
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

        <button type="submit" className="fw-bolder btn bg-main text-white">
          {isLoading ? (
            <ColorRing
              visible={true}
              height="40"
              width="40"
              ariaLabel="color-ring-loading"
              wrapperStyle={{}}
              wrapperClass="color-ring-wrapper"
              colors={["white", "white", "white", "white", "white"]}
            />
          ) : (
            "product"
          )}
        </button>
        <Link to="/Forgot password" className="btn btn-link ">Forgot Password?</Link>
      </form>
    </div>
  </>
}
