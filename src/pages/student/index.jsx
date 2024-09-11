import React, { useState, useEffect } from 'react';
import axios from 'axios';
import StudentTable from '../../component/studentTable';
import StudentModal from '../../component/studentModal';
import Button from '@mui/material/Button';

const StudentPage = () => {
  const [students, setStudents] = useState([]);
  const [groups, setGroups] = useState([]);
  const [teachers, setTeachers] = useState([]);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    axios.get('http://localhost:3000/student')
      .then(response => setStudents(response.data))
      .catch(error => console.error('Error fetching student data:', error));

    axios.get('http://localhost:3000/group')
      .then(response => setGroups(response.data))
      .catch(error => console.error('Error fetching group data:', error));

    axios.get('http://localhost:3000/teacher')
      .then(response => setTeachers(response.data))
      .catch(error => console.error('Error fetching teacher data:', error));
  }, []);

  const handleEdit = (id) => {
    const student = students.find(student => student.id === id);
    setSelectedStudent(student);
    setModalOpen(true);
  };

  const handleDelete = (id) => {
    axios.delete(`http://localhost:3000/student/${id}`)
      .then(() => setStudents(students.filter(student => student.id !== id)))
      .catch(error => console.error('Error deleting student:', error));
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setSelectedStudent(null);
  };

  return (
    <div className="flex flex-col gap-3">
      <StudentModal 
        open={modalOpen} 
        onClose={handleCloseModal} 
        student={selectedStudent} 
        groups={groups} 
        teachers={teachers}
        onUpdate={updatedStudent => {
          setStudents(students.map(student => student.id === updatedStudent.id ? updatedStudent : student));
          handleCloseModal();
        }} 
      />
      <Button variant="contained" onClick={() => setModalOpen(true)}>Add Student</Button>
      <StudentTable data={students} onEdit={handleEdit} onDelete={handleDelete} />
    </div>
  );
};

export default StudentPage;
