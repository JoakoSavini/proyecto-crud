import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { Button } from 'primereact/button';
import * as Yup from 'yup';

const API_URL = '/api/products';

const ProductForm = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [initialValues, setInitialValues] = useState({
        name: '',
        price: '',
        stock: '',
    });

    useEffect(() => {
        if (id) {
            fetch(`${API_URL}/${id}`)
                .then(res => res.json())
                .then(data => {
                    setInitialValues({
                        name: data.name,
                        price: data.price,
                        stock: data.stock,
                    });
                });
        }
    }, [id]);

    const validationSchema = Yup.object({
        name: Yup.string().required('Requerido'),
        price: Yup.number().required('Requerido'),
        stock: Yup.number().required('Requerido'),
    });

    const handleSubmit = async (values) => {
        if (id) {
            // Como crudcrud no soporta PUT, primero eliminamos y luego creamos de nuevo
            await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
        }

        await fetch(API_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(values),
        });

        navigate('/productos');
    };

    return (
        <div className="p-6" style={{ backgroundColor: '#121212', color: 'white' }}>
            <h2 className="text-2xl mb-6">
                {id ? 'Editar Producto' : 'Crear Producto'}
            </h2>

            <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
                enableReinitialize
            >
                <Form className="flex flex-col gap-4">
                    <div>
                        <label>Nombre</label>
                        <Field name="name" className="p-inputtext" />
                        <ErrorMessage name="name" component="div" className="text-red-400" />
                    </div>
                    <div>
                        <label>Precio</label>
                        <Field name="price" type="number" className="p-inputtext" />
                        <ErrorMessage name="price" component="div" className="text-red-400" />
                    </div>
                    <div>
                        <label>Stock</label>
                        <Field name="stock" type="number" className="p-inputtext" />
                        <ErrorMessage name="stock" component="div" className="text-red-400" />
                    </div>

                    <Button label={id ? 'Guardar cambios' : 'Crear producto'} type="submit" />
                </Form>
            </Formik>
        </div>
    );
};

export default ProductForm;
