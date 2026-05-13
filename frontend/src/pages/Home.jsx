import api from "../services/api"
import BlogCard from "../components/BlogCard"
import toast from "react-hot-toast"
import { useEffect, useState } from "react"


const Home = () => {

  const [blogs, setBlogs] = useState([]);

  const [loading, setLoading] = useState(true);

  const fetchBlogs = async () => {
    try {
      const { data } = await api.get("/blogs");
      setBlogs(data);
    } catch (error) {
      console.log(error)
      toast.error("Failed to fetch blogs");
    } finally {
      setLoading(false)
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  if(loading) {
    return (
      <div className="text-center mt-10">Loading blogs...</div>
    );
  }
  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <h1 className="text-4xl font-bold mb-8">Latest Blogs</h1>
      {blogs.length === 0 ? (<p>No Blogs found</p>) : (
        <div className="grid grid-cols-1 md:gird-cols-2 lg:grid-cols-3 gap-6">
          {
            blogs.map((blog) => (
              <BlogCard key={blog._id}
              blog={blog}/>
            ))
          }
        </div>
      )}
    </div>
  )
}

export default Home