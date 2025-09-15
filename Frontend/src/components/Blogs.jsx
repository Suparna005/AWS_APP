import React, { useEffect, useState } from 'react'
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography'
import axios from 'axios'
import axiosInstance from '../axiosinterceptor'
import { Navigate, useNavigate } from 'react-router-dom';


const Blogs = () => {
  const [blogs, setBlogs] = useState([])
  let token = localStorage.getItem('token')

  useEffect(() => {
  axios.get("/blogs")
    .then((response) => {
      setBlogs(Array.isArray(response.data) ? response.data : [])
    })
    .catch((error) => {
      console.error("fetching data failed:", error)
    })
}, [])

  let navigate = useNavigate()
  let updateblog = (blog) => {
    navigate('/add', { state: { blog } })
  }


  let deleteblog = (id) => {
    axiosInstance.delete("/blogs/delete/" + id)
      .then((res) => {
        window.location.reload()
        alert("deleted successfully")

      })
      .catch(err)
    console.log(err)
  }

  return (

    <div style={{ display: 'flex', flexDirection: "row", flexWrap: "wrap", gap: "1rem", marginTop: "15px", justifyContent: "center" }}>

      {blogs.map((blog, index) => (
        <Card key={index} sx={{ maxWidth: 400, width: "100%" }}>
          <CardMedia
            component="img"
            alt="green iguana"
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
            <Button  onClick={()=> navigate(`/${blog._id}`)} style={{ marginTop: "10px" }} size="small">Learn More</Button>
            {token && (
              <>
                <Button variant="contained" onClick={() => updateblog(blog)} style={{ backgroundColor: "lightseagreen" }}>EDIT</Button>
                <Button variant="contained" onClick={() => deleteblog(blog._id)} style={{ backgroundColor: "#C8A34B" }}>DELETE</Button>
              </>
            )}
          </CardActions>
        </Card>
      ))}
    </div>
  )
}

export default Blogs
