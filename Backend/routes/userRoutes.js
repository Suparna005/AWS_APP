const express=require('express')
const jwt=require('jsonwebtoken')
const router=express.Router('../routes/userRoutes')
const userSchema=require('../Models/usermodel')

router.use(express.json())
router.use(express.urlencoded({extended:true}))

// login route
router.post("/login", async (req, res) => {
  
  const payload={ email:req.body.email, password :req.body.password} 

    const user = await userSchema.findOne({ email:req.body.email })

    if (!user) {
      res.json({ message: "User not found" });
    }
 try {
    if (user.password == req.body.password) {
      // res.json({ success: false, message: "Invalid password" })

      const token=jwt.sign(payload,"secret")

      //if everything matches
    res.status(200).send({success: true, message: "Logined successfully", usertoken:token })  
    }
  
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server error" });
  }
});


module.exports = router