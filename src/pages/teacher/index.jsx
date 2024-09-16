import axios from "axios";
import React, { useEffect, useState } from 'react';
import { TeacherTable, TeacherModal } from "@component";
import Button from '@mui/material/Button';

const Index = () => {
  const [data, setData] = useState([]);
  const [course, setCourse] = useState([]);
  const [open, setOpen] = useState(false);
  const [editingTeacher, setEditingTeacher] = useState(null);

  useEffect(() => {
    axios.get("http://localhost:3000/teacher").then(res => {
      setData(res?.data);
    }).catch(err => {
      console.error("Error fetching data: ", err);
    });
  }, []);

  const handleClose = () => {
    setOpen(false);
  
  };

  const openModal = async () => {
    try {
      const response = await axios.get('http://localhost:3000/course');
      setCourse(response.data);
    } catch (error) {
      console.error('Error fetching course data:', error);
    }
    setOpen(true);
  };

  const handleEdit = (id) => {
    const teacher = data.find(item => item.id === id);
    setEditingTeacher(teacher);
    openModal();
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/teacher/${id}`);
      setData(data.filter(item => item.id !== id));
    } catch (error) {
      console.error('Error deleting teacher:', error);
    }
  };

  return (
    <div className="flex flex-col gap-3">
      <TeacherModal
        open={open}
        handleClose={handleClose}
        course={course}
        editingTeacher={editingTeacher}
      />
      <Button variant="contained" onClick={openModal}>Add Teacher</Button>

      <TeacherTable
        data={data}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
    </div>
  );
}

export default Index;