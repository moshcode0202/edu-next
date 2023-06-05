import { Field, Form, Formik } from 'formik';
import React, { forwardRef, useImperativeHandle, useRef, useState } from 'react';
import CommonSideModal from './Common/CommonSideModal';
import * as Yup from 'yup';
import FieldButton from './Field/FieldButton';
import Flatpickr from 'react-flatpickr';
import 'flatpickr/dist/themes/material_green.css';
import axios from '@/libs/axios';

const AddProductFormMetaData = ({ data, refresh, submit }, forwardedRef) => {
    const modal = useRef();
    const defaultParams = {
        parent_id: '',
        option1_name: '',
        option1_value: '',
        option2_name: '',
        option2_value: '',
        explicit_content: '',
    };
    const [params, setParams] = useState(defaultParams);

    useImperativeHandle(forwardedRef, () => ({
        open() {
            modal?.current?.open();
            console.log('data', data);
            if (Object.keys(data).length) {
                setParams(() => {
                    return {
                        parent_id: data.parent_id || '',
                        explicit_content: data.explicit_content || '',
                        option1_name: data.option1_name || '',
                        option1_value: data.option1_value || '',
                        option2_name: data.option2_name || '',
                        option2_value: data.option2_value || '',
                    };
                });
            }
        },
        close() {
            modal?.current?.close();
        },
    }));

    const formHandler = async (values) => {
        await submit(values);
    };
    const [date, setDate] = useState(new Date());

    return (
        <CommonSideModal ref={modal}>
            <Formik initialValues={params} onSubmit={formHandler} enableReinitialize>
                {({ isSubmitting, submitCount, errors, values }) => (
                    <Form className="form">
                        {/* {console.log(values)} */}
                        <div className="flex h-screen flex-col justify-between">
                            <div className="space-y-4 xl:space-y-[30px]">
                                <h2 className="text-xl font-semibold">Meta Data</h2>
                                <div>
                                    <label className="form-label">Explicit Religion</label>
                                    <Field
                                        as="select"
                                        name="explicit_content"
                                        className="form-select"
                                        placeholder="Explicit Religion..."
                                    >
                                        
                                        <option value={true}>Yes</option>
                                        <option value={false}>No</option>
                                    </Field>
                                </div>
                                <div>
                                    <label className="form-label">Parent Id</label>
                                    <Field
                                        name="parent_id"
                                        type="text"
                                        className="form-input"
                                        placeholder="Parent Id.."
                                    />
                                </div>
                                <div>
                                    <label className="form-label">Option1 Name</label>
                                    <Field
                                        name="option1_name"
                                        type="text"
                                        className="form-input"
                                        placeholder="Option1 Name..."
                                    />
                                </div>
                                <div>
                                    <label className="form-label">Option1 Value</label>
                                    <Field
                                        name="option1_value"
                                        type="text"
                                        className="form-input"
                                        placeholder="Option1 Value..."
                                    />
                                </div>
                                <div>
                                    <label className="form-label">Option2 Name</label>
                                    <Field
                                        name="option2_name"
                                        type="text"
                                        className="form-input"
                                        placeholder="Option2 Name..."
                                    />
                                </div>
                                <div>
                                    <label className="form-label">Option2 Value</label>
                                    <Field
                                        name="option2_value"
                                        type="text"
                                        className="form-input"
                                        placeholder="Option2 Value..."
                                    />
                                </div>
                                <div>
                                    <label className="form-label">Date Available</label>
                                    {/* <input className="form-input flatpickr-input active" type="text" readonly="readonly"></input> */}
                                    <Flatpickr
                                        name=""
                                        className="form-input"
                                        data-enable-time
                                        value={date}
                                        onChange={(e) => setDate(e.target.value)}
                                    />
                                </div>
                                <div className="mt-5 text-right">
                                    <FieldButton loading={isSubmitting} type="submit" className="btn">
                                        Save
                                    </FieldButton>
                                </div>
                            </div>
                        </div>
                    </Form>
                )}
            </Formik>
        </CommonSideModal>
    );
};

export default forwardRef(AddProductFormMetaData);
