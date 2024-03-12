import  express  from "express";
import bcrypt from 'bcrypt'
import {User} from '../models/User.js'
import jwt from 'jsonwebtoken'

const router = express.Router();

router.post("/signup",async (req,res) =>{
    const {name,email,password} = req.body;
    const user = await User.findOne({email})
    if (user){
        return res.json({message:"user already existed"})
    }
    const hashpassword = await bcrypt.hash(password,10)
    const newUser = new User ({
        name,
        email,
        password:hashpassword,
        
    })

    await newUser.save()
    return res.json({status:true , message  :"record registers"})


})

router.post('/login',async (req,res)=>{
    const {email,password} = req.body;
    const user = await User.findOne({email})
    if(!user){
        return res.json({message:"user is not registered"})
    }
    const validPassword = await bcrypt.compare(password,user.password)
    if(!validPassword){
        return res.json({message : "password is incorrect"})
    }
    const token = jwt.sign({username :user.name},process.env.KEY,{expiresIn:'1h'})
    res.cookie('token' ,token,{httpOnly:true,maxAge:360000})
    return res.json({status :true , message : "login successfully"})


})

const verifyToken = (req, res, next) => {
    const token = req.cookies.token;
    if (!token) {
        return res.status(401).json({ message: "Unauthorized: No token provided" });
    }
    jwt.verify(token, process.env.KEY, (err, decoded) => {
        if (err) {
            return res.status(401).json({ message: "Unauthorized: Invalid token" });
        }
        req.user = decoded;
        next();
    });
};


router.get("/protected", verifyToken, (req, res) => {
    res.json({ message: "Protected route accessed successfully" });
});

router.delete("/posts/:postId", verifyToken, async (req, res) => {
    const postId = req.params.postId;
    const userId = req.user.userId; 
    const post = await Post.findById(postId);
    if (!post) {
        return res.status(404).json({ message: "Post not found" });
    }
    if (post.userId !== userId) {
        return res.status(403).json({ message: "Unauthorized: You do not have permission to delete this post" });
    }
    await Post.findByIdAndDelete(postId);
    res.json({ message: "Post deleted successfully" });
});


export{router as UserRouter}