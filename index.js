const express = require("express");
const path = require("path")
const app = express();
const mongoose = require('mongoose')
const cors = require('cors')
app.set('view engine', 'ejs');
const User = require('./User');
mongoose.connect('mongodb://localhost:27017/userdb')

app.use(express.json())
app.use(cors())

app.use(express.static(path.join(__dirname,"front-end/build")))

app.get('/', async (req, res) => {
    res.sendFile(paht.join(__dirname,"front-end/build","index.html"));
})

app.get("/users/", async (req, res) => {
    const userList =  await User.find()
    res.json({
        userList : userList
    })
})

app.post("/users/create", async (req, res) => {
    const userName = req.body.name
    const userCount = await User.count()
    const userId = userCount + 1
    const user = {
        name: userName,
        id: userId,
        isApprove: false
    }
    await User.create(user)

    res.json(user)
})

app.put("/users/approved", async (req, res)=>{
    const userId = req.body.id
    const user = await User.findOne({id:userId})
    if (!user){
        res.json({
            message:`No unappoved user with id = ${userId}`
        })
        return;
    }
    user.isApprove= true
    user.save()
    res.json({
        ...user,
        message:"user approved"
    })
})

app.listen(5000, () => {
    console.log('server started at 5000...');
})
