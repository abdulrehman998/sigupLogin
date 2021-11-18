import axios from 'axios';
import { useState, useEffect } from "react"
import { baseUrl } from "./../../server"
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';



function Dashboard() {
    const [inputText, setInputText] = useState("");
    const [wicketsText, setWicketsText] = useState("");
    const [overs, setOvers] = useState("");
    const [team1, setTeam1] = useState("");
    const [team2, setTeam2] = useState("");
    const [bat, setBat] = useState("");
    const [bowl, setBowl] = useState("");
    const [batter1, setBatter1] = useState("");
    const [batter2, setBatter2] = useState("");
    const [bowler, setBowler] = useState("");
    const [refresh, setRefresh] = useState(false)



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
        <>
            <div style={{ margin: "1rem" }}>

                <h1> Admin Control </h1>

                <Box sx={{ flexGrow: 1 }}>
                    <Grid container spacing={3}>
                        <Grid item md={1}>

                        </Grid>
                        <Grid item xs={12} md={4} >

                            <TextField
                                fullWidth
                                color="primary"
                                id="outlined-basic"
                                label="Team A"
                                variant="standard"
                                value={team1}
                                onChange={(e) => {
                                    setTeam1(e.target.value)
                                }}
                            />
                        </Grid>
                        <Grid item md={1}>

                        </Grid>
                        <Grid item md={1}>

                        </Grid>
                        <Grid item xs={12} md={4} >
                            <TextField
                                fullWidth
                                color="primary"
                                id="outlined-basic"
                                label="Team B"
                                variant="standard"
                                value={team2}
                                onChange={(e) => {
                                    setTeam2(e.target.value)
                                }}
                                
                            />
                        </Grid>
                        <Grid item md={1}>

                        </Grid>

                        <Grid item md={1}>

                        </Grid>
                        <Grid item xs={12} md={4} >
                            <TextField
                                fullWidth
                                color="primary"
                                id="outlined-basic"
                                label="Runs"
                                variant="standard"
                                value={inputText}
                                onChange={(e) => {
                                    setInputText(e.target.value)
                                }}
                                
                            />
                        </Grid>
                        <Grid item md={1}>

                        </Grid>
                        <Grid item md={1}>

                        </Grid>
                        <Grid item xs={12} md={4} >
                            <TextField
                                fullWidth
                                color="primary"
                                id="outlined-basic"
                                label="Wickets"
                                variant="standard"
                                value={wicketsText}
                                onChange={(e) => {
                                    setWicketsText(e.target.value)
                                }}
                                
                            />
                        </Grid>
                        <Grid item md={1}>

                        </Grid>
                        <Grid item md={1}>

                        </Grid>
                        <Grid item xs={12} md={4} >
                            <TextField
                                fullWidth
                                color="primary"
                                id="outlined-basic"
                                label="Overs"
                                variant="standard"
                                value={overs}
                                onChange={(e) => {
                                    setOvers(e.target.value)
                                }}
                                
                            />
                        </Grid>
                        <Grid item md={1}>

                        </Grid>
                        <Grid item md={1}>

                        </Grid>
                        <Grid item xs={12} md={4} >
                            <TextField
                                fullWidth
                                color="primary"
                                id="outlined-basic"
                                label="Batting Team"
                                variant="standard"
                                value={bat}
                                onChange={(e) => {
                                    setBat(e.target.value)
                                }}
                                
                            />
                        </Grid>
                        <Grid item md={1}>

                        </Grid>
                        <Grid item md={1}>

                        </Grid>
                        <Grid item xs={12} md={4} >
                            <TextField
                                fullWidth
                                color="primary"
                                id="outlined-basic"
                                label="Bowling Team"
                                variant="standard"
                                value={bowl}
                                onChange={(e) => {
                                    setBowl(e.target.value)
                                }}
                                
                            />
                        </Grid>
                        <Grid item md={1}>

                        </Grid>
                        <Grid item md={1}>

                        </Grid>
                        <Grid item xs={12} md={4} >
                            <TextField
                                fullWidth
                                color="primary"
                                id="outlined-basic"
                                label="Bowler"
                                variant="standard"
                                value={bowler}
                                onChange={(e) => {
                                    setBowler(e.target.value)
                                }}
                                
                            />
                        </Grid>
                        <Grid item md={1}>

                        </Grid>
                        <Grid item md={1}>

                        </Grid>
                        <Grid item xs={12} md={4} >
                            <TextField
                                fullWidth
                                color="primary"
                                id="outlined-basic"
                                label="Batter 1"
                                variant="standard"
                                value={batter1}
                                onChange={(e) => {
                                    setBatter1(e.target.value)
                                }}
                                
                            />
                        </Grid>
                        <Grid item md={1}>

                        </Grid>
                        <Grid item md={1}>

                        </Grid>
                        <Grid item xs={12} md={4} >
                            <TextField
                                fullWidth
                                color="primary"
                                id="outlined-basic"
                                label="Batter 2"
                                variant="standard"
                                value={batter2}
                                onChange={(e) => {
                                    setBatter2(e.target.value)
                                }}
                                
                            />
                        </Grid>
                        <Grid item md={1}>

                        </Grid>

                        <Grid item md={3}>

                        </Grid>
                        <Grid item xs={12} md={6} >
                            <FormControl component="fieldset">
                                <FormLabel component="legend" >
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
                        </Grid>
                        <Grid item md={3}>

                        </Grid>
                        <Grid item md={3}>

                        </Grid>
                        <Grid item xs={12} md={6} >
                            <Button fullWidth variant="contained" onClick={submit}>Post</Button>
                        </Grid>
                        <Grid item md={3}>

                        </Grid>

                    </Grid>
                </Box>



                {/* {(isMore) ? <Button onClick={loadMore}>Load More</Button> : null} */}

            </div>

        </>
    );
}

export default Dashboard;