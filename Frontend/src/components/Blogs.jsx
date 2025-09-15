import React, { useEffect, useState } from 'react'
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography'
import axios from 'axios'
import axiosInstance from '../axiosinterceptor'
import { useNavigate } from 'react-router-dom';

const Blogs = () => {
  const [blogs, setBlogs] = useState([])
  const token = localStorage.getItem('token')
  const navigate = useNavigate()

  // ✅ Fetch all blogs
  useEffect(() => {
    axios.get("/blogs")
      .then((response) => {
        if (response.data.success) {
          setBlogs(response.data.blogs)
        } else {
          console.error("No blogs found:", response.data.message)
        }
      })
      .catch((error) => {
        console.error("fetching data failed:", error)
      })
  }, [])

  // ✅ Navigate to update page with state
  const updateBlog = (blog) => {
    navigate('/add', { state: { blog } })
  }

  // ✅ Delete blog
  const deleteBlog = (id) => {
    axiosInstance.delete("/blogs/delete/" + id)
      .then((res) => {
        if (res.data.success) {
          alert(res.data.message)
          setBlogs((prev) => prev.filter(b => b._id !== id)) // remove from UI
        } else {
          alert("Delete failed: " + res.data.message)
        }
      })
      .catch((err) => console.error(err))
  }

  return (
    <div style={{
      display: 'flex',
      flexDirection: "row",
      flexWrap: "wrap",
      gap: "1rem",
      marginTop: "15px",
      justifyContent: "center"
    }}>
      {blogs.map((blog, index) => (
        <Card key={index} sx={{ maxWidth: 400, width: "100%" }}>
          <CardMedia
            component="img"
            alt="blog image"
            height="250"
            image={blog.imageUrl}
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div" style={{ textAlign: "center" }}>
              {blog.title}
            </Typography>
            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
              {blog.description}
            </Typography>
          </CardContent>
          <CardActions>
            <Button onClick={() => navigate(`/${blog._id}`)} size="small">Learn More</Button>
            {token && (
              <>
                <Button variant="contained" onClick={() => updateBlog(blog)} style={{ backgroundColor: "lightseagreen" }}>EDIT</Button>
                <Button variant="contained" onClick={() => deleteBlog(blog._id)} style={{ backgroundColor: "#C8A34B" }}>DELETE</Button>
              </>
            )}
          </CardActions>
        </Card>
      ))}
    </div>
  )
}

export default Blogs
