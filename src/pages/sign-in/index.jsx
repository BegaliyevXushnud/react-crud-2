import * as React from 'react';
import { useState, useEffect } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useNavigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import Notification from "../../utils/Notification";

const SignIn = () => {
    const [form, setForm] = useState({});
    const [count, setCount] = useState(0);
    const [time, setTime] = useState(8);
    const [disabled, setDisabled] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        let timer;
        if (count === 3) {
            timer = setInterval(() => {
                setTime(prev => {
                    if (prev <= 1) {
                        clearInterval(timer);
                        setCount(0); 
                        setTime(5); 
                    }
                    return prev - 1;
                });
            }, 1000);
        }
        return () => clearInterval(timer);
    }, [count]);

    const handleChange = (event) => {
        const { name, value } = event.target;
        setForm({ ...form, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setDisabled(true);

        if (form.username === "admin") {
            await Notification({ title: "Success", type: "success" });
            navigate("/admin-layout");
        } else if (form.username === 'student') {
            await Notification({ title: "Xatolik yuz berdi", type: "error" });
            navigate("/student-layout");
        } else {
            await Notification({ title: "Xatolik yuz berdi", type: "error" });
            setCount(prev => prev + 1);
        }

        setDisabled(false);
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
                            <Typography variant="h6" className='text-gray-500'>password: yuq</Typography>
                        </div>
                        <div className='card-body'>
                            <form onSubmit={handleSubmit} id='mui'>
                                <TextField
                                    disabled={count === 3}
                                    fullWidth
                                    label="Username"
                                    name='username'
                                    onChange={handleChange}
                                />
                                <TextField
                                    disabled={count === 3}
                                    fullWidth
                                    sx={{ marginTop: "10px" }}
                                    label="Password"
                                    type='password'
                                    name='password'
                                    onChange={handleChange}
                                />
                            </form>
                        </div>
                        <div className='card-footer'>
                            <Button
                                variant='contained'
                                color="primary"
                                type='submit'
                                form="mui"
                                disabled={disabled || count === 3}
                            >
                                Save
                            </Button>
                            <p  className='text-center text-red-500 text-lg'>

                                {count === 3 && `Malum muddat kutib turing: ${time} sekund`}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SignIn;
