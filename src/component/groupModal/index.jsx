
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

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async () => {
    try {
      if (editingGroup) {
        await axios.put(`http://localhost:3000/group/${editingGroup.id}`, form); 
      } else {
        await axios.post('http://localhost:3000/group', form); 
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
            <InputLabel id="course-label">Course</InputLabel>
            <Select
              labelId="course-label"
              id="course-select"
              name="course"
              value={form.course}
              onChange={handleChange}
              label="Course"
            >
              {courseList.map(course => (
                <MenuItem key={course.id} value={course.course}>
                  {course.course}
                </MenuItem>
              ))}
            </Select>

            <TextField
              fullWidth
              label="Group Name"
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
