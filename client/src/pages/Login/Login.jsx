import React, { useState } from 'react';
import "./Login.css";
import logo from "../../assets/logo.png";
import { signUp, login } from '../../firebase'; // Adjust path according to your file structure

const Login = () => {
  const [signState, setSignState] = useState("Sign In");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: ""
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (signState === "Sign In") {
        console.log("Logging in with:", formData);
        await login(formData.email, formData.password);
        // User is now logged in - you can redirect or update state
        console.log("Login successful!");
      } else {
        console.log("Signing up with:", formData);
        await signUp(formData.name, formData.email, formData.password);
        // User is now registered and logged in
        console.log("Sign up successful!");
      }
    } catch (error) {
      console.error("Authentication error:", error);
      // Error is already handled in Firebase functions, but you can add additional handling here
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login">
      <img src={logo} alt="Netflix logo" className="login-logo" />
      <div className="login-form">
        <h1>{signState}</h1>
        <form onSubmit={handleSubmit}>
          {signState === "Sign Up" && (
            <input
              type="text"
              name="name"
              placeholder="Your Name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          )}

          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
            minLength={6}
          />

          <button 
            type="submit" 
            className="btnlogin" 
            disabled={loading}
          >
            {loading ? "Processing..." : signState}
          </button>

          <div className="for-help">
            <div className="remember">
              <input type="checkbox" id="remember" />
              <label htmlFor="remember">Remember me</label>
            </div>
            <p>Need help?</p>
          </div>
        </form>

        <div className="form-switch">
          {signState === "Sign In" ? (
            <p>
              New to Netflix?{" "}
              <span onClick={() => setSignState("Sign Up")}>Sign up now</span>
            </p>
          ) : (
            <p>
              Already have an account?{" "}
              <span onClick={() => setSignState("Sign In")}>Sign in now</span>
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Login;
