const { Field, Formik, Form } = require('formik');
import { useState } from 'react';
import * as Yup from 'yup';
import FieldButton from '../Field/FieldButton';

const CommonAddress = ({ data, title, submit }) => {
    const defaultParams = { addressLine1: '', addressLine2: '', city: '', state: '', zipcode: '', country: '' };

    const [params, setParams] = useState(data || defaultParams);

    const validationSchema = Yup.object().shape({
        line1: Yup.string().required('required'),
        // line2: Yup.string().required('required'),
        city: Yup.string().required('required'),
        state: Yup.string().required('required'),
        zipcode: Yup.string().required('required'),
        country: Yup.string().required('required'),
    });

    const formHandler = async (values) => {
        await submit(values);
    };

    return (
        <Formik initialValues={params} onSubmit={formHandler} validationSchema={validationSchema} enableReinitialize>
            {({ isSubmitting, submitCount, errors }) => (
                <Form>
                    {JSON.stringify(errors)}
                    <div className="flex h-full flex-col justify-between">
                        <div className="space-y-4 xl:space-y-[30px]">
                            <h3 className="text-lg font-semibold text-black-dark">{title}</h3>

                            <div className="grid gap-4 sm:grid-cols-2 xl:gap-[30px]">
                                <div className={submitCount && errors.line1 && 'has-error'}>
                                    <label className="form-label">Address Line 1</label>
                                    <Field
                                        name="line1"
                                        type="text"
                                        className="form-input"
                                        placeholder="Address Line 1..."
                                    />
                                </div>

                                <div className={submitCount && errors.line2 && 'has-error'}>
                                    <label className="form-label">Address Line 2</label>
                                    <Field
                                        name="line2"
                                        type="text"
                                        className="form-input"
                                        placeholder="Address Line 2..."
                                    />
                                </div>

                                <div className={submitCount && errors.city && 'has-error'}>
                                    <label className="form-label">City</label>
                                    <Field name="city" type="text" className="form-input" placeholder="City..." />
                                </div>

                                <div className={submitCount && errors.state && 'has-error'}>
                                    <label className="form-label">State</label>
                                    <Field as="select" name="state" className="form-select mb-1">
                                        <option>State...</option>
                                        <option value="CA">CA</option>
                                    </Field>
                                </div>

                                <div className={submitCount && errors.zipcode && 'has-error'}>
                                    <label className="form-label">Zip Code</label>
                                    <Field
                                        name="zipcode"
                                        type="text"
                                        className="form-input"
                                        placeholder="Zip Code..."
                                    />
                                </div>

                                <div className={submitCount && errors.country && 'has-error'}>
                                    <label className="form-label">Country</label>
                                    <Field as="select" name="country" className="form-select mb-1">
                                        <option value="">Select...</option>
                                        <option value="US">US</option>
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

export default CommonAddress;
