import React, { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../config/firebase";
import { NavLink, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import './login.css'; // Import the CSS file

const Login = () => {
   const navigate = useNavigate();
   const [showPass, setShowPass] = useState(false);
   const [email, setEmail] = useState("");
   const [password, setPassword] = useState("");

   const onLogin = (e) => {
      e.preventDefault();
      signInWithEmailAndPassword(auth, email, password)
         .then((userCredential) => {
            userCredential.user.getIdToken().then((token) => {
               Cookies.set("firebase_token", token, { expires: 7 });
            });
            navigate("/home");
            alert("Success Login !!");
         })
         .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(errorCode, errorMessage);
            alert("Login Failed !!");
         });
   };

   return (
      <section className="container">
         <div className="moving-text-container">
            <div className="scrolling-text">
               <p>Welcome To Your Quiz</p>
            </div>
            <div className="scrolling-text">
               <p>To Take Your Quiz, Please Login To Your Account</p>
            </div>
         </div>
         <div className="slide-form">
            <form onSubmit={onLogin} className="form-group">
               <div className="form-group">
                  <label htmlFor="email-address">Email Address</label>
                  <input
                     type="email"
                     id="email-address"
                     value={email}
                     onChange={(e) => setEmail(e.target.value)}
                     placeholder="Email address"
                     required
                  />
               </div>
               <div className="form-group">
                  <label htmlFor="password">Password</label>
                  <input
                     type={showPass ? "text" : "password"}
                     id="password"
                     value={password}
                     onChange={(e) => setPassword(e.target.value)}
                     placeholder="Password"
                     required
                  />
               </div>
               <div className="form-group">
                  <button type="submit">
                     Login
                  </button>
               </div>
            </form>
            <div className="mt-3 text-center">
               <p>
                  Don't have an account?{" "}
                  <NavLink className="text-blue-600" to="/signup">
                     Sign up
                  </NavLink>
               </p>
            </div>
         </div>
      </section>
   );
};

export default Login;
