import { Link, useNavigate } from "react-router-dom"

import toast from "react-hot-toast"
import api from "../services/api"
import { useState } from "react";


const Login = () => {

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const { data } = await api.post("/auth/login", formData);

      localStorage.setItem("token", data.token);

      localStorage.setItem("user", JSON.stringify(data));

      toast.success("Login successful");

      navigate("/");
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };


  return (
    <div className="min-h-screen flex items-center justify-center bg-base-200 px-4">
      <div className="card w-full max-w-md bg-base-100 shadow-2xl">
        <div className="card-body">
          <h2 className="text-3xl font-bold text-center mb-6">
            Login
          </h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="label">
                <span className="label-text">Email</span>
              </label>

              <input type="email"
              name="email" placeholder="Enter your email" className="input input-bordered w-full" value={formData.email} onChange={handleChange} required/>
            </div>

            <div>
              <label className="label">
                <span className="label-text">Password</span>
              </label>

              <input type="password"
              name="password" placeholder="Enter your password" className="input input-bordered w-full" value={formData.password} onChange={handleChange} required/>
            </div>

            <button type="submit" className="btn btn-primary w-full" disabled={loading}>{loading ? "Loading..." : "Login"}</button>
          </form>

          <p className="text-center mt-4">
            Don't have an account?
            <Link to="/signup" className="text-primary ml-1">Signup</Link>
          </p>
        </div>
      </div>
    </div>
  )
}

export default Login