import { Link } from "react-router-dom";
import toast from "react-hot-toast";

import { Menu } from 'lucide-react';

const Navbar = () => {

  const user = JSON.parse(
    localStorage.getItem("user")
  );

  const handleLogout = () => {

    localStorage.removeItem("token");

    localStorage.removeItem("user");

    toast.success("Logged out");

    window.location.reload();

  };

  return (
    <div className="navbar bg-base-100 shadow-md px-6">

      {/* Left */}
      <div className="navbar-start">

        {/* Mobile Menu */}
        <div className="dropdown">

          <div
            tabIndex={0}
            role="button"
            className="btn btn-ghost lg:hidden"
          >

            {<Menu/>}

          </div>

          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
          >

            <li>
              <Link to="/">
                Home
              </Link>
            </li>

            {
              user && (
                <li>
                  <Link to="/create">
                    Create Blog
                  </Link>
                </li>
              )
            }

          </ul>

        </div>

        <Link
          to="/"
          className="text-2xl font-bold text-primary"
        >
          Blog App
        </Link>

      </div>

      {/* Center */}

      <div className="navbar-center hidden lg:flex">

        <ul className="menu menu-horizontal px-1">

          <li>
            <Link to="/">
              Home
            </Link>
          </li>

          {
            user && (
              <li>
                <Link to="/create">
                  Create Blog
                </Link>
              </li>
            )
          }

        </ul>

      </div>


      {/* Right */}

      <div className="navbar-end gap-2">

        {
          user ? (

            <button
              onClick={handleLogout}
              className="btn btn-error"
            >
              Logout
            </button>

          ) : (

            <>
              <Link
                to="/login"
                className="btn btn-outline"
              >
                Login
              </Link>

              <Link
                to="/signup"
                className="btn btn-primary"
              >
                Signup
              </Link>
            </>

          )
        }

      </div>

    </div>
  );
};

export default Navbar;