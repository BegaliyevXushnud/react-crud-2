import * as React from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import { FormControl, TextField } from '@mui/material';
import { useState, useEffect } from 'react';
import axios from 'axios';

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
      setForm(editingCourse); // Tahrirlanayotgan kursni modalga yuklash
    } else {
      setForm({ course: '', duration: '', price: '' });
    }
  }, [editingCourse]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async () => {
    try {
      if (editingCourse) {
        await axios.put(`http://localhost:3000/course/${editingCourse.id}`, form);
      } else {
        await axios.post('http://localhost:3000/course', form);
      }
      handleClose();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <Modal
        keepMounted
        open={open}
        onClose={handleClose}
        aria-labelledby="keep-mounted-modal-title"
        aria-describedby="keep-mounted-modal-description"
      >
        <Box sx={style}>
          <FormControl fullWidth className='flex flex-col gap-3'>
            <TextField
              fullWidth
              label="Course Name"
              id="course"
              name="course"
              value={form.course || ""}
              onChange={handleChange}
            />
            <TextField
              fullWidth
              label="Duration (in weeks)"
              id="duration"
              name="duration"
              value={form.duration || ""}
              onChange={handleChange}
            />
            <TextField
              fullWidth
              label="Price (in USD)"
              id="price"
              name="price"
              type="number"
              value={form.price || ""}
              onChange={handleChange}
            />
            <Button variant="contained" color="primary" onClick={handleSubmit}>
              Save
            </Button>
          </FormControl>
        </Box>
      </Modal>
    </div>
  );
}
