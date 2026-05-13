import { useNavigate, Link } from "react-router-dom"
import toast from "react-hot-toast"

import api from "../services/api"
import { useState } from "react";

const Singup = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
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

      const { data } = await api.post("/auth/signup",formData);

      toast.success("Singup successful")

      console.log(data);

      navigate("/login");

    } catch (error) {
      toast.error(
        error.response?.data?.message || "Something went wrong"
      );
    } finally {
      setLoading(false);
    }
  }
  return (
    <div className="min-h-screen flex items-center justify-center bg-base-200 px-4">
      <div className="card w-full max-w-md bg-base-100 shadow-2xl">
        <div className="card-body">
          <h2 className="text-3xl font-bold text-center mb-6">Singup</h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="label">
                <span className="label-text">Name</span>
              </label>

              <input type="text"
                name="name"
                placeholder="Enter your name"
                className="input input-bordered w-full"
                value={formData.name}
                onChange={handleChange}
                required />
            </div>

            <div>
              <label className="label">
                <span className="label-text">
                  Email
                </span>
              </label>

              <input type="email"
              name="email"
              placeholder="Enter you email"
              className="input input-bordered w-full"
              value={formData.email}
              onChange={handleChange}
              required />
            </div>

            <div>
              <label className="label">
                <span className="label-text">
                  Password
                </span>
              </label>

              <input type="password"
              name="password"
              placeholder="Enter you password"
              className="w-full input input-bordered"
              onChange={handleChange}
              required
              value={formData.password} />
            </div>

            <button type="submit" className="btn btn-primary w-full" disabled={loading}>
              {loading ? "Loading" : "Signup"}
            </button>
          </form>

          <p className="text-center mt-4">
            Already have an account?
            <Link to="/login" className="text-primary ml-1">Login</Link>
          </p>
        </div>
      </div>
    </div>
  )
}

export default Singup