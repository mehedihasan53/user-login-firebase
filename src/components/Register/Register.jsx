import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
  updateProfile,
} from "firebase/auth";
import React, { useState } from "react";
import { auth } from "../../firebase/firebase.init";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link } from "react-router";

const Register = () => {
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    const name = e.target.name.value;
    const photoURL = e.target.photoURL.value;
    const email = e.target.email.value;
    const password = e.target.password.value;
    const terms = e.target.terms.checked;

    const passwordRegex = /(?=.*[a-z])(?=.*[A-Z]).{6,}/;

    if (!passwordRegex.test(password)) {
      setError("Password must have at least 6 chars, with upper & lowercase.");
      return;
    }

    setError("");
    setSuccess(false);

    if (!terms) {
      setError("Please accept the terms and conditions.");
      return;
    }

    createUserWithEmailAndPassword(auth, email, password)
      .then((result) => {
        const user = result.user;
        console.log("User created:", user);

        // ✅ Update user profile with name and photo
        updateProfile(user, {
          displayName: name,
          photoURL: photoURL,
        })
          .then(() => {
            console.log("Profile updated with name & photo");
          })
          .catch((error) => console.log(error.message));

        // ✅ Send verification email
        sendEmailVerification(user)
          .then(() => {
            alert("Verification email sent! Please check your inbox.");
          })
          .catch((error) => console.log(error.message));

        setSuccess(true);
      })
      .catch((error) => {
        console.log(error.message);
        setError(error.message);
      });
  };

  const handleTogglePasswordShow = (e) => {
    e.preventDefault();
    setShowPassword(!showPassword);
  };

  return (
    <div className="hero bg-base-200 min-h-screen">
      <div className="hero-content flex-col lg:flex-row-reverse">
        <div className="text-center lg:text-left"></div>
        <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
          <div className="card-body">
            <h1 className="text-4xl font-bold mb-2">Register Now!</h1>
            <form onSubmit={handleSubmit}>
              <fieldset className="fieldset space-y-2">
                {/* Name */}
                <label className="label">Name</label>
                <input
                  type="text"
                  className="input"
                  placeholder="Your Name"
                  name="name"
                  required
                />

                {/* Photo URL */}
                <label className="label">Photo URL</label>
                <input
                  type="text"
                  className="input"
                  placeholder="Your Photo URL"
                  name="photoURL"
                />

                {/* Email */}
                <label className="label">Email</label>
                <input
                  type="email"
                  className="input"
                  placeholder="Email"
                  name="email"
                  required
                />

                {/* Password */}
                <div className="relative">
                  <label className="label">Password</label>
                  <input
                    type={showPassword ? "text" : "password"}
                    className="input"
                    placeholder="Password"
                    name="password"
                    required
                  />
                  <button
                    onClick={handleTogglePasswordShow}
                    className="btn btn-xs absolute right-5 top-7"
                  >
                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                  </button>
                </div>

                {/* Terms */}
                <label className="label cursor-pointer">
                  <input type="checkbox" className="checkbox" name="terms" />
                  <span className="label-text ml-2">
                    Accept our terms & conditions
                  </span>
                </label>

                <button className="btn btn-neutral mt-3 w-full">
                  Register
                </button>
              </fieldset>

              {/* Messages */}
              {success && (
                <p className="text-green-600 mt-2">
                  ✅ Account created successfully!
                </p>
              )}
              {error && <p className="text-red-600 mt-2">{error}</p>}
            </form>

            <p className="mt-3">
              Already have an account?{" "}
              <Link className="text-blue-500 underline" to="/login">
                Login
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
