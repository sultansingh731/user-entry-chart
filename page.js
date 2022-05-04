const express = require("express");
const app = express();
app.set('view engine', 'ejs');
unapprovedUser = [];
approvedUser = [];

app.use(express.json())

app.get('/', (req, res) => {
    res.render("design",{
       unapprovedUser: unapprovedUser,
       approvedUser: approvedUser 
    });

})
app.get("/users/", (req, res) => {
    res.json({
        unapproved_user: unapprovedUser,
        approved_user: approvedUser
    })
})

app.post("/users/create", (req, res) => {
    const userName = req.body.name
    const userCount = unapprovedUser.length + approvedUser.length
    const userId = userCount + 1
    const user = {
        name: userName,
        id: userId,
        status: "unapproved"
    }
    unapprovedUser.push(user)
    console.log("unapproved user", unapprovedUser);
    res.json(user)
    
})
app.put("/users/approved",(req, res)=>{
    const userId = req.body.id
    console.log(userId);
    const userIndex = unapprovedUser.findIndex(user => user.id==userId)
    if (userIndex == -1){
        res.json({
            message:`No unappoved user with id = ${userId}`
        })
        return;
    }
    const userName = unapprovedUser[userIndex].name
    const user = {
        name: userName,
        id: userId,
        status: "approved"
    }
    approvedUser.push(user)
    unapprovedUser = unapprovedUser.filter(user => user.id != userId)
    res.json({
        ...user,
        message:"user approved"
    })
})
app.listen(5000, () => {
    console.log('server started at 5000...');
})


