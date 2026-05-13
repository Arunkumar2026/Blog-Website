import Blog from "../models/Blog.js";

export const createBlog = async (req, res) => {
    try {
        const { title, content, author } = req.body;

        const blog = await Blog.create({
            title,
            content,
            author,
            user: req.user._id,
        });

        res.status(201).json(blog);
    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
};


export const getBlogs = async (req, res) => {
    try {
        const blogs = await Blog.find().populate("user", "name email");

        res.status(200).json(blogs);
    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
}

export const getBlogById = async (req, res) => {
    try {
        const blog = await Blog.findById(req.params.id).populate("user", "name email");

        if(!blog){
            return res.status(404).json({
                message: "Blog not found",
            });
        }
        res.status(200).json(blog)
    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
}

export const updateBlog = async(req, res) => {
    try {
        const blog = await Blog.findById(req.params.id);

        if(!blog){
            return res.status(404).json({
                message: "Blog not found"
            });
        }

        if(blog.user?.toString() !== req.user._id.toString()){
            return res.status(401).json({
                message: "Not authorized"
            });
        }

        blog.title = req.body.title || blog.title;
        blog.content = req.body.content || blog.content;
        blog.author = req.body.author || blog.author;

        const updateBlog = await blog.save();

        res.status(200).json(updateBlog);
    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
}

export const deleteBlog = async(req, res) => {
    try {
        const blog = await Blog.findById(req.params.id);

        if(!blog){
            return res.status(404).json({
                message: "Blog not found"
            });
        }

        if(blog.user?.toString() !== req.user._id.toString()){
            return res.status(401).json({
                message: "Not authorized",
            });
        }

        await blog.deleteOne();

        res.status(200).json({
            message: "Blog delete successfully"
        });
    } catch (error) {
        res.status(500).json({
            message: error.message,
        })
    }
}