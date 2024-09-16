import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import { FormControl, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import axios from 'axios';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import PropTypes from 'prop-types';
import { studentValidationSchema } from '@utils/validation.js'; 

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

const StudentModal = ({ open, onClose, student, groups, teachers, onUpdate }) => {
  const [initialValues, setInitialValues] = useState({
    name: '',
    age: '',
    phone: '',
    group: '',
    teacher: '',
    address: '',
  });

  useEffect(() => {
    if (student) {
      setInitialValues({
        name: student.name || '',
        age: student.age || '',
        phone: student.phone || '',
        group: student.group || '',
        teacher: student.teacher || '',
        address: student.address || '',
      });
    }
  }, [student]);

  const handleSubmit = (values) => {
    const url = student ? `http://localhost:3000/student/${student.id}` : 'http://localhost:3000/student';
    const method = student ? 'put' : 'post';

    axios({
      method,
      url,
      data: values,
    })
      .then(response => {
        onUpdate(response.data);
        onClose();
      })
      .catch(error => console.error('Error saving student:', error));
  };

  return (
    <Modal open={open} onClose={onClose} aria-labelledby="student-modal-title" aria-describedby="student-modal-description">
      <Box sx={style}>
        <Formik
          initialValues={initialValues}
          validationSchema={studentValidationSchema}
          onSubmit={handleSubmit}
          enableReinitialize
        >
          {({ values, handleChange, handleSubmit }) => (
            <Form className='flex flex-col gap-3'>
              <FormControl fullWidth>
                <TextField
                  fullWidth
                  label="Name"
                  name="name"
                  value={values.name}
                  onChange={handleChange}
                />
                <ErrorMessage name="name" component="div" className='text-[red] text-[15px]' />
              </FormControl>

              <FormControl fullWidth>
                <TextField
                  fullWidth
                  label="Age"
                  name="age"
                  value={values.age}
                  onChange={handleChange}
                />
                <ErrorMessage name="age" component="div"className='text-[red] text-[15px]' />
              </FormControl>

              <FormControl fullWidth>
                <TextField
                  fullWidth
                  label="Phone"
                  name="phone"
                  value={values.phone}
                  onChange={handleChange}
                />
                <ErrorMessage name="phone" component="div" className='text-[red] text-[15px]'/>
              </FormControl>

              <FormControl fullWidth>
                <InputLabel>Group</InputLabel>
                <Select
                  name="group"
                  value={values.group}
                  onChange={handleChange}
                >
                  {groups.map(group => (
                    <MenuItem key={group.id} value={group.name}>{group.name}</MenuItem>
                  ))}
                </Select>
                <ErrorMessage name="group" component="div" className='text-[red] text-[15px]' />
              </FormControl>

              <FormControl fullWidth>
                <InputLabel>Teacher</InputLabel>
                <Select
                  name="teacher"
                  value={values.teacher}
                  onChange={handleChange}
                >
                  {teachers.map(teacher => (
                    <MenuItem key={teacher.id} value={teacher.name}>{teacher.name}</MenuItem>
                  ))}
                </Select>
                <ErrorMessage name="teacher" component="div" className='text-[red] text-[15px]' />
              </FormControl>

              <FormControl fullWidth>
                <TextField
                  fullWidth
                  label="Address"
                  name="address"
                  value={values.address}
                  onChange={handleChange}
                />
                <ErrorMessage name="address" component="div" className='text-[red] text-[15px]' />
              </FormControl>

              <Button variant="contained" color="primary" onClick={handleSubmit}>
                {student ? 'Update' : 'Add'} Student
              </Button>
            </Form>
          )}
        </Formik>
      </Box>
    </Modal>
  );
};

StudentModal.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  student: PropTypes.object,
  groups: PropTypes.array.isRequired,
  teachers: PropTypes.array.isRequired,
  onUpdate: PropTypes.func.isRequired,
};

export default StudentModal;
