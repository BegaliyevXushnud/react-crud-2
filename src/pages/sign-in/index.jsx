import * as React from 'react';
import { TextField, Button, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import Notification from "../../utils/Notification";
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { signInValidationSchema } from '@validation';
import axios from 'axios';

const SignIn = () => {
    const navigate = useNavigate();
    const initialValues = {
        phone_number: "",
        password: "",
    };

    const handleSubmit = async (values, { resetForm }) => {
        console.log(values);  

        try {
            const response = await axios.post('https://texnoark.ilyosbekdev.uz/auth/sign-in', {
                phone_number: values.phone_number,
                password: values.password
            });

            if (response.status === 200 || response.status === 201) {
                const access_token = response?.data?.data?.tokens?.access_token;
                console.log("Access token:", token);
                localStorage.setItem("access_token", access_token)
                await Notification({ title: "Success", type: "success" });
                navigate("/admin-layout");
            } else {
                await Notification({ title: "Xatolik yuz berdi", type: "error" });
            }
        } catch (err) {
            console.log(err.response?.data || err.message);
            await Notification({ title: "Xatolik yuz berdi", type: "error" });
        }
        resetForm();  
    };

    return (
        <div className='container'>
            <ToastContainer />
            <div className='row mt-5'>
                <div className='col-md-6 offset-3'>
                    <div className='card'>
                        <div className='card-header'>
                            <Typography variant="h4">Sign In</Typography>
                            <Typography variant="h6" className='text-gray-500'>Username: admin</Typography>
                            <Typography variant="h6" className='text-gray-500'>Password: yuq</Typography>
                        </div>
                        <div className='card-body'>
                            <Formik
                                initialValues={initialValues}
                                onSubmit={handleSubmit}
                                validationSchema={signInValidationSchema}
                            >
                                {() => (
                                    <Form id='sign-in'>
                                        <Field
                                            name='phone_number'
                                            as={TextField}
                                            type='text'
                                            fullWidth
                                            margin="normal"
                                            variant="outlined"
                                            label="Phone number"
                                            helperText={
                                                <React.Fragment>
                                                    <ErrorMessage name='phone_number' />
                                                </React.Fragment>
                                            }
                                        />
                                        <Field
                                            name='password'
                                            as={TextField}
                                            type='password'
                                            fullWidth
                                            margin="normal"
                                            variant="outlined"
                                            label="Password"
                                            helperText={
                                                <React.Fragment>
                                                    <ErrorMessage name='password' />
                                                </React.Fragment>
                                            }
                                        />
                                        <Button
                                            variant='contained'
                                            color="primary"
                                            type='submit'
                                            style={{ marginTop: '10px' }}
                                        >
                                            Save
                                        </Button>
                                    </Form>
                                )}
                            </Formik>
                        </div>
                        <div className='card-footer'>
                            <Button
                                variant='outlined'
                                color="primary"
                                onClick={() => navigate("/sign-up")}
                                style={{ marginLeft: '10px' }}
                            >
                                Go to Sign Up
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SignIn;
