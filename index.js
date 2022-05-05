const express = require("express");
const app = express();
const mongoose = require('mongoose')
app.set('view engine', 'ejs');
const User = require('./User')
mongoose.connect('mongodb://localhost:27017/userdb')
userCount = 0; 
// unapprovedUser = [];
// approvedUser = [];

app.use(express.json())

app.get('/', async (req, res) => {
    const userList =  await User.find() // to find the all the users and it return array of users
    res.render("design",{
        userList : userList
    });

})
app.get("/users/", async (req, res) => {
    const userList =  await User.find()
    res.json({
        userList : userList
    })
})

app.post("/users/create", async (req, res) => {
    const userName = req.body.name
    // const userCount = unapprovedUser.length + approvedUser.length
    const userId = userCount + 1
    userCount++
    const user = {
        name: userName,
        id: userId,
        isApprove: false
    }
    // unapprovedUser.push(user)
    // console.log("unapproved user", unapprovedUser);
    await User.create(user)

    res.json(user)
    
})
app.put("/users/approved", async (req, res)=>{
    const userId = req.body.id
    // console.log(userId);
    // const userIndex = unapprovedUser.findIndex(user => user.id==userId)
    const user = await User.findOne({id:userId})
    if (!user){
        res.json({
            message:`No unappoved user with id = ${userId}`
        })
        return;
    }
    user.isApprove= true
    user.save()
    // const userName = unapprovedUser[userIndex].name
    // const user = {
        // name: userName,
        // id: userId,
        // status: "approved"
    // }
    // approvedUser.push(user)
    // unapprovedUser = unapprovedUser.filter(user => user.id != userId)
    res.json({
        ...user,
        message:"user approved"
    })
})
app.listen(5000, () => {
    console.log('server started at 5000...');
})


