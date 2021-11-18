import axios from 'axios';
import { useState, useEffect } from "react"
import { baseUrl } from "./../../server"
import Post from "../profile/post"
import io from 'socket.io-client';
import img from "./../../img/cric.jpg"
import { grey } from '@mui/material/colors';



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


    return (
        <>
            <div style={{backgroundColor: "#F0F2F5", width: "100%", height: "90vh"}}>
                <div style={{ margin: "1rem" }}>

                    <br />

                    <Post name={posts.name} email={posts.email} team1={posts.team1Text} team2={posts.team2Text} toss={posts.gender} text={posts.postText} wickets={posts.wicketsText} overs={posts.oversText} bat={posts.batText}
                     bowl={posts.bowlText} batter1={posts.batter1Text} batter2={posts.batter2Text} bowler={posts.bowlerText}
                    batter1runs={posts.batter1runsText} batter1balls={posts.batter1ballsText} batter2runs={posts.batter2runsText} batter2balls={posts.batter2ballsText} 
                    bowlerwickets={posts.bowlerwicketsText}  bowlerruns={posts.bowlerrunsText} target={posts.targetText} />

                    <br />

                    {/* {(isMore) ? <Button onClick={loadMore}>Load More</Button> : null} */}

                </div>
            </div>
        </>
    );
}

export default Scoreboard;


