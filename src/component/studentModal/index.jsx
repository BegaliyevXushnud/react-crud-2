import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import { FormControl, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import axios from 'axios';
import PropTypes from 'prop-types';

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
  const [form, setForm] = useState({
    name: '',
    age: '',
    phone: '',
    group: '',
    teacher: '',
    address: '',
  });

  useEffect(() => {
    if (student) {
      setForm({
        name: student.name || '',
        age: student.age || '',
        phone: student.phone || '',
        group: student.group || '',
        teacher: student.teacher || '',
        address: student.address || '',
      });
    }
  }, [student]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = () => {
    const url = student ? `http://localhost:3000/student/${student.id}` : 'http://localhost:3000/student';
    const method = student ? 'put' : 'post';

    axios({
      method,
      url,
      data: form,
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
        <FormControl fullWidth className='flex flex-col gap-3'>
          <TextField
            fullWidth
            label="Name"
            name="name"
            value={form.name}
            onChange={handleChange}
          />
          <TextField
            fullWidth
            label="Age"
            name="age"
            value={form.age}
            onChange={handleChange}
          />
          <TextField
            fullWidth
            label="Phone"
            name="phone"
            value={form.phone}
            onChange={handleChange}
          />
          <FormControl fullWidth>
            <InputLabel>Group</InputLabel>
            <Select
              name="group"
              value={form.group}
              onChange={handleChange}
            >
              {groups.map(group => (
                <MenuItem key={group.id} value={group.name}>{group.name}</MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl fullWidth>
            <InputLabel>Teacher</InputLabel>
            <Select
              name="teacher"
              value={form.teacher}
              onChange={handleChange}
            >
              {teachers.map(teacher => (
                <MenuItem key={teacher.id} value={teacher.name}>{teacher.name}</MenuItem>
              ))}
            </Select>
          </FormControl>
          <TextField
            fullWidth
            label="Address"
            name="address"
            value={form.address}
            onChange={handleChange}
          />
          <Button variant="contained" color="primary" onClick={handleSubmit}>
            {student ? 'Update' : 'Add'} Student
          </Button>
        </FormControl>
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
