import axios from 'axios';
import {
  BrowserRouter as Router,
  useHistory,
} from "react-router-dom";

import { useFormik } from "formik";
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import * as yup from 'yup';
import { baseUrl } from "./../../server"
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';


const validationSchema = yup.object({
  email: yup
    .string('Enter your email')
    .email('Enter a valid email')
    .required('Email is required'),
  password: yup
    .string('Enter your password')
    .min(8, 'Password should be of minimum 8 characters length')
    .max(10, 'No more then 10')
    .required('Password is required'),
});

function Login() {
  let history = useHistory();

  const formik = useFormik({
    validationSchema: validationSchema,
    initialValues: {
      email: '',
      password: '',
    },
    onSubmit: (values) => {
      axios
        .post(`${baseUrl}/api/v1/login`, {
          email: values.email,
          password: values.password,
        })
        .then((res) => {
          if (res.data !== "error") {
            console.log(res.data)
            alert('Login Successfully')
            localStorage.setItem('email', values.email)
            history.push("/")
          }


        })

    }
  });



  return (
    <div style={{ margin: "2rem" }}>
      <h1>Login page</h1>

      <form onSubmit={formik.handleSubmit}>

        <Box sx={{ flexGrow: 1 }}>
          <Grid container spacing={5}>
            <Grid item md={2}>

            </Grid>
            <Grid item xs={12} md={8} >
              <TextField
                fullWidth
                color="primary"
                id="outlined-basic"
                label="Email"
                variant="outlined"

                name="email"
                value={formik.values.email}
                onChange={formik.handleChange}

                error={formik.touched.email && Boolean(formik.errors.email)}
                helperText={formik.touched.email && formik.errors.email}
              />
            </Grid>
            <Grid item md={2}>

            </Grid>
            <Grid item md={2}>

            </Grid>
            <Grid item xs={12} md={8} >
              <TextField
                fullWidth
                color="primary"
                id="filled-basic"
                label="Password"
                variant="outlined"
                type="password"

                name="password"
                value={formik.values.password}
                onChange={formik.handleChange}

                error={formik.touched.password && Boolean(formik.errors.password)}
                helperText={formik.touched.password && formik.errors.password}
              />
            </Grid>
            <Grid item xs={12} md={5}>

            </Grid>
            <Grid item xs={12} md={2}>
              <Button fullWidth variant="contained" color="primary" type="submit">Login</Button>
            </Grid>
            <Grid item xs={12} md={5}>

            </Grid>
          </Grid>
        </Box>
      </form>

    </div>
  );
}
export default Login;