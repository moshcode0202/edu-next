import { Field, Form, Formik } from 'formik';
import * as Yup from 'yup';
import CommonSideModal from '@/components/Common/CommonSideModal';
import { forwardRef, useImperativeHandle, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import axios from '@/libs/axios';
import { useAuth } from '@/hooks/useAuth';
import FieldButton from '../Field/FieldButton';

const ProductsImport = (props, forwardedRef) => {
    const modal = useRef();
    const { user } = useSelector((state) => state.auth);
    const defaultParams = {
        firstName: '',
        lastName: '',
        email: '',
        current: '',
        password: '',
        passwordConfirmation: '',
    };
    const [params, setParams] = useState(defaultParams);
    const { fetchUser } = useAuth();

    const profileValidationSchema = Yup.object().shape({
        firstName: Yup.string().required('required'),
        lastName: Yup.string().required('required'),
        email: Yup.string().required('required').email('valid email'),
    });
    const validationSchema = Yup.object().shape({
        current: Yup.string().required('required'),
        password: Yup.string().required('required'),
        passwordConfirmation: Yup.string()
            .oneOf([Yup.ref('password'), null], 'Passwords must match')
            .required('required'),
    });

    useImperativeHandle(forwardedRef, () => ({
        open() {
            modal?.current?.open();
            setParams({
                ...params,
                firstName: user.first_name,
                lastName: user.last_name,
                email: user.email,
            });
        },
        close() {
            modal?.current?.close();
        },
    }));

    const formHandler = async (values) => {
        const { data } = await axios.post(`admin/profile`, {
            first_name: values.firstName,
            last_name: values.lastName,
            email: values.email,
        });
        if (data.data) {
            fetchUser();
            modal.current.close();
        }
    };

    const changePassword = async (values) => {
        const { data } = await axios.post(`admin/change-password`, {
            current_password: values.current,
            password: values.password,
            password_confirmation: values.passwordConfirmation,
        });
    };

    return (
        <CommonSideModal ref={modal}>
            <Formik initialValues={params} onSubmit={formHandler} validationSchema={profileValidationSchema}>
                {({ isSubmitting, submitCount, errors }) => (
                    <Form>
                        <div className="flex h-full flex-col justify-between">
                            <div className="space-y-4 xl:space-y-[30px]">
                                <h2 className="text-xl font-semibold">Edit User</h2>

                                <h3 className="text-lg font-semibold text-black-dark">Information</h3>
                                <div className="grid gap-4 sm:grid-cols-2 xl:gap-[30px]">
                                    <div className={submitCount && errors.firstName && 'has-error'}>
                                        <label className="form-label">First Name</label>
                                        <Field
                                            name="firstName"
                                            type="text"
                                            className="form-input"
                                            placeholder="First name..."
                                        />
                                    </div>

                                    <div className={submitCount && errors.lastName && 'has-error'}>
                                        <label className="form-label">Last Name</label>
                                        <Field
                                            name="lastName"
                                            type="text"
                                            className="form-input"
                                            placeholder="Last name..."
                                        />
                                    </div>

                                    <div className={`sm:col-span-2 ${submitCount && errors.email && 'has-error'}`}>
                                        <label className="form-label">Email address</label>
                                        <div>
                                            <Field
                                                name="email"
                                                type="text"
                                                className="form-input"
                                                placeholder="Email address..."
                                            />
                                            <p className="mt-1 text-sm italic text-black-dark">
                                                An email will be sent to confirm the new email address.
                                            </p>
                                        </div>
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

            <Formik initialValues={params} onSubmit={changePassword} validationSchema={validationSchema}>
                {({ isSubmitting, submitCount, errors }) => (
                    <Form>
                        <div className="flex h-full flex-col justify-between">
                            <div className="space-y-4 xl:space-y-[30px]">
                                <h3 className="text-lg font-semibold text-black-dark">Password</h3>
                                <div className="grid grid-cols-1 gap-4 xl:gap-[30px]">
                                    <div className={submitCount && errors.current && 'has-error'}>
                                        <label className="form-label">Current password</label>
                                        <Field
                                            autoComplete="on"
                                            name="current"
                                            type="password"
                                            className="form-input"
                                            placeholder="New password..."
                                        />
                                    </div>
                                    <div className={submitCount && errors.password && 'has-error'}>
                                        <label className="form-label">New password</label>
                                        <Field
                                            autoComplete="on"
                                            name="password"
                                            type="password"
                                            className="form-input"
                                            placeholder="New password..."
                                        />
                                    </div>
                                    <div className={submitCount && errors.passwordConfirmation && 'has-error'}>
                                        <label className="form-label">Confirm new password</label>
                                        <Field
                                            autoComplete="on"
                                            name="passwordConfirmation"
                                            type="password"
                                            className="form-input"
                                            placeholder="Confirm new password..."
                                        />
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
        </CommonSideModal>
    );
};

export default forwardRef(ProductsImport);
