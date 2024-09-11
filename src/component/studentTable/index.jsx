import React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import PropTypes from 'prop-types';

const StudentTable = ({ data, onEdit, onDelete }) => {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align="center">T/R</TableCell>
            <TableCell align="center">Name</TableCell>
            <TableCell align="center">Age</TableCell>
            <TableCell align="center">Phone</TableCell>
            <TableCell align="center">Group</TableCell>
            <TableCell align="center">Teacher</TableCell>
            <TableCell align="center">Address</TableCell>
            <TableCell align="center">Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((student, index) => (
            <TableRow key={student.id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
              <TableCell align="center">{index + 1}</TableCell>
              <TableCell align="center">{student.name}</TableCell>
              <TableCell align="center">{student.age}</TableCell>
              <TableCell align="center">{student.phone}</TableCell>
              <TableCell align="center">{student.group}</TableCell>
              <TableCell align="center">{student.teacher}</TableCell>
              <TableCell align="center">{student.address}</TableCell>
              <TableCell align="center">
                <Button variant="outlined" color="primary" onClick={() => onEdit(student.id)}>Edit</Button>
                <Button variant="outlined" color="secondary" onClick={() => onDelete(student.id)} style={{ marginLeft: '10px' }}>Delete</Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

StudentTable.propTypes = {
  data: PropTypes.array.isRequired,
  onEdit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default StudentTable;
