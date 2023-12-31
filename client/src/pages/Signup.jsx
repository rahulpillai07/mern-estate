import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const SignUp = () => {
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post(
        "http://localhost:3000/api/auth/signup",
        formData
      );

      if (response.status === 200) {
        // Successful response
        navigate("/");
      } else if (!response.data.success) {
        setError(response.data.message);
        setLoading(false);
        return;
        // Handle other response statuses
      }
    } catch (error) {
      // Handle errors (e.g., network error, server error)
      console.error("Error:", error);
      
    }
    setLoading(false);
  };

  return (
    <div className="max-w-lg mx-auto p-4">
      <h1 className="text-3xl text-center font-semibold my-7">Signup</h1>
      <form className="flex flex-col gap-5" onSubmit={handleFormSubmit}>
        <input
          type="text"
          placeholder="Username"
          className="bg-slate-200 border p-3 rounded-lg"
          id="username"
          value={formData.username}
          onChange={handleInputChange}
          name="username"
        />
        <input
          type="text"
          placeholder="Email"
          className="bg-slate-200 border p-3 rounded-lg"
          id="Email"
          value={formData.email}
          onChange={handleInputChange}
          name="email"
        />
        <input
          type="password"
          placeholder="Password"
          className="bg-slate-200 border p-3 rounded-lg"
          id="password"
          onChange={handleInputChange}
          value={formData.password}
          name="password"
        />
        <button disabled={loading}className="p-3 rounded-lg text-white hover:opacity-90 bg-blue-500">
          {loading ? "Loading..." : "SIGN UP"}
        </button>
      </form>
      {error && <div style={{ color: "red", marginTop: "10px" }}>{error}</div>}
      <div className="flex mt-5">
        <p className="mr-2">Have an account?</p>
        <Link to={"/sign-in"}>
          <span className="text-blue-800 ">Sign In</span>
        </Link>
      </div>
    </div>
  );
};

export default SignUp;
