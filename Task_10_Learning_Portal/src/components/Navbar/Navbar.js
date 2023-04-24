import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { userLoggedOut } from "../../features/auth/authSlice";
import useAuthCheck from "../../hooks/useAuthCheck";

const Navbar = () => {
  const { user } = useSelector((state) => state.auth);
  const [isStudent, setIsStudent] = useState(true);
  const user1 = useAuthCheck();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (user?.role === "student") {
      setIsStudent(true);
    } else {
      setIsStudent(false);
    }
  }, [user]);

  const handleLogout = () => {
    dispatch(userLoggedOut());
    localStorage.clear();
    if (user?.role === "student") {
      toast.success("Logged-out Successfully");
      navigate("/");
    } else {
      toast.success("Logged-out Successfully");
      navigate("/admin");
    }
  };

  return (
    <>
      <nav className="shadow-md">
        <div className="max-w-7xl px-5 lg:px-0 mx-auto flex flex-col lg:flex-row space-y-4 lg:space-y-0 justify-between items-center py-3">
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
          <div className="flex items-center gap-3">
            {isStudent && <Link to={"/"}>Playlist</Link>}
            {isStudent && <Link to={"/student/leaderBoard"}>Leaderboard</Link>}
            {user && <h2 className="font-bold">{user?.name}</h2>}
            {user ? (
              <button
                className="flex gap-2 border border-cyan items-center px-4 py-1 rounded-full text-sm transition-all hover:bg-cyan"
                onClick={handleLogout}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75"
                  />
                </svg>
                Logout
              </button>
            ) : (
              <button
                className="flex gap-2 border border-cyan items-center px-4 py-1 rounded-full text-sm transition-all hover:bg-cyan"
                onClick={() => navigate("/")}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75"
                  />
                </svg>
                Login
              </button>
            )}
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
