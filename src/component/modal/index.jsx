import * as React from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import { FormControl, InputLabel, MenuItem, Select, TextField } from '@mui/material';
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

export default function KeepMountedModal({ open: openProp, handleClose, course, editingTeacher }) {
  const [form, setForm] = useState({
    course: '',
    name: ''
  });

  useEffect(() => {
    if (editingTeacher) {
      setForm(editingTeacher); 
    } else {
      setForm({ course: '', name: '' });
    }
  }, [editingTeacher]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async () => {
    try {
      if (editingTeacher) {
        await axios.put(`http://localhost:3000/teacher/${editingTeacher.id}`, form);
      } else {
        await axios.post('http://localhost:3000/teacher', form);
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
        open={openProp}
        onClose={handleClose}
        aria-labelledby="keep-mounted-modal-title"
        aria-describedby="keep-mounted-modal-description"
      >
        <Box sx={style}>
          <FormControl fullWidth className='flex flex-col gap-3'>
            <InputLabel id="demo-simple-select-label">Course</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              name="course"
              value={form.course}
              label="Course Name"
              onChange={handleChange}
              sx={{ width: '100%' }}
            >
              {course.map((item) => (
                <MenuItem value={item.course} key={item.id}>
                  {item.course}
                </MenuItem>
              ))}
            </Select>

            <TextField
              fullWidth
              label="Teacher Name"
              id="fullWidth"
              name="name"
              value={form.name || ""}
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
