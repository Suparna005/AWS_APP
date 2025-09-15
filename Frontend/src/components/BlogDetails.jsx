import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'

const BlogDetails = () => {
  const { id } = useParams()
  const [blog, setBlog] = useState(null)

  useEffect(() => {
    axios.get(`/blogs/${id}`)
      .then((res) => {
        if (res.data.success) {
          setBlog(res.data.blog)
        } else {
          console.error(res.data.message)
        }
      })
      .catch(err => console.error(err))
  }, [id])

  if (!blog) return <h2>Loading...</h2>

  return (
    <div style={{ margin: "20px", textAlign: "center" }}>
      <h1>{blog.title}</h1>
      <img src={blog.imageUrl} alt={blog.title} width="400" />
      <p>{blog.description}</p>
    </div>
  )
}

export default BlogDetails
