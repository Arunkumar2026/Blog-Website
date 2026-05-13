import { useNavigate } from "react-router-dom"
import toast from "react-hot-toast"
import api from "../services/api"
import { useState } from "react";

const CreateBlog = () => {

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    content: "",
    author: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const token = localStorage.getItem("token");

      const { data } = await api.post("/blogs", formData,
       {
        headers: {
          Authorization: `Bearer ${token}` 
        },
       } 
      );

      toast.success("Blog created successfully");

      console.log(data);

      navigate("/")
    } catch (error) {
      console.log(error)
      toast.error(error.response?.data?.message || "Something went wrong")
    } finally {
      setLoading(false);
    }
  };


  return (
    <div className="min-h-screen flex items-center justify-center bg-base-200 px-4">
      <div className="card w-full max-w-2xl bg-base-100 shadow-2xl">
        <div className="card-body">
          <h2 className="text-3xl font-bold text-center mb-6">
            Create blog
          </h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="label">
                <span className="label-text">Title</span>
              </label>

              <input type="text" name="title" placeholder="Enter blog title" className="input input-bordered w-full" value={formData.title} onChange={handleChange} required/>
            </div>

            <div>
              <label className="label">
                <span className="label-text">
                  Author 
                </span>
              </label>

              <input type="text" name="author" placeholder="Enter author name" className="input input-bordered w-full" value={formData.author}  onChange={handleChange} required/>
            </div>

            <div>
              <label className="label">
                <span className="lable-text">
                  Content
                </span>
              </label>

              <textarea name="content" placeholder="Write your blog..." className="textarea textarea-bordered w-full h-40" value={formData.content} onChange={handleChange} required/>
            </div>

            <button type="submit" className="btn btn-primary w-full" disabled={loading}>
              {loading ? "Creating..." : "Create Blog"}
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default CreateBlog