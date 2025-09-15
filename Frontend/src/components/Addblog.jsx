import React, { useState } from 'react'
import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import { useLocation, useNavigate } from 'react-router-dom'
import axios from 'axios'
import axiosInstance from '../axiosinterceptor'
import { useEffect } from 'react'


const Addblog = () => {
  const [form, setForm] = useState({
    title: '',
    description: '',
    imageUrl: '',
    content:''
  })
  const navigate = useNavigate()

  function submitValue(e) {
    if (location.state != null) {
      axiosInstance.put('/blogs/update/' + location.state.blog._id,form)
        .then((res) => {
          console.log('Form Submitted..', response.data)
          alert("Blog updated successfully")
          navigate('/')
        })
            .catch((error) => {
              console.error(error)
            })
        
    } else {
      // e.preventDefault()

      //adding for a new blog
      axiosInstance.post('/blogs/add', form)
        .then((response) => {
          console.log('Form Submitted..', response.data)
          alert("Blog added successfully")
          navigate('/')
        })
        .catch((err) => {
          console.error(err)
        })
    }
  }

  //to track the current location,use uselocation
  let location = useLocation()
  useEffect(() => {
    if (location.state != null) {
      setForm({
        ...form,
        title: location.state.blog.title,
        description: location.state.blog.description,
        imageUrl: location.state.blog.imageUrl,
        content:location.state.blog.content

      })
    }
  }, [])

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h2 style={{ color: "#AA8736" }}>ADD BLOGS</h2>
      <Box
        component="form"
        onSubmit={submitValue}
        sx={{ '& > :not(style)': { m: 1, width: '70ch' } }}
        noValidate
        autoComplete="off"
      >
        <TextField required
          id="title"
          label="Title"
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
          variant="outlined" /><br />

        <TextField required
          id="description"
          label="Description"
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
          variant="outlined" /><br />

        <TextField required
          id="imageUrl"
          label="ImageUrl"
          value={form.imageUrl}
          onChange={(e) => setForm({ ...form, imageUrl: e.target.value })}
          variant="outlined" /><br /><br />

          <TextField required
          id="content"
          label="Content"
          value={form.content}
          onChange={(e) => setForm({ ...form, content: e.target.value })}
          variant="outlined" /><br /><br />
        <Button variant="contained" type='submit' style={{ backgroundColor: "#AA8736", height: "50px" }}>ADD BLOGS</Button>
      </Box>
    </div>
  )
}

export default Addblog