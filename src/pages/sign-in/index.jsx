import * as React from 'react';
import { TextField, Button, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import Notification from "../../utils/Notification";
import { Formik, Form, Field, ErrorMessage } from 'formik';
import {signInValidationSchema} from "@utils/validation.js"
const SignIn = () => {
    const navigate = useNavigate();

   
    const handleSubmit = async (values, { resetForm }) => {
        console.log(values);  

        
        if (values.name === 'admin') {
            await Notification({ title: "Success", type: "success" });
            navigate("/admin-layout");
        } else {
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
                                initialValues={{ name: "", password: "" }}
                                onSubmit={handleSubmit}
                                validationSchema={signInValidationSchema}
                            >
                                <Form id='sign-in'>
                                    <Field
                                        name='name'
                                        as={TextField}
                                        type='text'
                                        fullWidth
                                        margin="normal"
                                        variant="outlined"
                                        label="Name"
                                        helperText={<ErrorMessage name='name' component="p" className='text-[red] text-[15px]' />}
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
                                </Form>
                            </Formik>
                        </div>
                        <div className='card-footer'>
                            <Button
                                variant='contained'
                                color="primary"
                                type='submit'
                                form="sign-in"
                            >
                                Save
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SignIn;
