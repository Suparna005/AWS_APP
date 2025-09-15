const express = require('express')
const jwt=require('jsonwebtoken')
const router = express.Router('../routes/blogRoutes')
const blogmodel = require('../Models/blogmodel')
router.use(express.json())

//adding middleware

function verifyToken(req,res,next){
let token=req.headers.token
try{
    if(!token)throw 'Unauthorized Access'
    let payload=jwt.verify(token,"secret")
    if(!payload) throw 'Unauthorized Access'
    next()

}catch(err){
    res.json({message:err})

}
}
router.get('/', async (req, res) => {
    try {
        const apps = await blogmodel.find()
        res.status(200).send(apps)
    }
    catch {
        console.error(error)
        res.status(400).send("failed to fetch blogs....")
    }
})

router.get('/:id', async (req, res) => {
  try {
    const blogdetails = await blogmodel.findById(req.params.id); 
    if (!blogdetails) {
      return res.status(404).json({ error: 'Blog not found' });
    }
    res.json(blogdetails);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch blog details' });
  }
})
router.post('/add',verifyToken, async (req, res) => {
    try {
        const newBlog = new blogmodel(req.body)
        await newBlog.save()
        res.json(newBlog)
        res.status(200).send({ message: "Blog is added...." })
    }
    catch (err) {
        res.status(400).send("failed to add blog....")
    }
})
router.put('/update/:id',verifyToken, async (req, res) => {
    try {
      const data= await blogmodel.findByIdAndUpdate(req.params.id,req.body)
        res.status(200).send({ message: "Blog is updated...." })
    }
    catch (err) {
        res.status(400).send("failed to update blog....")
    }
})
router.delete('/delete/:id',verifyToken, async (req, res) => {
    try {
        await blogmodel.findByIdAndDelete(req.params.id)
        res.status(200).send({ message: "Blog deleted...." })
    }
    catch (error) {
        console.error(error)
        res.status(400)({ message: 'Blog deleted' })
    }
})



module.exports = router