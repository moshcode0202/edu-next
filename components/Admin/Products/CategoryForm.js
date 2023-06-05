import FieldButton from '@/components/Field/FieldButton';
import { Field, Form, Formik } from 'formik';
import * as Yup from 'yup';
import React, { useRef, useState, useImperativeHandle, forwardRef, useEffect } from 'react';
import axios from '@/libs/axios';
import CommonSideModal from '@/components/Common/CommonSideModal';

const CategoryForm = ({ data, refresh }, forwardedRef) => {
    const modal = useRef();

    const defaultParams = {
        name: '',
        slug: '',
        parent_id: '',
    };

    const [params, setParams] = useState(defaultParams);
    const [parentsCategories, setParentsCategories] = useState([]);

    const validationSchema = Yup.object().shape({
        name: Yup.string().required('required'),
        slug: Yup.string().required('required'),
    });

    useImperativeHandle(forwardedRef, () => ({
        open() {
            modal?.current?.open();
            if (Object.keys(data).length) {
                setParams(data);
                console.log(data);
            } else {
                setParams(defaultParams);
            }
        },
        close() {
            modal?.current?.close();
        },
    }));

    useEffect(() => {
        getParentCategories();
    }, []);

    const getParentCategories = async () => {
        try {
            const { data } = await axios.get(`/admin/categories/parents/`);
            setParentsCategories(data.data);
        } catch {}
    };

    const formHandler = async (values) => {
        try {
            if (params.id) {
                const { data } = await axios.post(`/admin/categories/${params.id}/`, values);
                refresh();
                getParentCategories();
                modal?.current?.close();
            } else {
                const { data } = await axios.post(`/admin/categories/`, values);
                refresh();
                getParentCategories();
                modal?.current?.close();
            }
        } catch {}
    };

    return (
        <CommonSideModal ref={modal}>
            <Formik initialValues={params} onSubmit={formHandler} validationSchema={validationSchema}>
                {({ isSubmitting, submitCount, errors, values }) => (
                    <Form className="flex h-full flex-col justify-between">
                        <div className="space-y-4 xl:space-y-[30px]">
                            <h2 className="text-xl font-semibold">{`${
                                Object.keys(data).length ? 'Edit' : 'Add'
                            } Product Category`}</h2>

                            <h3 className="text-lg font-semibold text-black-dark">Information</h3>

                            <div className="grid gap-5 sm:grid-cols-2">
                                <div className={submitCount && errors.name && 'has-error'}>
                                    <label className="form-label">Category Name</label>
                                    <Field
                                        name="name"
                                        type="text"
                                        className="form-input"
                                        placeholder="Category Name..."
                                    />
                                </div>

                                <div className={submitCount && errors.slug && 'has-error'}>
                                    <label className="form-label">Category Slug</label>
                                    <Field
                                        name="slug"
                                        type="text"
                                        className="form-input"
                                        placeholder="Category slug..."
                                    />
                                </div>

                                <div className="sm:col-span-2">
                                    <label className="form-label">Category Parent</label>
                                    <Field className="form-select" as="select" name="parent_id">
                                        <option>Cetegory Parent ...</option>

                                        {parentsCategories.map((parentsCategory) => {
                                            return (
                                                <React.Fragment key={parentsCategory.id}>
                                                    <option value={parentsCategory.id}>{parentsCategory.name}</option>
                                                    {parentsCategory.subcategories.map((selectedParent) => {
                                                        return (
                                                            <option key={selectedParent.id} value={selectedParent.id}>
                                                                -{selectedParent.name}
                                                            </option>
                                                        );
                                                    })}
                                                </React.Fragment>
                                            );
                                        })}
                                    </Field>
                                </div>
                            </div>
                        </div>
                        <div className="mt-5 text-right">
                            <FieldButton loading={isSubmitting} type="submit" className="btn">
                                Save
                            </FieldButton>
                        </div>
                    </Form>
                )}
            </Formik>
        </CommonSideModal>
    );
};

export default forwardRef(CategoryForm);
