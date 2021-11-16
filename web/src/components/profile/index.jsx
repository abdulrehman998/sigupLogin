import axios from 'axios';
import { useState, useEffect } from "react"
import { baseUrl } from "./../../server"
import Post from "./post"
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import io from 'socket.io-client';



function Dashboard() {
    const [inputText, setInputText] = useState("");
    const [wicketsText, setWicketsText] = useState("");
    const [overs, setOvers] = useState("");
    const [team1, setTeam1] = useState("");
    const [team2, setTeam2] = useState("");
    const [posts, setPosts] = useState([])
    const [refresh, setRefresh] = useState(false)
    const [isMore, setIsMore] = useState(true)

    useEffect(() => {
        axios.get(`${baseUrl}/api/v1/posts?page=0`, {
            withCredentials: true
        })
            .then((res) => {
                console.log("res +++: ", res.data);
                setPosts(res.data)
            })
    }, [])

    useEffect(() => {
        const socket = io("https://loginsignup1.herokuapp.com/");

        socket.on("connect", () => {
            console.log("Connected to server")
        })
        socket.on("disconnect", () => {
            console.log("Disconnected to server")
        })
        socket.on("POSTS", (data) => {
            console.log(data);
            setPosts(data)
        })
        return () => {
            socket.close();
        }
    }, [])

    // const loadMore = () => {
    //     axios.get(`${baseUrl}/api/v1/posts?page=${posts.length}`,
    //         {
    //             withCredentials: true
    //         })
    //         .then((res) => {
    //             console.log("res +++: ", res.data);
    //             if (res.data?.length) {
    //                 const newPosts = [...posts, ...res.data]
    //                 setPosts(newPosts)
    //             } else {
    //                 setIsMore(false)
    //             }
    //         })
    // }


    const submit = () => {
        if (inputText !== "") {
            const genderValue = document.querySelector(
                'input[name="gender"]:checked'
            ).value;
            axios.post(`${baseUrl}/api/v1/post`, {
                postText: inputText,
                wicketsText: wicketsText,
                oversText: overs,
                team1Text: team1,
                team2Text: team2,
                gender: genderValue,
            }, {
                withCredentials: true
            })
                .then((res) => {
                    console.log("res: ", res.data);
                    setRefresh(!refresh)


                })
        }
    }

    return (
        <div style={{ margin: "1rem" }}>

            <h1> Dashboard Page </h1>


            <Stack spacing={2} direction="column">


                <TextField
                    id="outlined-multiline-static"
                    multiline
                    rows={1}
                    value={team1}
                    onChange={(e) => {
                        setTeam1(e.target.value)
                    }}
                    placeholder="team 1"
                /> <br />
                 <TextField
                    id="outlined-multiline-static"
                    multiline
                    rows={1}
                    value={team2}
                    onChange={(e) => {
                        setTeam2(e.target.value)
                    }}
                    placeholder="team 2"
                /> <br />
                        <FormControl component="fieldset">
                            <FormLabel component="legend" style={{ textAlign: "left" }}>
                                Toss    
                            </FormLabel>
                            <RadioGroup
                                aria-label="gender"
                                defaultValue="Bat"
                                name="genderParent"
                            >
                                <FormControlLabel
                                    name="gender"
                                    value="Bat"
                                    control={<Radio />}
                                    label="Bat"
                                />
                                <FormControlLabel
                                    name="gender"
                                    value="Field"
                                    control={<Radio />}
                                    label="Field"
                                />
                            </RadioGroup>
                        </FormControl>
                <TextField
                    id="outlined-multiline-static"
                    multiline
                    rows={1}
                    value={inputText}
                    onChange={(e) => {
                        setInputText(e.target.value)
                    }}
                    placeholder="Runs of team"
                /> <br />
                <TextField
                    id="outlined-multiline-static"
                    multiline
                    rows={1}
                    value={wicketsText}
                    onChange={(e) => {
                        setWicketsText(e.target.value)
                    }}
                    placeholder="Wickets"
                /> <br />
                <TextField
                    id="outlined-multiline-static"
                    multiline
                    rows={1}
                    value={overs}
                    onChange={(e) => {
                        setOvers(e.target.value)
                    }}
                    placeholder="Overs"
                /> <br />
                <Button variant="contained" onClick={submit}>Post</Button>

            </Stack>

            <br />


            <Post name={posts.name} email={posts.email} team1={posts.team1Text} team2={posts.team2Text} toss={posts.gender} text={posts.postText} wickets={posts.wicketsText} overs={posts.oversText} />


            <br />

            {/* {(isMore) ? <Button onClick={loadMore}>Load More</Button> : null} */}

        </div>
    );
}

export default Dashboard;