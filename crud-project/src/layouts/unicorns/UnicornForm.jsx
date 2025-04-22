import React, { useContext, useEffect, useState } from 'react';
import { UnicornContext } from "../../context/UnicornContext";
import { Button } from 'primereact/button';
import { useParams } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

const UnicornForm = () => {
    const { id } = useParams();
    const {
        unicorns,
        createUnicorn,
        updateUnicorn,
    } = useContext(UnicornContext);

    const [initialValues, setInitialValues] = useState({
        name: '',
        age: '',
        color: '',
        power: '',
    });

    useEffect(() => {
        if (id) {
            const unicorn = unicorns.find(u => u._id === id);
            if (unicorn) {
                setInitialValues(unicorn);
            }
        }
    }, [id, unicorns]);

    const validationSchema = Yup.object({
        name: Yup.string()
            .min(6, 'Debe tener mínimo 6 caracteres')
            .max(20, 'Debe tener menos de 20 caracteres')
            .required('Nombre es obligatorio'),
        age: Yup.number()
            .required('Edad es obligatorio'),
        color: Yup.string()
            .required('Color es obligatorio'),
        power: Yup.string()
            .required('Poder es obligatorio'),
    });

    const handleSubmit = (values) => {
        if (id) {
            updateUnicorn({ ...values, _id: id });
        } else {
            createUnicorn(values);
        }
    };

    return (
        <div
            className="p-6"
            style={{ backgroundColor: '#121212', minHeight: '100vh', color: '#ffffff' }}
        >
            <h2 className="text-2xl mb-8">🦄 {id ? 'Editar' : 'Crear'} unicornio</h2>

            <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
                enableReinitialize
            >
                <Form>
                    <div>
                        <label>Nombre</label>
                        <Field name='name' />
                        <ErrorMessage name="name" component='div' />
                    </div>
                    <div>
                        <label>Edad</label>
                        <Field name='age' />
                        <ErrorMessage name="age" component='div' />
                    </div>
                    <div>
                        <label>Color</label>
                        <Field name='color' />
                        <ErrorMessage name="color" component='div' />
                    </div>
                    <div>
                        <label>Poder</label>
                        <Field name='power' />
                        <ErrorMessage name="power" component='div' />
                    </div>
                    <Button
                        style={{ color: 'white' }}
                        label={id ? 'Editar unicornio' : 'Crear unicornio'}
                        type='submit'
                    />
                </Form>
            </Formik>
        </div>
    );
};

export default UnicornForm;
