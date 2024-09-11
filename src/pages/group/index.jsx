import React, { useEffect, useState } from 'react';
import { GroupTable , GroupModal } from '../../component';
import Button from '@mui/material/Button';
import axios from 'axios';

const Group = () => {
  const [data, setData] = useState([]);
  const [open, setOpen] = useState(false);
  const [editingGroup, setEditingGroup] = useState(null);

  useEffect(() => {
    axios.get('http://localhost:3000/group')
      .then(res => setData(res.data))
      .catch(err => console.log(err));
  }, []);

  const handleClose = () => {
    setOpen(false);
    setEditingGroup(null);
  };

  const openModal = (group = null) => {
    setEditingGroup(group);
    setOpen(true);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/group/${id}`);
      setData(data.filter(item => item.id !== id));
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="flex flex-col gap-3">
      <GroupModal open={open} handleClose={handleClose} editingGroup={editingGroup} />
      <Button variant="contained" onClick={() => openModal(null)}>Add Group</Button>
      <GroupTable data={data} onEdit={openModal} onDelete={handleDelete} />
    </div>
  );
};

export default Group;
