import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../store/auth";
import { toast } from "react-toastify";
import "./Login.css";

export const Login = () => {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();
  const { isLoggedIn, storeTokenInLS, API } = useAuth();

  useEffect(() => {
    if (isLoggedIn) {
      navigate("/admin");
    }
  }, [isLoggedIn, navigate]);

  const handleInput = (e) => {
    const { name, value } = e.target;
    setUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${API}/api/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });

      const res_data = await response.json();

      if (response.ok) {
        storeTokenInLS(res_data.token);
        setUser({ email: "", password: "" });
        toast.success("Login successful");
        navigate("/admin");
      } else {
        const errorMessage = res_data.extraDetails
          ? res_data.extraDetails
          : res_data.message || "Invalid credentials";
        toast.error(errorMessage);
      }
    } catch (error) {
      console.error("An error occurred:", error);
      toast.error("An error occurred while logging in");
    }
  };

  return (
    <section className="AdminLoginForm">
      <div className="row">
        <div className="col-md-4"></div>
        <div className="col-md-4">
          <div className="LoginForm">
            <form onSubmit={handleSubmit}>
              <div className="form-outline mb-4">
                <label className="form-label" htmlFor="email">
                  Email address
                </label>
                <input
                  type="email"
                  id="email"
                  className="form-control"
                  name="email"
                  value={user.email}
                  onChange={handleInput}
                  required
                />
              </div>

              <div className="form-outline mb-4">
                <label className="form-label" htmlFor="password">
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  className="form-control"
                  name="password"
                  value={user.password}
                  onChange={handleInput}
                  required
                />
              </div>
              <div className="row mb-4">
                <div className="col">
                  {/* <a href="#">Forgot password?</a> */}
                </div>
              </div>

              <button
                type="submit"
                className="btn btn-primary btn-block mb-4 signin"
              >
                Sign in
              </button>
            </form>
          </div>
        </div>
        <div className="col-md-4"></div>
      </div>
    </section>
  );
};

export default Login;
