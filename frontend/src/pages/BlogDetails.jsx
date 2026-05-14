import { useParams, useNavigate, Link } from 'react-router-dom';

import { Pencil,Trash2 } from 'lucide-react';

import api from '../services/api';

import toast from 'react-hot-toast';
import { useEffect, useState } from 'react';

const BlogDetails = () => {

  const {id} = useParams();

  const navigate = useNavigate();

  const [blog, setBlog] = useState(null);

  const [loading, setLoading] = useState(true);

  const fetchBlog = async () => {
    try {
      const {data} = await api.get(`/blogs/${id}`);

      setBlog(data);
    } catch (error) {
      toast.error("Failed to load blog");
    }  finally {
    setLoading(false);
  
  }
};

  useEffect(() => {
    fetchBlog();
  }, []);

  const handleDelete = async () => {
    try {
      const token = localStorage.getItem("token");

      await api.delete(`/blogs/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );

    toast.success("Blog deleted");

    navigate("/");


    } catch (error) {
      toast.error(error.response?.data?.message || "Deleted failed");
      
    }
  };

  const user = JSON.parse(localStorage.getItem("user"));

  const isOwner = user?._id === blog?.user?._id;

  if(loading){
    return (
      <div className='text-center mt-10'>
        Loading... 
      </div>
    )
  }

  return (
    <div className='max-w-4xl mx-auto px-4 py-10'>
      <div className='bg-base-100 shadow-xl rounded-2xl p-8'>
        <h1 className='text-4xl font-bold'>{blog.title}</h1>

        <p className='text-gray-500 mt-2'>By {blog.author}</p>

        <p className='mt-6 leading-8'>{blog.content}</p>

        {isOwner && (
          <div className='flex gap-4 mt-10'>
            <Link to={`/edit/${blog._id}`} className='btn btn-info'>
              <Pencil size={18}/> Edit
            </Link>

            <button onClick={handleDelete} className='btn btn-error'>
              <Trash2 size={18}/> Delete 
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

export default BlogDetails