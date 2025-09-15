import React from 'react'
import TextField from '@mui/material/TextField'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import {  Link } from 'react-router-dom'


const Register = () => {
  return (
    <div style={{ textAlign: "center", marginTop: "5rem" }}>
      <h2 style={{ color: "#AA8736" }}>REGISTER</h2>
      <Box
        component="form"
       
        sx={{ '& > :not(style)': { m: 1, width: '35ch' } }}
        noValidate
        autoComplete="off"
      >
        <TextField
          id="standard-basic"
          label="Email"
          variant="standard"
          required
        /><br></br>

        <TextField
          id="standard-basic"
          label="Password"
          variant="standard"
          required
        /><br></br>

         <TextField
          id="standard-basic"
          label="Confirm Password"
          variant="standard"
          required
        /><br></br>

        <Button variant="contained" type='submit' style={{ backgroundColor: "#AA8736", marginTop: "10px" }}>Sign-Up</Button><br></br>
        <span>Do you  have an account ?</span>
        <Link to="/login" style={{ color: "#AA8736", textDecoration: "none", fontWeight: "bold",marginLeft:"2px" }}>
          Login
        </Link>
      </Box>
    </div>
  )
}

export default Register
