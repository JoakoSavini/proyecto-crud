import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { Button } from 'primereact/button';
import * as Yup from 'yup';

const ProductForm = ({ initialValues, onSubmit, editingProduct, cancelEdit }) => {

    const validationSchema = Yup.object({
        name: Yup.string()
            .min(4, 'Debe tener mínimo 4 caracteres')
            .max(20, 'Debe tener menos de 20 caracteres')
            .required('Nombre es obligatorio'),
        price: Yup.number().required('Precio es obligatorio'),
        stock: Yup.string().required('Stock es obligatorio'),
    });

    return (
        <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={onSubmit}
            enableReinitialize
        >
            {({ resetForm }) => (
                <Form className="mb-10">
                    <div>
                        <label>Nombre</label>
                        <Field name='name' />
                        <ErrorMessage name="name" component='div' />
                    </div>
                    <div>
                        <label>Precio</label>
                        <Field name='price' />
                        <ErrorMessage name="price" component='div' />
                    </div>
                    <div>
                        <label>Stock</label>
                        <Field name='stock' />
                        <ErrorMessage name="stock" component='div' />
                    </div>
                    <div className="flex gap-2 mt-4">
                        <Button
                            style={{ color: 'white' }}
                            label={editingProduct ? 'Editar Productio' : 'Crear Productio'}
                            type='submit'
                        />
                        {editingProduct && (
                            <Button
                                label="Cancelar"
                                className="p-button-secondary"
                                onClick={() => {
                                    cancelEdit();
                                    resetForm();
                                }}
                                type="button"
                            />
                        )}
                    </div>
                </Form>
            )}
        </Formik>
    );
};

export default ProductForm;
