import { Link } from "react-router-dom"
import { GiHamburgerMenu } from "react-icons/gi";
import toast from "react-hot-toast";

const Navbar = () => {
    const handletoast = () => {
        toast.success("Success")
    }
  return (
    <div className="navbar bg-base-100 shadow-md px-4 md:px-10">
        <div className="flex-1">
            <Link to="/" className="text-2xl font-bold text-primary">My Blogs</Link>
        </div>
        <div className="hidden md:flex gap-4 items-center">
            <Link to="/" className="btn btn-ghost">Home</Link>
            <Link to="/login" className="btn btn-ghost">Login</Link>
            <Link to="/signup" className="btn btn-ghost">Signup</Link>
            <Link to="/create" className="btn btn-primary" onClick={handletoast}>Create Blog</Link>
        </div>

        <div className="dropdown dropdown-end md:hidden">
            <label tabIndex={0} className="btn btn-ghost">{<GiHamburgerMenu/>}</label>
            <ul tabIndex={0} className="menu dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
                <li>
                    <Link to="/">Home</Link>
                </li>
                <li>
                    <Link to="/login">Login</Link>
                </li>
                <li>
                    <Link to="/singup">Singup</Link>
                </li>
                <li>
                    <Link to="/create">Create Blog</Link>
                </li>
            </ul>
        </div>
    </div>
    
  )
}

export default Navbar