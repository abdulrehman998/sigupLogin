import { useState, useEffect, useRef } from "react"
import axios from 'axios';
import {
    BrowserRouter as Router,
    useHistory,
} from "react-router-dom";

import { Formik, Field, Form, useFormik } from "formik";
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import * as yup from 'yup';
import { baseUrl } from "../../server";



const validationSchema = yup.object({
    name: yup
        .string('Enter your name')
        .required('Name is required'),
    email: yup
        .string('Enter your email')
        .email('Enter a valid email')
        .required('Email is required'),
    password: yup
        .string('Enter your password')
        .min(8, 'Password should be of minimum 8 characters length')
        .max(10, 'No more then 10')
        .required('Password is required'),
    address: yup
        .string('Enter your Address')
        .required('Address is required'),
    phoneNumber: yup
        .string("Enter your phone number")
        .min(10, "Phone number should be 10 integers long")
        .required("Phone number is required"),
});

function Signup() {

    let history = useHistory();

    const formik = useFormik({
        initialValues: {
            name: "",
            email: "",
            phoneNumber: "",
            password: "",
            address: "",
        },
        validationSchema: validationSchema,
        onSubmit: (values) => {
            const genderValue = document.querySelector(
                'input[name="gender"]:checked'
            ).value;
            axios
                .post(`${baseUrl}/api/v1/signup`, {
                    name: values.name,
                    email: values.email,
                    gender: genderValue,
                    phoneNumber: Number(values.phoneNumber),
                    password: values.password,
                    address: values.address,
                })
                .then((result) => {
                    alert('SIGNUP SUCCESSFULLY');
                    history.push('/login');
                })
                .catch((err) => {
                    // console.log(err);
                });
        },
    });

    return (
        <div style={{ margin: "2rem" }}>
            <h1>Signup page</h1>

            <form onSubmit={formik.handleSubmit}>
                <Stack spacing={2}>

                    <TextField
                        fullWidth
                        color="primary"
                        id="outlined-basic"
                        label="Full Name"
                        variant="outlined"

                        name="name"
                        value={formik.values.name}
                        onChange={formik.handleChange}

                        error={formik.touched.name && Boolean(formik.errors.name)}
                        helperText={formik.touched.name && formik.errors.name}
                    />

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

                    <TextField
                        fullWidth
                        color="primary"
                        id="filled-basic"
                        label="Address"
                        variant="outlined"
                        type="address"

                        name="address"
                        value={formik.values.address}
                        onChange={formik.handleChange}

                        error={formik.touched.address && Boolean(formik.errors.address)}
                        helperText={formik.touched.address && formik.errors.address}
                    />
                    <TextField
                        fullWidth
                        name="phoneNumber"
                        label="Phone Number"
                        variant="outlined"
                        placeholder="Enter Phone Number"
                        value={formik.values.phoneNumber}
                        onChange={formik.handleChange}
                        error={
                            formik.touched.phoneNumber && Boolean(formik.errors.phoneNumber)
                        }
                        helperText={
                            formik.touched.phoneNumber && formik.errors.phoneNumber
                        }
                    />
                    <FormControl component="fieldset">
                        <FormLabel component="legend" style={{ textAlign: "left" }}>
                            Gender
                        </FormLabel>
                        <RadioGroup
                            aria-label="gender"
                            defaultValue="male"
                            name="genderParent"
                        >
                            <FormControlLabel
                                name="gender"
                                value="male"
                                control={<Radio />}
                                label="Male"
                            />
                            <FormControlLabel
                                name="gender"
                                value="female"
                                control={<Radio />}
                                label="Female"
                            />
                        </RadioGroup>
                    </FormControl>

                    <Button fullWidth variant="contained" color="primary" type="submit">Signup</Button>
                </Stack>

            </form>

        </div>
    );
}
export default Signup;