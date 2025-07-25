const express = require("express")
const jwt = require("jsonwebtoken")
const { UserModel } = require("./db");
const bcrypt = require("bcrypt");
const z = require("zod")

const app = express();
const JWT_SECRET = "ojfwefo22op@wefwf"

app.use(express.json())

app.get("/", (req,res)=>{
    res.sendFile(__dirname+"/home.html")
})

app.get("/signup",(req,res)=>{
    res.sendFile(__dirname+"/signup.html")
})

app.post("/signup", async (req,res)=>{
    const parsed_Info = z.object({
        Username: z.string().min(2).max(10),
        Email: z.email(),
        Password: z.string().min(8).max(20)
    })
    const complete_Parsed = parsed_Info.safeParse(req.body);

    if(!complete_Parsed.success){
        res.json({
            error: complete_Parsed.error
            
        })
        return
    }

    try{
        const Username = req.body.Username;
        const Email = req.body.Email;
        const Password = req.body.Password;

        const encrypted_pass = await bcrypt.hash(Password,5);

        await UserModel.create({
            Username: Username,
            Email: Email,
            Password: encrypted_pass
        })
        return res.send({
        message: "Account Created"
        })

    }catch(error){
        res.json({
            message: "Signup Failed"
        })
    }
    
    
})
app.get("/signin",(req,res)=>{
    res.sendFile(__dirname+"/signin.html")
})

app.post("/signin",async(req,res)=>{
    const Email = req.body.Email;
    const Password = req.body.Password;

    const user = await UserModel.findOne({
        Email:Email
    })

    const pass_Check = bcrypt.compare(user.Password, Password)


    if(pass_Check){
        const token = jwt.sign({
            id: user._id.toString(),
        },JWT_SECRET)

        return res.json({
            token:token
        })
        
    }else{
        res.status(403).send({
            alert: "User Not Found" 
        })
    }
})

function auth(req,res,next){
    try{
        const token = req.headers.token
        const user = jwt.verify(token, JWT_SECRET)

        if(user){
            req.userID= user.id;
            next()
        }
    }catch(error){
        res.redirect("/signin")
    }
}

app.get("/profile",(req,res)=>{
    res.sendFile(__dirname+"/profile.html")
})

app.get("/api/profile", auth, async(req,res)=>{
    const user= await UserModel.findById(req.userID);

    if(user){
        res.json({
            Email: user.Email,
            Password: user.Password
        })
    }else{
        res.status(404).json({
            message: "User Not Found"
        })
    }
    

} )

app.listen(3000)
