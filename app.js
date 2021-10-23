const express = require('express')
const PORT = process.env.PORT || 5000
const app = express()
const path = require('path')
const mongoose = require('mongoose');
const User = require("./userSchema");
const cors = require("cors");
const bcrypt = require('bcryptjs');
mongoose.connect("mongodb+srv://armalik:1234@cluster0.ymiti.mongodb.net/test")


app.use('/', express.static(path.join(__dirname, 'web/build')))
app.use(express.json())
app.use(cors(["localhost:3000", "localhost:5000"]))

app.post('/api/v1/login', async (req, res) => {
 try{
    const {email, password,} = req.body;

    if (!email ||
        !password
    ) {
        console.log("required field missing");
        res.status(403).send("required field missing");
        return;
    }

    console.log("req.body: ", req.body);


    const userLogin = User.findOne({ email: email })

    const isMatch = await bcrypt.compare(password, userLogin.password);

    if(!isMatch) {
        res.status(400).json({error: "Invalid Credentials"});
    }else{
        res.json({message: "User Login Successfully"})
    }
} catch (err) {
    console.log(err);
}
})
app.post('/api/v1/signup', async (req, res) => {


    const {name, email, password, address, phoneNumber, gender} = req.body;


    if (!email ||
        !password ||
        !name ||
        !address ||
        !phoneNumber ||
        !gender
    ) {
        console.log("required field missing");
        res.status(403).send("required field missing");
        return;
    } 
    try {
        const userExist = await User.findOne({email: email});

        if(userExist){
            return res.status(422).json({error: "Email already Exist"});
        }

        const user = new User({
            name,
            email,
            password,
            address,
            phoneNumber,
            gender,
        })

        await user.save(() => {
            console.log("data saved")
            res.send('profile created')
        })
    } catch(err){
        console.log(err)
    }

})


app.post('/api/v1/profile', (req, res)=>{
    const email = req.body.email;
    User.find({email: email},(err, data)=>{
        if(err){
            res.send('status 500, error in getting data base')
        }
        else{
            res.send(data)
        }
    })
});

app.get('/**', (req, res) => {
    res.redirect('/')
})

app.listen(PORT, () => {
    console.log(`Example app listening at http://localhost:${PORT}`)
})