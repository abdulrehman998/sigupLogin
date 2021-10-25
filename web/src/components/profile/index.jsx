import * as React from 'react';
import axios from 'axios';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import { Formik, Field, Form, useFormik } from "formik";
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { baseUrl } from "../../server"



function onSubmitFunction(values) {
    console.log("values: ", values)
    axios.post(`${baseUrl}/api/v1/create`,{
        title: values.title,
        description: values.description
    })
        .then((response) => {
            console.log(response.data);
            const title = values.title;
            localStorage.setItem('title', title)

        }).catch((error) => {
            console.log(error);
        })
  }

  


  
function Dashboard() {


    const formik = useFormik({
        initialValues: {
          title: '',
          description: '',
        },
        onSubmit: onSubmitFunction
      });

        const [todo, settodo] = React.useState([])
        
        React.useEffect(() => {
    
            const Title = localStorage.getItem('title')
            console.log(Title);
            axios.get(`${baseUrl}/api/v1/posts`,{
                title: Title
            })
            .then((res) => {
                let data = res.data
                settodo(data);
                console.log(todo);
            })
            .catch((err) => {
                console.log(err.message);
            })
    
            return () => {
                console.log("cleanup")
            };
        }, []);




    const [Data, setData] = React.useState([]);
    React.useEffect(() => {
        const Email = localStorage.getItem('email')
        console.log(Email);
        axios.post(`${baseUrl}/api/v1/profile`, {
            email: Email
        })
            .then((res) => {
                let data = res.data
                setData(data);
                console.log(Data);
            })
            .catch((err) => {
                console.log(err.message);
            })
        return () => {
            console.log('clean up')
        }
    }, [])
    return (
        <div className="dashboard">
            <div>
                <h1>Dashboard</h1>
                {
                    Data.map(eachData => {
                        return (
                            <div style={{ margin: "2rem" }}>
                                <Card sx={{ minWidth: 275 }}>
                                    <CardContent>
                                        <Typography variant="h4" component="div">
                                            {eachData.name}
                                        </Typography>
                                        <Typography variant="h6" component="div">
                                            {eachData.email}
                                        </Typography>
                                        <Typography variant="h6" component="div">
                                            {eachData.address}
                                        </Typography>
                                        <Typography variant="h6" component="div">
                                            {eachData.phoneNumber}
                                        </Typography>
                                        <Typography variant="h6" component="div">
                                            {eachData.gender}
                                        </Typography>
                                    </CardContent>
                                </Card>
                            </div>
                        )
                    })
                }
            </div>
            <form onSubmit={formik.handleSubmit}>
                <Stack spacing={2}>
                    <TextField
                        fullWidth
                        color="primary"
                        id="outlined-basic"
                        label="Title"
                        variant="outlined"

                        name="title"
                        value={formik.values.title}
                        onChange={formik.handleChange}

                        error={formik.touched.title && Boolean(formik.errors.title)}
                        helperText={formik.touched.title && formik.errors.title}
                    />

                    <TextField
                        fullWidth
                        color="primary"
                        id="outlined-basic"
                        label="Description"
                        variant="outlined"

                        name="description"
                        value={formik.values.description}
                        onChange={formik.handleChange}

                        error={formik.touched.description && Boolean(formik.errors.description)}
                        helperText={formik.touched.description && formik.errors.description}
                    />
                    <Button fullWidth variant="contained" color="primary" type="submit">Insert Button</Button>
                </Stack>

            </form>

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

        </div>
    );
}

export default Dashboard;