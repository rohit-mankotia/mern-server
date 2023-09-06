const Model = require('../model');
const { Blog } = Model;

module.exports = {
    async allBlogs(req, res) {
        try {
            const blogs = await Blog.find();
            if (!blogs || blogs.length === 0) return res.status(200).json({ success: true, message: 'No blog found' });
            res.status(200).json({ success: true, message: 'All Blogs', blogs });
        }
        catch (error) {
            console.log(error);
            res.status(500).json({ success: false, error: 'Something went wrong' });
        }
    },
    async searchByCategory(req, res) {
        try {
            const blogs = await Blog.find({ 'category': req.params.category });
            if (!blogs || blogs.length === 0) return res.status(200).json({ success: true, message: 'No blog found' });
            res.status(200).json({ success: true, message: 'All Blogs', blogs });
        }
        catch (error) {
            console.log(error);
            res.status(500).json({ success: false, error: 'Something went wrong' });
        }
    }
}