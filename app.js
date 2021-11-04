const express = require('express')
const PORT = process.env.PORT || 5000
const SECRET = process.env.SECRET || "12345"
const app = express()
const path = require('path')
const mongoose = require('mongoose');
const postModel = require("./schema");
const User = require("./userSchema");
const {
    stringToHash,
    varifyHash
} = require("bcrypt-inzi");
const cors = require("cors");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
mongoose.connect("mongodb+srv://armalik:1234@cluster0.ymiti.mongodb.net/test")


app.use('/', express.static(path.join(__dirname, 'web/build')))
app.use(express.json())
app.use(cookieParser())

app.use(cors({
    origin: ["http://localhost:3000", "http://localhost:5000"],
    credentials: true
}))


app.post('/api/v1/login', async (req, res) => {
    try {
        const { email, password, } = req.body;

        if (!email ||
            !password
        ) {
            console.log("required field missing");
            res.status(403).send("required field missing");
            return;
        }

        console.log("req.body: ", req.body);


        const userLogin = await User.findOne({ email: email })

        const isMatch = await varifyHash(password, userLogin.password);

        if (!isMatch) {
            res.status(400).json({ error: "Invalid Credentials" });
        } else {
            var token = jwt.sign({
                name: userLogin.name,
                email: userLogin.email,
                _id: userLogin._id,
            }, SECRET);
            console.log("token created: ", token);

            res.cookie("token", token, {
                httpOnly: true,
                // expires: (new Date().getTime + 300000), //5 minutes
                maxAge: 300000
            });

            res.send({
                name: userLogin.name,
                email: userLogin.email,
                address: userLogin.address,
                phoneNumber: userLogin.phoneNumber,
                gender: userLogin.gender,
                _id: userLogin._id,
            });

        }
    } catch (err) {
        console.log(err);
    }
})
app.post('/api/v1/signup', async (req, res) => {


    const { name, email, password, address, phoneNumber, gender } = req.body;


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
        const userExist = await User.findOne({ email: email });

        if (userExist) {
            return res.status(422).json({ error: "Email already Exist" });
        } else {
            console.log(req.body)

            stringToHash(req.body.password).then(passwordHash => {
                console.log("hash: ", passwordHash);

                let newUser = new User({
                    name,
                    email,
                    password,
                    address,
                    phoneNumber,
                    gender,
                })
                newUser.save(() => {
                    console.log("data saved")
                    res.send('signup success')
                })
            })
        }
    } catch (err) {
        console.log(err)
    }

})


app.use((req, res, next) => {

    jwt.verify(req.cookies.token, SECRET,
        function (err, decoded) {

            req.body._decoded = decoded;

            console.log("decoded: ", decoded) // bar

            if (!err) {
                next();
            } else {
                res.status(401).send("Un-Authenticated")
            }

        })

});

app.post('/api/v1/logout', (req, res, next) => {
    res.cookie("token", "", {
        httpOnly: true,
        maxAge: 300000
    });
    res.send();
})


app.get('/api/v1/profile', (req, res) => {
    User.findOne({ email: req.body._decoded.email }, (err, user) => {

        if (err) {
            res.status(500).send("error in getting database")
        } else {
            if (user) {
                res.send({
                    name: user.name,
                    email: user.email,
                    _id: user._id,
                });
            } else {
                res.send("user not found");
            }
        }
    })
})

app.post("/api/v1/create", (request, response) => {

    try {
        const body = request.body;
        postModel.create(body, (error, data) => {
            if (error) {
                throw error;
            } else {
                console.log(data);
                response.send(data);
            }
        });
    } catch (error) {
        response.send(`Got an error `, error.message);
    }

});


app.get("/api/v1/posts", (request, response) => {

    try {
        const { title } = request.headers;
        const query = {};
        if (title) {
            query.title = title;
        }
        postModel.find(query, (error, data) => {
            if (error) {
                throw error;
            } else {
                response.send(JSON.stringify(data));
            }
        });
    } catch (error) {
        response.send(`Got an error during get posts `, error.message);
    }
});

app.get('/**', (req, res) => {
    res.redirect('/')
})

app.listen(PORT, () => {
    console.log(`Example app listening at http://localhost:${PORT}`)
})