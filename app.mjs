import express from 'express'
import mongoose from "mongoose"
import cors from "cors"
import path from "path";
import { createServer } from "http";
import { Server } from "socket.io";


const __dirname = path.resolve();
import {
    stringToHash,
    varifyHash
} from "bcrypt-inzi"
import jwt from 'jsonwebtoken';
import cookieParser from 'cookie-parser';


const SECRET = process.env.SECRET || "12345"
const PORT = process.env.PORT || 5001
const app = express()

mongoose.connect("mongodb+srv://armalik:1234@cluster0.ymiti.mongodb.net/test")


const User = mongoose.model('User', {
    name: String,
    email: String,
    password: String,
    address: String,
    phoneNumber: Number,
    gender: String,
    created: { type: Date, default: Date.now },
});

const Post = mongoose.model("Post", {
    postText: String,
    wicketsText: String,
    oversText: String,
    team1Text: String,
    team2Text: String,
    gender: String,
    batText: String,
    bowlText: String,
    batter1Text: String,
    batter2Text: String,
    bowlerText: String,
    batter1runsText: String,
    batter1ballsText: String,
    batter2runsText: String,
    batter2ballsText: String,
    bowlerrunsText: String,
    targetText: String,
    created: { type: Date, default: Date.now },
    userId: String,
    name: String,
    email: String,
})


app.use(express.json())
app.use(cookieParser())

app.use(cors({
    origin: ["http://localhost:3000", "http://localhost:5001"],
    credentials: true
}))

app.use('/', express.static(path.join(__dirname, 'web/build')))
app.get("/", (req, res, next) => {
    res.sendFile(path.join(__dirname, "./web/build/index.html"))
})


app.post('/api/v1/login', (req, res, next) => {

    if (!req.body.email ||
        !req.body.password
    ) {
        console.log("required field missing");
        res.status(403).send("required field missing");
        return;
    }
    console.log("req.body: ", req.body);

    User.findOne({ email: req.body.email }, (err, user) => {

        if (err) {
            res.status(500).send("error in getting database")
        } else {
            if (user) {

                varifyHash(req.body.password, user.password).then(result => {
                    if (result) {

                        var token = jwt.sign({
                            name: user.name,
                            email: user.email,
                            _id: user._id,
                        }, SECRET);
                        console.log("token created: ", token);

                        res.cookie("token", token, {
                            httpOnly: true,
                            // expires: (new Date().getTime + 300000), //5 minutes
                            maxAge: 300000
                        });

                        res.send({
                            name: user.name,
                            email: user.email,
                            _id: user._id,
                        });
                    } else {
                        res.status(401).send("Authentication fail");
                    }
                }).catch(e => {
                    console.log("error: ", e)
                })

            } else {
                res.send("user not found");
            }
        }
    })
})

app.post('/api/v1/signup', (req, res, next) => {

    if (!req.body.email ||
        !req.body.password ||
        !req.body.name ||
        !req.body.address ||
        !req.body.phoneNumber ||
        !req.body.gender
    ) {
        console.log("required field missing");
        res.status(403).send("required field missing");
        return;
    } else {

        User.findOne({ email: req.body.email }, (err, user) => {
            if (user) {
                res.send("user already exist");
            } else {
                console.log(req.body)

                stringToHash(req.body.password).then(passwordHash => {
                    console.log("hash: ", passwordHash);

                    let newUser = new User({
                        name: req.body.name,
                        email: req.body.email,
                        password: passwordHash,
                        address: req.body.address,
                        phoneNumber: req.body.phoneNumber,
                        gender: req.body.gender,
                    })
                    newUser.save(() => {
                        console.log("data saved")
                        res.send('signup success')
                    })
                })
            }
        })
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
                res.status(401).sendFile(path.join(__dirname, "./web/build/index.html"))
            }

        })

});

app.post('/api/v1/logout', (req, res, next) => {
    res.cookie("token", "", {
        httpOnly: true,
        maxAge: 1000000
    });
    res.send();
})

app.get('/api/v1/profile', (req, res) => {
    User.findOne({ email: req.body._decoded.email }, (err, user) => {

        if (err) {
            res.status(500).send("error in getting database")
        } else {
            if (user) {
                console.log(user)
                res.send({
                    name: user.name,
                    email: user.email,
                    _id: user._id,
                    address: user.address,
                    phoneNumber: user.phoneNumber,
                    gender: user.gender,
                });
            } else {
                res.send("user not found");
            }
        }
    })
})

