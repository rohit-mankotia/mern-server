const jwt = require("jsonwebtoken");

const Model = require("../model");

const bcrypt = require("bcrypt");

const { Admin, Blog } = Model;
const { BASE_URL, JWT_SECRET } = process.env;

module.exports = {
  async signup(req, res) {
    try {
      const {
        firstName = "",
        lastName = "",
        email = "",
        password = "",
      } = req.body;
      if (!firstName || !lastName || !email || !password)
        return res
          .status(400)
          .json({ success: false, message: "Please fill all fields" });
      if (req.file) req.body.profilePic = `${BASE_URL}${req.file.filename}`;
      const isExist = await Admin.findOne({ email });
      if (isExist)
        return res.json({ success: false, message: "Email already exist" });
      const hashPassword = await bcrypt.hash(password, 10);
      const admin = new Admin({
        firstName,
        lastName,
        // profilePic: req.body.profilePic,
        email,
        password: hashPassword,
      });
      const saveAdmin = await admin.save();
      res
        .status(200)
        .json({ success: true, message: "Signup success", data: saveAdmin });
    } catch (error) {
      console.log(error);
      res.status(500).json({ success: false, error: "Something went wrong" });
    }
  },
  async signin(req, res) {
    try {
      const { email = "", password = "" } = req.body;
      if (!email || !password)
        return res
          .status(400)
          .json({ success: false, message: "All fields required" });
      const isExist = await Admin.findOne({ email });
      if (!isExist)
        return res.json({
          success: false,
          message: "Email not exist please sign up",
        });
      const match = await bcrypt.compare(password, isExist.password);
      if (!match)
        return res.json({
          success: false,
          message: "Please check your email or password",
        });
      const token = jwt.sign({ data: isExist }, JWT_SECRET, {
        expiresIn: "1h",
      });
      res.status(200).json({
        success: true,
        message: "Login success",
        // data: isExist,
        token,
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({ success: false, error: "Something went wrong" });
    }
  },
  async createBlog(req, res) {
    try {
      const { title, description, category, link } = req.body;
      if (!title || !description || !category || !link)
        //!req.body.picture
        return res
          .status(400)
          .json({ success: false, error: "Please fill all fields" });
      if (req.file) req.body.picture = `${BASE_URL}${req.file.filename}`;
      const blog = new Blog({
        title,
        author: req.admin._id,
        // picture: req.body.picture,
        description,
        category,
        link,
      });
      const saveBlog = await blog.save();
      // const saveBlogData = await Blog.findById(saveBlog._id).populate('author', 'firstName lastName');
      res
        .status(200)
        .json({ success: true, message: "Blog create successfully", saveBlog });
    } catch (error) {
      console.log(error);
      res.status(500).json({ success: false, error: "Something went wrong" });
    }
  },
  async allBlogs(req, res) {
    try {
      const blogs = await Blog.find()
        .sort("-createdAt")
        .populate("author", "firstName lastName");
      if (!blogs || blogs.length === 0)
        return res
          .status(200)
          .json({ success: true, message: "No blog found" });
      res.status(200).json({ success: true, message: "All Blogs", blogs });
    } catch (error) {
      console.log(error);
      res.status(500).json({ success: false, error: "Something went wrong" });
    }
  },
  async searchByCategory(req, res) {
    try {
      const blogs = await Blog.find({ category: req.params.category })
        .sort("-createdAt")
        .populate("author", "firstName lastName");
        
      if (!blogs || blogs.length === 0)
        return res
          .status(200)
          .json({ success: false, message: "No blog found" });
      res.status(200).json({ success: true, message: "All Blogs", blogs });
    } catch (error) {
      console.log(error);
      res.status(500).json({ success: false, error: "Something went wrong" });
    }
  },
  async editBlog(req, res) {
    try {
      if (req.file) req.body.picture = `${BASE_URL}${req.file.filename}`;
      const editBlog = await Blog.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
      });
      if (!editBlog)
        return res
          .status(404)
          .json({ success: false, error: "Blog not found" });
      res
        .status(200)
        .json({ success: true, message: "Blog update successfully", editBlog });
    } catch (error) {
      console.log(error);
      res.status(500).json({ success: false, error: "Something went wrong" });
    }
  },
};
