import * as React from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import { FormControl, TextField } from '@mui/material';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { CourseValidationSchema } from "@utils/validation.js";
import { Formik, Form, Field, ErrorMessage } from 'formik';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export default function CourseModal({ open, handleClose, editingCourse }) {
  const [form, setForm] = useState({
    course: '',
    duration: '',
    price: ''
  });

  useEffect(() => {
    if (editingCourse) {
      setForm(editingCourse);
    } else {
      setForm({ course: '', duration: '', price: '' });
    }
  }, [editingCourse]);

  const handleSubmit = async (values) => {
    try {
      if (editingCourse) {
        await axios.put(`http://localhost:3000/course/${editingCourse.id}`, values);
      } else {
        await axios.post('http://localhost:3000/course', values);
      }
      handleClose();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Modal
      keepMounted
      open={open}
      onClose={handleClose}
      aria-labelledby="keep-mounted-modal-title"
      aria-describedby="keep-mounted-modal-description"
    >
      <Box sx={style}>
        <Formik
          initialValues={form}
          enableReinitialize={true} 
          validationSchema={CourseValidationSchema}
          onSubmit={handleSubmit}
        >
          {({ values, handleChange, handleSubmit }) => (
            <Form className='flex flex-col gap-3'>
              <FormControl fullWidth>
                <Field
                  as={TextField}
                  fullWidth
                  label="Course Name"
                  id="course"
                  name="course"
                  value={values.course}
                  onChange={handleChange}
                  helperText={<ErrorMessage name='course' component="p" className='text-[red] text-[15px]' />}
                />
              </FormControl>

              <FormControl fullWidth>
                <Field
                  as={TextField}
                  fullWidth
                  label="Duration (in weeks)"
                  id="duration"
                  name="duration"
                  value={values.duration}
                  onChange={handleChange}
                  helperText={<ErrorMessage name='duration' component="p" className='text-[red] text-[15px]' />}
                />
              </FormControl>

              <FormControl fullWidth>
                <Field
                  as={TextField}
                  fullWidth
                  label="Price (in USD)"
                  id="price"
                  name="price"
                  type="number"
                  value={values.price}
                  onChange={handleChange}
                  helperText={<ErrorMessage name='price' component="p" className='text-[red] text-[15px]' />}
                />
              </FormControl>

              <Button variant="contained" color="primary" type="submit">
                Save
              </Button>
            </Form>
          )}
        </Formik>
      </Box>
    </Modal>
  );
}
