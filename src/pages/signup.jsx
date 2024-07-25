import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../config/firebase";
import './signup.css'; // Import the CSS file

const SignUp = () => {
   const navigate = useNavigate();
   const [showPass, setShowPass] = useState(false);
   const [email, setEmail] = useState("");
   const [password, setPassword] = useState("");

   const onSignUp = async (e) => {
      e.preventDefault();
      try {
         const userCredential = await createUserWithEmailAndPassword(auth, email, password);
         const user = userCredential.user;
         console.log(user);
         navigate("/login");
      } catch (error) {
         const errorCode = error.code;
         const errorMessage = error.message;
         console.log(errorCode, errorMessage);
      }
   };

   return (
      <section className="container">
         <div className="moving-text-container">
            <div className="scrolling-text">
               <p>Welcome To Your Quiz</p>
            </div>
            <div className="scrolling-text">
               <p>Please Create Your Account First, Before Login</p>
            </div>
         </div>
         <div className="slide-form">
            <h1 className="text-center text-xl font-bold text-white">Sign Up</h1>
            <form onSubmit={onSignUp} className="form-group space-y-6">
               <div className="form-group">
                  <label htmlFor="email-address" className="text-white">Email Address</label>
                  <input
                     id="email-address"
                     className="border-zinc-800 border rounded-xl bg-zinc-900 focus:border-blue-500 caret-blue-500 py-2.5 px-4 outline-0 w-full"
                     type="email"
                     value={email}
                     onChange={(e) => setEmail(e.target.value)}
                     placeholder="Email address"
                     required
                  />
               </div>

               <div className="form-group">
                  <label htmlFor="password" className="text-white">Create Password</label>
                  <div className="relative">
                     <input
                        id="password"
                        className="border-zinc-800 border rounded-xl bg-zinc-900 focus:border-blue-500 caret-blue-500 py-2.5 px-4 outline-0 w-full"
                        type={showPass ? 'text' : 'password'}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Password"
                        required
                     />
                     
                  </div>
               </div>

               <button type="submit" className="py-2 px-4 rounded-xl font-semibold bg-blue-500 hover:bg-blue-600 text-white">
                  Sign Up
               </button>
            </form>

            <p className="text-center text-white">
               Already have an account?{' '}
               <NavLink to="/login" className="text-blue-500 hover:underline">
                  Sign In
               </NavLink>
            </p>
         </div>
      </section>
   );
};

export default SignUp;
