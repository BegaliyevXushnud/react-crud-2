import * as React from 'react';
import { TextField, Button, Typography } from '@mui/material';
import { ToastContainer } from 'react-toastify';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { signUpValidationSchema } from '@validation'; // Use the correct path for validation
import Notification from "../../utils/Notification";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const SignUp = () => {
    const navigate = useNavigate();
    const initialValues = {
        first_name: "",
        last_name: "",
        phone_number: "", // Adjusted to match Field name
        email: "",
        password: ""
    };

    const handleSubmit = async (values) => {
        console.log(values);
        try {
            const response = await axios.post('https://texnoark.ilyosbekdev.uz/auth/admin/sign-up', values);
            if (response.status === 201) {
                await Notification({ title: "Success", type: "success" });
                navigate("/");
            }
        } catch (err) {
            console.error(err);
            await Notification({ title: "Xatolik yuz berdi", type: "error" });
        }
    };

    return (
        <div className='container'>
            <ToastContainer />
            <div className='row mt-5'>
                <div className='col-md-6 offset-3'>
                    <div className='card'>
                        <div className='card-header'>
                            <Typography variant="h4">Sign Up</Typography>
                        </div>
                        <div className='card-body'>
                            <Formik
                                initialValues={initialValues}
                                onSubmit={handleSubmit}
                                validationSchema={signUpValidationSchema}
                            >
                                <Form id='sign-up'>
                                    <Field
                                        name='first_name'
                                        as={TextField}
                                        type='text'
                                        fullWidth
                                        margin="normal"
                                        variant="outlined"
                                        label="First Name"
                                        helperText={<ErrorMessage name='first_name' component="p" className='text-[red] text-[15px]' />}
                                    />
                                    <Field
                                        name='last_name'
                                        as={TextField}
                                        type='text'
                                        fullWidth
                                        margin="normal"
                                        variant="outlined"
                                        label="Last Name"
                                        helperText={<ErrorMessage name='last_name' component="p" className='text-[red] text-[15px]' />}
                                    />
                                    <Field
                                        name='phone_number' // Adjusted to match initialValues
                                        as={TextField}
                                        type='text'
                                        fullWidth
                                        margin="normal"
                                        variant="outlined"
                                        label="Phone Number"
                                        helperText={<ErrorMessage name='phone_number' component="p" className='text-[red] text-[15px]' />}
                                    />
                                    <Field
                                        name='email'
                                        as={TextField}
                                        type='email'
                                        fullWidth
                                        margin="normal"
                                        variant="outlined"
                                        label="Email"
                                        helperText={<ErrorMessage name='email' component="p" className='text-[red] text-[15px]' />}
                                    />
                                    <Field
                                        name='password'
                                        as={TextField}
                                        type='password'
                                        fullWidth
                                        margin="normal"
                                        variant="outlined"
                                        label="Password"
                                        helperText={<ErrorMessage name='password' component="p" className='text-[red] text-[15px]' />}
                                    />
                                    <Button
                                        variant='contained'
                                        color="primary"
                                        type='submit'
                                        fullWidth
                                        className="mt-3"
                                    >
                                        Sign Up
                                    </Button>
                                </Form>
                            </Formik>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SignUp;
