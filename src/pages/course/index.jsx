import axios from "axios";
import React, { useEffect, useState } from 'react';
import { CourseTable, CourseModal } from "@component";
import Button from '@mui/material/Button';

const Index = () => {
  const [data, setData] = useState([]);
  const [open, setOpen] = useState(false);
  const [editingCourse, setEditingCourse] = useState(null);

  useEffect(() => {
    axios.get("http://localhost:3000/course").then(res => {
      setData(res?.data);
    }).catch(err => {
      console.error("Error fetching data: ", err);
    });
  }, []);

  const handleClose = () => {
    setOpen(false);
    
  };

  const openModal = () => {
    setOpen(true);
  };

  const handleEdit = (id) => {
    const course = data.find(item => item.id === id);
    setEditingCourse(course);
    openModal();
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/course/${id}`);
      setData(data.filter(item => item.id !== id));
    } catch (error) {
      console.error('Error deleting course:', error);
    }
  };

  return (
    <div className="flex flex-col gap-3">
      <CourseModal
        open={open}
        handleClose={handleClose}
        editingCourse={editingCourse}
      />
      <Button variant="contained" onClick={openModal}>Add Course</Button>

      <CourseTable
        data={data}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
    </div>
  );
}

export default Index;
