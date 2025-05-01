import express from 'express';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';

const app = express();
dotenv.config();
app.use(express.json()); 
const posts = [
  {
    username: 'preeti',
    title: 'post 1'
  },
  {
    username: 'shanaya',
    title: 'post 2'
  }
];

app.get('/posts', authenticateToken,(req, res) => {
  res.json(posts.filter(post=>post.username===req.user.name));
});

function authenticateToken(req,res,next){
    const authHeader=req.headers['authorization']
    const token=authHeader && authHeader.split(' ')[1]
    if(token==null) return res.sendStatus(401)

        jwt.verify(token,process.env.ACCESS_TOKEN_SECRET,(err,user)=>{
            if(err) return res.sendStatus(403)
                req.user=user
                next()
        })
}

app.listen(3000, () => console.log('Server running on port 3000'));
