import React, { useState, useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import axiosInstance from '../axiosinterceptor'

const AddBlog = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const editingBlog = location.state?.blog || null

  const [form, setForm] = useState({
    title: "",
    description: "",
    imageUrl: ""
  })

  useEffect(() => {
    if (editingBlog) {
      setForm({
        title: editingBlog.title,
        description: editingBlog.description,
        imageUrl: editingBlog.imageUrl
      })
    }
  }, [editingBlog])

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (editingBlog) {
      // ✅ Update blog
      axiosInstance.put(`/blogs/update/${editingBlog._id}`, form)
        .then(res => {
          if (res.data.success) {
            alert(res.data.message)
            navigate('/')
          }
        })
        .catch(err => console.error(err))
    } else {
      // ✅ Add new blog
      axiosInstance.post("/blogs/add", form)
        .then(res => {
          if (res.data.success) {
            alert(res.data.message)
            navigate('/')
          }
        })
        .catch(err => console.error(err))
    }
  }

  return (
    <form onSubmit={handleSubmit} style={{ margin: "20px" }}>
      <h2>{editingBlog ? "Edit Blog" : "Add Blog"}</h2>
      <input type="text" name="title" value={form.title} onChange={handleChange} placeholder="Title" required /><br />
      <textarea name="description" value={form.description} onChange={handleChange} placeholder="Description" required /><br />
      <input type="text" name="imageUrl" value={form.imageUrl} onChange={handleChange} placeholder="Image URL" required /><br />
      <button type="submit">{editingBlog ? "Update" : "Add"}</button>
    </form>
  )
}

export default AddBlog
