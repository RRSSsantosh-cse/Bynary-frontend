import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; 
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [role, setRole] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");
    
    if (!email || !password) {
      setError("Email and Password are required");
      return;
    }
    
    // Dummy authentication
    if (email === "admin@example.com" && password === "password" && role === "admin") {
        setLoading(true);
      alert("Admin Login Successful!");
      setTimeout(() => {
        setLoading(false); 
        navigate("/admin"); 
      }, 3000);
    } else if (email === "user@example.com" && password === "password" && role === "user") {
        setLoading(true); 
        alert("User Login Successful!");
        setTimeout(() => {
          setLoading(false); 
          navigate("/display"); 
        }, 5000);
    } else {
      setError("Invalid email or password");
    }
  };

  return (
    <>
      <style>
        {`
          .container {
            text-align: center;
            margin-top: 50px;
          }
          .button-group {
            display: flex;
            justify-content: center;
            gap: 20px;
          }
          .login-container {
            width: 300px;
            margin: auto;
            padding: 20px;
            border: 1px solid #ccc;
            border-radius: 5px;
            text-align: center;
          }
          .error {
            color: red;
          }
          input {
            width: 100%;
            padding: 10px;
            margin: 10px 0;
            border: 1px solid #ccc;
            border-radius: 5px;
          }
          button {
            padding: 10px 20px;
            background-color: #007bff;
            color: white;
            border: none;
            cursor: pointer;
            transition: background-color 0.3s;
            border-radius: 5px;
          }
          button:hover {
            background-color: #0056b3;
          }
          .back-button {
            margin-top: 20px;
            padding: 10px 20px;
            background-color: #ccc;
            color: white;
            border: none;
            cursor: pointer;
            border-radius: 5px;
            display: inline-block;
            margin-bottom: 20px;
          }
          .back-button:hover {
            background-color: #999;
          }
            .loader {
            border: 8px solid #f3f3f3;
            border-top: 8px solid #3498db;
            border-radius: 50%;
            width: 50px;
            height: 50px;
            animation: spin 2s linear infinite;
            margin: 20px auto;
          }

          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }

    
          .overlay {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-color: rgba(0, 0, 0, 0.5); /* Semi-transparent background */
            display: flex;
            justify-content: center;
            align-items: center;
            z-index: 9999;
          }
        `}
      </style>
      <div className="container">
        {role && <button className="back-button" onClick={() => setRole(null)}>Back</button>}
        {!role ? (
          <>
            <h2>Select Login Type</h2>
            <div className="button-group">
              <button onClick={() => setRole("user")}>Login as User</button>
              <button onClick={() => setRole("admin")}>Login as Administrator</button>
            </div>
          </>
        ) : (
          <div className="login-container">
            <h2>Login as {role === "admin" ? "Administrator" : "User"}</h2>
            {error && <p className="error">{error}</p>}
            <form onSubmit={handleSubmit}>
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button type="submit">Login</button>
            </form>
          </div>
        )}
      </div>
      {loading && (
        <div className="overlay">
          <div className="loader"></div> {/* Circular loader */}
        </div>
      )}
    </>
  );
};

export default Login;