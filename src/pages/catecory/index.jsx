import * as React from 'react';
import { CategoryModal, CategoryTable } from '@component';
import { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import category from '@service/category';
import axios from 'axios';

const Category = () => {
  const [data, setData] = useState([]);
  const [open, setOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get('http://localhost:3000/category');
        setData(res.data);
      } catch (err) {
        console.error('Error fetching data: ', err);
      }
    };
    fetchData();
  }, []);

  const handleClose = () => {
    setOpen(false);
  };

  const openModal = () => {
    setOpen(true);
  };

  const handleEdit = (id) => {
    const categoryItem = data.find((item) => item.id === id);
    setEditingCategory(categoryItem);
    openModal();
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/category/${id}`);
      setData(data.filter((item) => item.id !== id));
    } catch (error) {
      console.error('Error deleting category:', error);
    }
  };

  const handleSubmitSuccess = (newCategory) => {
    if (editingCategory) {
      setData(data.map(item => item.id === newCategory.id ? newCategory : item));
    } else {
      setData([...data, newCategory]);
    }
  };

  return (
    <div className="flex flex-col gap-3">
      <CategoryModal
        open={open}
        handleClose={handleClose}
        editingCategory={editingCategory}
        onSubmitSuccess={handleSubmitSuccess}
      />
      <Button variant="contained" onClick={() => {
        setEditingCategory(null); // Bo'sh kategoriya qo'shish uchun
        openModal();
      }}>
        Create
      </Button>
      <CategoryTable data={data} onEdit={handleEdit} onDelete={handleDelete} />
    </div>
  );
};

export default Category;
