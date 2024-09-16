
import * as React from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import { FormControl, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { groupValidationSchema } from '@utils/validation.js';



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

export default function GroupModal({ open, handleClose, editingGroup }) {
  const [form, setForm] = useState({
    course: '',
    name: ''
  });
  const [courseList, setCourseList] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3000/course')
      .then(res => setCourseList(res.data))
      .catch(err => console.log(err));

    if (editingGroup) {
      setForm(editingGroup); 
    } else {
      setForm({ course: '', name: '' });
    }
  }, [editingGroup]);

  const handleSubmit = async (values) => {
    try {
      if (editingGroup) {
        await axios.put(`http://localhost:3000/group/${editingGroup.id}`, values); 
      } else {
        await axios.post('http://localhost:3000/group', values); 
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
          enableReinitialize={true} // form qiymatlarini yangilab turish
          validationSchema={groupValidationSchema}
          onSubmit={handleSubmit}
        >
          {({ values, handleChange }) => (
            <Form>
              <FormControl fullWidth className='flex flex-col gap-3'>
                <InputLabel id="course-label">Course</InputLabel>
                <Select
                  labelId="course-label"
                  id="course-select"
                  name="course"
                  value={values.course}
                  onChange={handleChange}
                  label="Course"
                >
                  {courseList.map(course => (
                    <MenuItem key={course.id} value={course.course}>
                      {course.course}
                    </MenuItem>
                  ))}
                </Select>
                <ErrorMessage name="course" component="p" className="text-[red] text-[15px]" />

                <TextField
                  fullWidth
                  label="Group Name"
                  name="name"
                  value={values.name || ""}
                  onChange={handleChange}
                />
                <ErrorMessage name="name" component="p" className="text-[red] text-[15px]" />

                <Button type="submit" variant="contained" color="primary">
                  Save
                </Button>
              </FormControl>
            </Form>
          )}
        </Formik>
      </Box>
    </Modal>
  );
}
