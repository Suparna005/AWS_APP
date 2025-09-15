const express = require('express');
const jwt = require('jsonwebtoken');
const router = express.Router();
const blogmodel = require('../Models/blogmodel');

router.use(express.json());

// 🔐 Middleware for token verification
function verifyToken(req, res, next) {
  const token = req.headers.token;
  try {
    if (!token) throw 'Unauthorized Access';
    const payload = jwt.verify(token, "secret");
    if (!payload) throw 'Unauthorized Access';
    next();
  } catch (err) {
    return res.status(401).json({ success: false, message: err });
  }
}

// ✅ Get all blogs
router.get('/', async (req, res) => {
  try {
    const apps = await blogmodel.find();
    res.status(200).json({ success: true, blogs: apps });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Failed to fetch blogs" });
  }
});

// ✅ Get single blog by ID
router.get('/:id', async (req, res) => {
  try {
    const blogdetails = await blogmodel.findById(req.params.id);
    if (!blogdetails) {
      return res.status(404).json({ success: false, message: 'Blog not found' });
    }
    res.status(200).json({ success: true, blog: blogdetails });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Failed to fetch blog details' });
  }
});

// ✅ Add new blog
router.post('/add', verifyToken, async (req, res) => {
  try {
    const newBlog = new blogmodel(req.body);
    await newBlog.save();
    res.status(201).json({ success: true, message: "Blog added successfully", blog: newBlog });
  } catch (err) {
    res.status(400).json({ success: false, message: "Failed to add blog" });
  }
});

// ✅ Update blog
router.put('/update/:id', verifyToken, async (req, res) => {
  try {
    const updatedBlog = await blogmodel.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedBlog) {
      return res.status(404).json({ success: false, message: "Blog not found" });
    }
    res.status(200).json({ success: true, message: "Blog updated successfully", blog: updatedBlog });
  } catch (err) {
    res.status(400).json({ success: false, message: "Failed to update blog" });
  }
});

// ✅ Delete blog
router.delete('/delete/:id', verifyToken, async (req, res) => {
  try {
    const deletedBlog = await blogmodel.findByIdAndDelete(req.params.id);
    if (!deletedBlog) {
      return res.status(404).json({ success: false, message: "Blog not found" });
    }
    res.status(200).json({ success: true, message: "Blog deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(400).json({ success: false, message: 'Failed to delete blog' });
  }
});

module.exports = router;
