import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useLoginMutation } from "../../features/auth/authApi";
import checkValidEmail from "../../utils/checkValidEmail";

const StudentLoginForm = () => {
  const [checkEmailError, setCheckEmailError] = useState(false);
  const [login, { data, isLoading, error, isError }] = useLoginMutation();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  useEffect(() => {
    if (data?.accessToken && data?.user) {
      if (data?.user?.role === "student") {
        navigate(from, { replace: true });
        toast.success(`Welcome ${data?.user?.name}`);
      }
    }
  }, [from, navigate, data]);

  const handleEmailCheck = (e) => {
    const email = e.target.value;
    const result = checkValidEmail(email);
    if (!result) {
      setCheckEmailError(true);
    } else {
      setCheckEmailError(false);
    }
  };

  const handleLogin = (e) => {
    e.preventDefault();

    if (!checkEmailError) {
      const data = {
        email: e.target.email.value,
        password: e.target.password.value,
      };
      login(data);
    }
  };
  return (
    <>
      <div className="mx-auto max-w-md px-5 lg:px-0">
        <div>
          <Link
            to={"/"}
            className="flex items-center justify-center space-x-2 text-cyan-500"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4.26 10.147a60.436 60.436 0 00-.491 6.347A48.627 48.627 0 0112 20.904a48.627 48.627 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.57 50.57 0 00-2.658-.813A59.905 59.905 0 0112 3.493a59.902 59.902 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.697 50.697 0 0112 13.489a50.702 50.702 0 017.74-3.342M6.75 15a.75.75 0 100-1.5.75.75 0 000 1.5zm0 0v-3.675A55.378 55.378 0 0112 8.443m-7.007 11.55A5.981 5.981 0 006.75 15.75v-1.5"
              />
            </svg>

            <h2 className="text-xl text-center lg:text-2xl font-medium ">
              Learning Portal
            </h2>
          </Link>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-slate-100">
            Sign in to Student Account
          </h2>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleLogin}>
          <input type="hidden" name="remember" value="true" />
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="email-address" className="sr-only">
                Email address
              </label>
              <input
                id="email-address"
                name="email"
                type="email"
                autoComplete="email"
                onChange={handleEmailCheck}
                required
                className="login-input rounded-t-md"
                placeholder="Email address"
              />
            </div>
            <div>
              <label htmlFor="password" className="sr-only">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                className="login-input rounded-b-md"
                placeholder="Password"
              />
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="text-sm">
              Don't have an account?{" "}
              <Link
                to={"/student/registration"}
                className="font-medium text-violet-600 hover:text-violet-500"
              >
                Register
              </Link>
            </div>
            <div className="text-sm">
              <Link
                to={"/admin"}
                className="font-medium text-violet-600 hover:text-violet-500"
              >
                Admin Login
              </Link>
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-violet-600 hover:bg-violet-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-violet-500"
            >
              Sign in
            </button>
          </div>
          <div>
            {checkEmailError && (
              <p className="text-center text-red-500">Not a valid email!</p>
            )}
            {isLoading && <p className="text-center">Loading...</p>}
            {error && <p className="text-center text-red-500">{error?.data}</p>}
            {isError && (
              <p className="text-center text-red-500">Server Error!</p>
            )}
          </div>
        </form>
      </div>
    </>
  );
};

export default StudentLoginForm;
