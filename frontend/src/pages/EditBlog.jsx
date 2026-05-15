
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

import api from "../services/api";
import toast from "react-hot-toast";


const EditBlog = () => {

  const {id} = useParams();

  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);

  const [formData, setFormData] = useState({
    title: "",
    content: "",
    author: ""
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value 
    });
  };

  const fetchBlog = async() => {
    try {
      const {data} =  await api.get(`/blogs/${id}`);

      setFormData({
        title: data.title,
        content: data.content,
        author: data.author
      });

    } catch (error) {
      toast.error("Failed to load blog");
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBlog();
  }, [])

  const handleSubmit = async(e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token");

      await api.put(`/blogs/${id}`,
      formData,

      {
        headers:{
          Authorization: `Bearer ${token}`
        }
      }
    );

    toast.success("Blog updated");

    navigate(`/blog/${id}`)
    } catch (error) {
      toast.error(error.response?.data?.message || "Update failed");
    }
  };

  if(loading){
    return(
      <div className="text-center mt-10">Loading...</div>
    )
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="card w-full max-w-2xl bg-base-100 shadow-2xl">
        <div className="card-body">
          <h2 className="text-3xl font-bold text-center">Edit Blog</h2>
        

        <form onSubmit={handleSubmit} className="space-y-4">
          <input type="text" name="title" value={formData.title} onChange={handleChange} className="input input-bordered w-full" placeholder="Title" />

          <input type="text" name="author" value={formData.author} onChange={handleChange} className="input input-bordered w-full" placeholder="Author" />

          <textarea name="content" value={formData.content} onChange={handleChange} className="textarea textarea-bordered w-full h-40" placeholder="Content"/>

          <button className="btn btn-primary w-full">Update Blog</button>
        </form>
        </div>
      </div>
    </div>
  )
}

export default EditBlog