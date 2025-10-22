import {
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
} from "firebase/auth";
import React, { useRef, useState } from "react";
import { Link } from "react-router";
import { auth } from "../../firebase/firebase.init";

const Login = () => {
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const emailRef = useRef();
  const handleLogin = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;
    // console.log(email, password)
    setError("");
    setSuccess(false);

    signInWithEmailAndPassword(auth, email, password)
      .then((result) => {
        console.log(result.user);
        setSuccess(true);
      })
      .catch((error) => {
        console.log(error.message);
        setError(error.message);
      });
  };
  const handleForgetPassword = () => {
    const email = emailRef.current.value;
    console.log(email);
    sendPasswordResetEmail(auth, email)
      .then(()=>{
        alert('Password reset email sent!')
      })
      .catch((error) => console.log(error.message));
  };

  return (
    <div className="card bg-base-100 mx-auto w-full mt-20 max-w-sm shrink-0 shadow-2xl">
      <div className="card-body">
        <h1 className="text-5xl font-bold">Login now!</h1>
        <form onSubmit={handleLogin}>
          <fieldset className="fieldset">
            <label className="label">Email</label>
            <input
              type="email"
              className="input"
              placeholder="Email"
              name="email"
              ref={emailRef}
            />
            <label className="label">Password</label>
            <input
              type="password"
              className="input"
              placeholder="Password"
              name="password"
            />
            <div>
              <a onClick={handleForgetPassword} className="link link-hover">
                Forgot password?
              </a>
            </div>
            <button className="btn btn-neutral mt-4">Login</button>
          </fieldset>
          {error && <p className="text-red-500">{error}</p>}
          {success && (
            <p className="text-green-500 font-semibold">LogIn successful</p>
          )}
        </form>
        <p>
          Don't have an account? Please {""}
          <Link className="text-blue-500 underline" to={"/register"}>
            Register
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
