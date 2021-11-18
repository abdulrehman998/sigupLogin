import axios from 'axios';
import { useState, useEffect } from "react"
import { baseUrl } from "./../../server"
import Post from "../profile/post"
import io from 'socket.io-client';



function Scoreboard() {
    const [posts, setPosts] = useState([])

    useEffect(() => {
        axios.get(`${baseUrl}/api/v1/posts?page=0`, {
            withCredentials: true
        })
            .then((res) => {
                console.log("res +++: ", res.data[0]);
                let data = res.data[0];
                setPosts(data);
            })
    }, [])

    useEffect(() => {
        const socket = io("http://localhost:5001");

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



    return (
        <div style={{ margin: "1rem" }}>

            <br />


            <Post name={posts.name} email={posts.email} team1={posts.team1Text} team2={posts.team2Text} toss={posts.gender} text={posts.postText} wickets={posts.wicketsText} overs={posts.oversText} />

            <br />

            {/* {(isMore) ? <Button onClick={loadMore}>Load More</Button> : null} */}

        </div>
    );
}

export default Scoreboard;