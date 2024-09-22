import * as React from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import { FormControl, TextField } from '@mui/material';
import { useState, useEffect } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import category from '@service/category'; // to'g'ri yo'l
import { CourseValidationSchema } from '@utils/validation.js';

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

export default function CategoryModal({ open, handleClose, editingCategory, onSubmitSuccess }) {
  const [form, setForm] = useState({ category: '' });

  useEffect(() => {
    if (editingCategory) {
      setForm(editingCategory);
    } else {
      setForm({ category: '' });
    }
  }, [editingCategory]);

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      let response;
      if (editingCategory) {
        response = await category.update({ ...values, id: editingCategory.id });
      } else {
        response = await category.create({ category: values.category });
      }
      onSubmitSuccess(response.data); // Yangi kategoriya qo'shish
      handleClose();
    } catch (err) {
      console.error('Error during submission:', err);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Modal
      keepMounted
      open={open}
      onClose={handleClose}
      aria-labelledby="keep-mounted-modal-title"
      aria-describedby="keep-mounted-modal-description"
    >
      <Box sx={style}>
        <Formik
          initialValues={form}
          enableReinitialize={true}
          validationSchema={CourseValidationSchema}
          onSubmit={handleSubmit}
        >
          {({ values, handleChange, isSubmitting }) => (
            <Form className="flex flex-col gap-3">
              <FormControl fullWidth>
                <Field
                  as={TextField}
                  fullWidth
                  label="Category"
                  id="category"
                  name="category"
                  value={values.category}
                  onChange={handleChange}
                  helperText={
                    <ErrorMessage
                      name="category"
                      component="p"
                      className="text-red-600 text-sm"
                    />
                  }
                />
              </FormControl>
              <Button variant="contained" color="primary" type="submit" disabled={isSubmitting}>
                Save
              </Button>
            </Form>
          )}
        </Formik>
      </Box>
    </Modal>
  );
}