app.post("/api/v1/post", (req, res) => {
    const newPost = new Post({
        postText: req.body.postText,
        wicketsText: req.body.wicketsText,
        oversText: req.body.oversText,
        team1Text: req.body.team1Text,
        team2Text: req.body.team2Text,
        gender: req.body.gender,
        batText: req.body.batText,
        bowlText: req.body.bowlText,
        batter1Text: req.body.batter1Text,
        batter2Text: req.body.batter2Text,
        bowlerText: req.body.bowlerText,
        batter1runsText: req.body.batter1runsText,
        batter1ballsText: req.body.batter1ballsText,
        batter2runsText: req.body.batter2runsText,
        batter2ballsText: req.body.batter2ballsText,
        bowlerwicketsText: req.body.bowlerwicketsText,
        bowlerrunsText: req.body.bowlerrunsText,
        targetText: req.body.targetText,
        userId: req.body._decoded._id,
        name: req.body._decoded.name,
        email: req.body._decoded.email,

    });
    newPost.save().then(() => {
        console.log("Post created");
        
        io.emit("POSTS", {
            postText: req.body.postText,
            wicketsText: req.body.wicketsText,
            oversText: req.body.oversText,
            team1Text: req.body.team1Text,
            team2Text: req.body.team2Text,
            gender: req.body.gender,
            batText: req.body.batText,
            bowlText: req.body.bowlText,
            batter1Text: req.body.batter1Text,
            batter2Text: req.body.batter2Text,
            bowlerText: req.body.bowlerText,
            batter1runsText: req.body.batter1runsText,
            batter1ballsText: req.body.batter1ballsText,
            batter2runsText: req.body.batter2runsText,
            batter2ballsText: req.body.batter2ballsText,
            bowlerwicketsText: req.body.bowlerwicketsText,
            bowlerrunsText: req.body.bowlerrunsText,
            targetText: req.body.targetText,
            userId: req.body._decoded._id,
            name: req.body._decoded.name,
            email: req.body._decoded.email,

        });
        res.send({
            postText: req.body.postText,
            wicketsText: req.body.wicketsText,
            oversText: req.body.oversText,
            team1Text: req.body.team1Text,
            team2Text: req.body.team2Text,
            gender: req.body.gender,
            batText: req.body.batText,
            bowlText: req.body.bowlText,
            batter1Text: req.body.batter1Text,
            batter2Text: req.body.batter2Text,
            bowlerText: req.body.bowlerText,
            batter1runsText: req.body.batter1runsText,
            batter1ballsText: req.body.batter1ballsText,
            batter2runsText: req.body.batter2runsText,
            batter2ballsText: req.body.batter2ballsText,
            bowlerwicketsText: req.body.bowlerwicketsText,
            bowlerrunsText: req.body.bowlerrunsText,
            targetText: req.body.targetText,
            userId: req.body._decoded._id,
            name: req.body._decoded.name,
            email: req.body._decoded.email,

        });
    });
});

app.delete("/api/v1/post", (req, res) => {
    Post.deleteOne({ _id: req.body.id, userId: req.body._decoded._id }, (err, data) => {
        res.send("Post deleted");
    });
});

app.put("/api/v1/post", (req, res) => {
    Post.updateOne({
        _id: req.body.id,
        userId: req.body._decoded._id
    }, {
        Text: req.body.postText

    }, (err, data) => {
        res.send("Post deleted");
    });
});

app.get("/api/v1/posts", (req, res) => {

    const page = Number(req.query.page);

    console.log("page: ", page);

    Post.find({})
        .sort({ created: "desc" })
        .skip(page)
        .limit(5)
        .exec(function (err, data) {
            res.send(data);
        });
});

app.get("/**", (req, res, next) => {
    res.sendFile(path.join(__dirname, "./web/build/index.html"))
    // res.redirect("/")
})


const server = createServer(app);

const io = new Server(server, { cors: { origin: "*", methods: "*", } });

io.on("connection", (socket) => {
    console.log("New client connected with id: ", socket.id);

    // to emit data to a certain client
    socket.emit("topic 1", "some data")

    // collecting connected users in a array
    // connectedUsers.push(socket)

    socket.on("disconnect", (message) => {
        console.log("Client disconnected with id: ", message);
    });
});


setInterval(() => {

    // to emit data to all connected client
    // first param is topic name and second is json data
    io.emit("Test topic", { event: "ADDED_ITEM", data: "some data" });
    console.log("emiting data to all client");

}, 2000)


server.listen(PORT, function () {
    console.log("server is running on", PORT);
})