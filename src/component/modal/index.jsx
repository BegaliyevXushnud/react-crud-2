import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import { FormControl, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import { useFormik } from 'formik';
import axios from 'axios';
import { teacherValidationSchema } from '@utils/validation.js'; // Validation sxemasi

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

export default function TeacherModal({ open, handleClose, editingTeacher }) {
  const [courses, setCourses] = useState([]); // Kurslar uchun state

  // Kurslarni API dan olish
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await axios.get('http://localhost:3000/course');
        console.log(response.data); // Kurslar ro'yxatini konsolga chiqaramiz
        setCourses(response.data);
      } catch (error) {
        console.error('Error fetching courses:', error);
      }
    };
  
    fetchCourses();
  }, []);
  

  const formik = useFormik({
    initialValues: {
      course: editingTeacher ? editingTeacher.course : '',
      name: editingTeacher ? editingTeacher.name : '',
    },
    validationSchema: teacherValidationSchema, // Yup validatsiya sxemasi
    onSubmit: async (values) => {
      try {
        if (editingTeacher) {
          await axios.put(`http://localhost:3000/teacher/${editingTeacher.id}`, values);
        } else {
          await axios.post('http://localhost:3000/teacher', values);
        }
        handleClose();
      } catch (error) {
        console.error('Error saving teacher:', error);
      }
    },
    enableReinitialize: true,
  });

  return (
    <Modal open={open} onClose={handleClose} aria-labelledby="modal-title" aria-describedby="modal-description">
      <Box sx={style}>
        <form onSubmit={formik.handleSubmit}>
          <FormControl fullWidth className='flex flex-col gap-3'>
            {/* InputLabel komponentining "htmlFor" atributi Select bilan bog'lanadi */}
            <InputLabel id="course-label">Course</InputLabel>

            {/* Select komponentida "labelId" bilan InputLabel ga bog'lanamiz */}
            <Select
  labelId="course-label"
  id="course-select"
  name="course"
  value={formik.values.course}
  onChange={formik.handleChange}
  error={formik.touched.course && Boolean(formik.errors.course)}
>
  {courses.length > 0 ? (
    courses.map((course) => (
      <MenuItem key={course.id} value={course.course}>
        {course.course}
      </MenuItem>
    ))
  ) : (
    <MenuItem disabled>No courses available</MenuItem>
  )}
</Select>


            {formik.touched.course && formik.errors.course ? (
              <div style={{ color: 'red' }}>{formik.errors.course}</div>
            ) : null}

            <TextField
              fullWidth
              label="Teacher Name"
              name="name"
              value={formik.values.name}
              onChange={formik.handleChange}
              error={formik.touched.name && Boolean(formik.errors.name)}
              helperText={formik.touched.name && formik.errors.name}
            />

            <Button type="submit" variant="contained" color="primary">
              {editingTeacher ? 'Update' : 'Add'} Teacher
            </Button>
          </FormControl>
        </form>
      </Box>
    </Modal>
  );
}
