import { Field, Form, Formik } from 'formik';
import { useState } from 'react';
import * as Yup from 'yup';
import FieldButton from '../Field/FieldButton';
const CommonAddressModal = ({ data, title, submit }) => {
    const defaultParams = {
        addressLine1: '',
        addressLine2: '',
        city: '',
        state: '',
        zipcode: '',
        country: '',
    };

    const [params, setParams] = useState(data || defaultParams);

    const validationSchema = Yup.object().shape({
        addressLine1: Yup.string().required('required'),
        addressLine2: Yup.string().required('required'),
        city: Yup.string().required('required'),
        state: Yup.string().required('required'),
        zipcode: Yup.string().required('required'),
        country: Yup.string().required('required'),
    });

    const formHandler = async (value) => {
        await submit(value);
    };

    return (
        <Formik initialValues={params} onSubmit={formHandler} validationSchema={validationSchema}>
            {({ isSubmitting, submitCount, errors }) => (
                <Form>
                    <div className="flex h-full flex-col justify-between">
                        <div className="space-y-4 xl:space-y-[30px]">
                            <h3 className="text-lg font-semibold text-black-dark">{title}</h3>
                            <div className="grid gap-4 sm:grid-cols-2 xl:gap-[30px]">
                                <div className={submitCount && errors.addressLine1 && 'has-error'}>
                                    <label className="form-label">Address Line 1</label>
                                    <Field
                                        type="text"
                                        className="form-input"
                                        name="addressLine1"
                                        placeholder="AddressLine1..."
                                    />
                                </div>
                                <div className={submitCount && errors.addressLine2 && 'has-error'}>
                                    <label className="form-label">Address Line 2</label>
                                    <Field
                                        type="text"
                                        className="form-input"
                                        name="addressLine2"
                                        placeholder="AddressLine2..."
                                    />
                                </div>
                                <div className={submitCount && errors.city && 'has-error'}>
                                    <label className="form-label">City</label>
                                    <Field type="text" className="form-input" name="city" placeholder="City..." />
                                </div>
                                <div className={submitCount && errors.state && 'has-error'}>
                                    <label className="form-label">State</label>
                                    <Field as="select" className="form-select mb-1" name="state">
                                        <option value="">State...</option>
                                        <option value="CA">CA</option>
                                    </Field>
                                </div>
                                <div className={submitCount && errors.zipcode && 'has-error'}>
                                    <label className="form-label">Zipcode</label>
                                    <Field type="text" className="form-input" name="zipcode" placeholder="Zipcode..." />
                                </div>
                                <div className={submitCount && errors.country && 'has-error'}>
                                    <label className="form-label">Country</label>
                                    <Field as="select" className="form-select mb-1" name="country">
                                        <option value="">Country...</option>
                                        <option value="CA">CA</option>
                                    </Field>
                                </div>
                            </div>
                        </div>
                        <div className="mt-5 text-right">
                            <FieldButton loading={isSubmitting} type="submit" className="btn">
                                Save
                            </FieldButton>
                        </div>
                    </div>
                </Form>
            )}
        </Formik>
    );
};

export default CommonAddressModal;
