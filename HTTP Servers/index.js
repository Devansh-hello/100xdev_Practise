  const express = require("express")
  const jwt = require('jsonwebtoken');
  const JWT_SECRET= "Iamjustapassword"
  const app = express()
  const port = 3000

  app.use(express.json());

  let users = [ ];


  app.get('/', (req, res) => {
    res.send("I am Live!!")
  })


  app.post('/signup', (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    users.push({
      username: username,
      password: password
    })  

    res.json({
      message:"you are signed in"
    })

  })

  
  app.post('/signin', (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    for (let i = 0;i < users.length; i++){
      if(username == users[i].username){
        const token = jwt.sign({username: username}, JWT_SECRET)
        
        res.json({
          message:`Generated Your Token: ${token}`
        })
      }
    }

    console.log(users)
    
  })

  app.get('/me', (req,res)=>{

    const token = req.headers.token;

    const decryptinfo = jwt.verify(token,JWT_SECRET);

    const username = decryptinfo.username;

    res.json({message: username})

  })

  app.listen(port);