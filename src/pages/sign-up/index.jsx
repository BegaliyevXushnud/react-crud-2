import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { Formik, Field, Form, ErrorMessage } from "formik";
import { useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { signUpValidationSchema } from "../../utils/validation";
import axios from "axios";
import FormHelperText from "@mui/material/FormHelperText";
import InputLabel from "@mui/material/InputLabel";

const Index = () => {
  const navigate = useNavigate();

  const initialValues = {
    first_name: "",
    last_name: "",
    phone_number: "",
    email: "",
    password: "",
  };

  const handleSubmit = async (values) => {
    try {
      const response = await axios.post("https://texnoark.ilyosbekdev.uz/auth/admin/sign-up", values);
      if (response.status === 201) {
        navigate("/");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="container">
      <ToastContainer />
      <div className="row mt-5">
        <div className="col-md-6 offset-3">
          <div className="card">
            <div className="card-header">
              <h1 className="text-center">Sign-Up</h1>
            </div>
            <div className="card-body">
              <Formik
                initialValues={initialValues}
                onSubmit={handleSubmit}
                validationSchema={signUpValidationSchema}
              >
                <Form id="form">
                  <Field
                    name="first_name"
                    as={TextField}
                    fullWidth
                    label={<span style={{ color: "black" }}>First Name</span>} 
                    placeholder="Enter your first name" 
                    type="text"
                    error={Boolean(<ErrorMessage name="first_name" />)}
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        "&.Mui-error .MuiOutlinedInput-notchedOutline": {
                          borderColor: "black",
                        },
                      },
                      mb: 2, 
                      "& .MuiInputBase-input": {
                        color: "black",
                      },
                    }}
                  />
                  <ErrorMessage name="first_name" component={FormHelperText} sx={{ color: "red" }} />

                  <Field
                    name="last_name"
                    as={TextField}
                    fullWidth
                    label={<span style={{ color: "black" }}>Last Name</span>} 
                    placeholder="Enter your last name" 
                    type="text"
                    error={Boolean(<ErrorMessage name="last_name" />)}
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        "&.Mui-error .MuiOutlinedInput-notchedOutline": {
                          borderColor: "black",
                        },
                      },
                      mb: 2, 
                      "& .MuiInputBase-input": {
                        color: "black", 
                      },
                    }}
                  />
                  <ErrorMessage name="last_name" component={FormHelperText} sx={{ color: "red" }} />

                  <Field
                    name="phone_number"
                    as={TextField}
                    fullWidth
                    label={<span style={{ color: "black" }}>Phone Number</span>} 
                    placeholder="Enter your phone number"
                    type="text"
                    error={Boolean(<ErrorMessage name="phone_number" />)}
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        "&.Mui-error .MuiOutlinedInput-notchedOutline": {
                          borderColor: "black",
                        },
                      },
                      mb: 2, 
                      "& .MuiInputBase-input": {
                        color: "black", 
                      },
                    }}
                  />
                  <ErrorMessage name="phone_number" component={FormHelperText} sx={{ color: "red" }} />

                  <Field
                    name="email"
                    as={TextField}
                    fullWidth
                    label={<span style={{ color: "black" }}>Email</span>} 
                    placeholder="Enter your email" 
                    type="email"
                    error={Boolean(<ErrorMessage name="email" />)}
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        "&.Mui-error .MuiOutlinedInput-notchedOutline": {
                          borderColor: "black",
                        },
                      },
                      mb: 2, 
                      "& .MuiInputBase-input": {
                        color: "black", 
                      },
                    }}
                  />
                  <ErrorMessage name="email" component={FormHelperText} sx={{ color: "red" }} />

                  <Field
                    name="password"
                    as={TextField}
                    fullWidth
                    label={<span style={{ color: "black" }}>Password</span>} 
                    placeholder="Enter your password" 
                    type="password"
                    error={Boolean(<ErrorMessage name="password" />)}
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        "&.Mui-error .MuiOutlinedInput-notchedOutline": {
                          borderColor: "black",
                        },
                      },
                      mb: 2, 
                      "& .MuiInputBase-input": {
                        color: "black", 
                      },
                    }}
                  />
                  <ErrorMessage name="password" component={FormHelperText} sx={{ color: "red" }} />

                  <Button form="form" type="submit" variant="contained" className="mt-3">
                    Save
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

export default Index;
