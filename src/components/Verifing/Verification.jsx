import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Verification = () => {
  const [resetCode, setResetCode] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState(null);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setResetCode(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage(null);

    try {
      const response = await axios.post(
        "https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode",
        { resetCode }
      );
      // Handle success response
      setMessage(response.data.message);
      // If code is correct, navigate to reset password component
      navigate("/reset-password");
      
    } catch (error) {
      // Handle error response
      setMessage(error.response.data.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Verification</h2>
      {message && <div className="alert">{message}</div>}
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="resetCode" className="form-label">
            Reset Code
          </label>
          <input
            type="text"
            className="form-control"
            id="resetCode"
            placeholder="Enter reset code"
            value={resetCode}
            onChange={handleChange}
            required
          />
        </div>
        <button 
          type="submit"
          className="btn text-white btn-primary"
          disabled={isLoading}
        >
          {isLoading ? "Loading..." : "Submit"}
        </button>
      </form>
    </div>
  );
};

export default Verification;
