import { Link } from "react-router-dom";



const BlogCard = ({ blog }) => {
  return (
    <div className="card bg-base-100 shadow-xl">
        <div className="card-body">
            <h2 className="card-title">{blog.title}</h2>
            <p>{blog.content.length > 100 ? blog.content.slice(0, 100) + "..." : blog.content}</p>

            <div className="flex justify-between items-center mt-4">
                <p className="text-sm text-gray-500">By {blog.author}</p>

                <Link to={`/blog/${blog._id}`}>Read More</Link>
            </div>
        </div>
    </div>
  )
}

export default BlogCard