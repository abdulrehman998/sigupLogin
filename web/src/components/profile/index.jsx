import axios from 'axios';
import { useState, useEffect, useRef } from "react"
import { baseUrl } from "./../../server"
import { GlobalContext } from './../../context/Context';
import { useContext } from "react";
import * as React from 'react';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import { Formik, Field, Form, useFormik } from "formik";
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import {
    BrowserRouter as Router,
    useHistory,
} from "react-router-dom";



function onSubmitFunction(values) {
    console.log("values: ", values)
    axios.post(`${baseUrl}/api/v1/create`, {
        title: values.title,
        description: values.description
    }, {
        withCredentials: true
    })
        .then((response) => {
            console.log(response.data);
            const title = values.title;
            localStorage.setItem('title', title)
        }).catch((error) => {
            console.log(error);
        })
}


function Home() {

    let { state, dispatch } = useContext(GlobalContext);

    const [profile, setProfile] = useState({})

    useEffect(() => {

        axios.get(`${baseUrl}/api/v1/profile`, {
            withCredentials: true
        })
            .then((res) => {
                console.log("res +++: ", res.data);
                setProfile(res.data)

            })
    }, [])



    const formik = useFormik({
        initialValues: {
            title: '',
            description: '',
        },
        onSubmit: onSubmitFunction
    });

    const [todo, settodo] = useState([])

    useEffect(() => {

        const Title = localStorage.getItem('title')
        axios.get(`${baseUrl}/api/v1/posts`, {
            title: Title
        })
            .then((res) => {
                let data = res.data
                settodo(data);
            })
            .catch((err) => {
                console.log(err.response);
            })

        return;
    }, [todo]);

    return (
        <>
            <div style={{ margin: "2rem" }}>
                <Box sx={{ flexGrow: 1 }}>
                    <Grid container spacing={5}>
                        <Grid item md={4}>

                        </Grid>
                        <Grid item xs={12} md={4} >
                            <Card style={{ padding: "1rem"}} sx={{ minWidth: 275 }}>
                                <CardContent>
                                    <Typography variant="h4" component="div">
                                        {profile.name}
                                    </Typography>
                                    <Typography variant="h6" component="div">
                                        {profile.email}
                                    </Typography>
                                    <Typography variant="h6" component="div">
                                        {profile.address}
                                    </Typography>
                                    <Typography variant="h6" component="div">
                                        {profile.phoneNumber}
                                    </Typography>
                                    <Typography variant="h6" component="div">
                                        {profile.gender}
                                    </Typography>
                                </CardContent>
                                <Button variant="contained" color="error" onClick={() => {
                                    axios.post(`${baseUrl}/api/v1/logout`, {}, {
                                        withCredentials: true
                                    })
                                        .then((res) => {
                                            console.log("res +++: ", res.data);

                                            dispatch({
                                                type: "USER_LOGOUT"
                                            })
                                        })
                                }} >Logout</Button>
                            </Card>
                        </Grid>
                        <Grid item md={4}>

                        </Grid>
                    </Grid>
                </Box>
            </div>





            <div>
                <form onSubmit={formik.handleSubmit}>
                    <Box sx={{ flexGrow: 1 }}>
                        <Grid container spacing={5}>
                            <Grid item xs={2} md={2}>

                            </Grid>
                            <Grid item xs={8} md={8} >

                                <TextField
                                    fullWidth
                                    color="primary"
                                    id="outlined-basic"
                                    label="Title"
                                    variant="standard"

                                    name="title"
                                    value={formik.values.title}
                                    onChange={formik.handleChange}

                                    error={formik.touched.title && Boolean(formik.errors.title)}
                                    helperText={formik.touched.title && formik.errors.title}
                                />

                            </Grid>
                            <Grid item xs={2} md={2}>

                            </Grid>
                            <Grid item xs={2} md={2}>

                            </Grid>
                            <Grid item xs={8} md={8} >


                                <TextField
                                    fullWidth
                                    color="primary"
                                    id="outlined-basic"
                                    label="Description"
                                    variant="standard"

                                    name="description"
                                    value={formik.values.description}
                                    onChange={formik.handleChange}

                                    error={formik.touched.description && Boolean(formik.errors.description)}
                                    helperText={formik.touched.description && formik.errors.description}
                                />

                            </Grid>
                            <Grid item xs={2} md={2}>

                            </Grid>
                            <Grid item xs={2} md={2}>

                            </Grid>
                            <Grid item xs={8} md={8}>
                                <Button fullWidth variant="contained" color="primary" type="submit">Insert Button</Button>
                            </Grid>
                            <Grid item xs={2} md={2}>

                            </Grid>
                        </Grid>
                    </Box>
                </form >

                {
                    todo.map(eachData => {
                        return (
                            <div style={{ margin: "2rem" }}>
                                <Card sx={{ minWidth: 275 }}>
                                    <CardContent>
                                        <Typography variant="h4" component="div">
                                            {eachData.title}
                                        </Typography>
                                        <Typography variant="h6" component="div">
                                            {eachData.description}
                                        </Typography>
                                    </CardContent>
                                </Card>
                            </div>
                        )
                    })
                }

            </div >
        </>
    );
}

export default Home;