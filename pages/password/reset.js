import FieldButton from '@/components/Field/FieldButton';
import { useAuth } from '@/hooks/useAuth';
import { Field, Form, Formik } from 'formik';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import * as Yup from 'yup';

const ResetPassword = () => {
    const router = useRouter();
    const { resetPassword } = useAuth();
    const params = { password: '', password_confirmation: '' };

    useEffect(() => {
        if (router.isReady && !router.query.token) {
            router.push('/login');
        }
    }, [router]);

    const formHandler = async (values) => {
        await resetPassword(values);
    };

    const validationSchema = Yup.object().shape({
        password: Yup.string().required('required'),
        password_confirmation: Yup.string()
            .oneOf([Yup.ref('password'), null], 'Passwords must match')
            .required('required'),
    });

    return (
        <div className="min-h-screen">
            <div className="flex min-h-[calc(100vh-77px)] flex-col items-center justify-center p-4">
                <div className="mx-auto w-full max-w-[600px] space-y-[25px] rounded border border-white-light bg-white p-10">
                    <h2 className="text-center text-xl font-semibold">Reset Password</h2>

                    <Formik initialValues={params} onSubmit={formHandler} validationSchema={validationSchema}>
                        {({ isSubmitting, submitCount, errors }) => (
                            <Form className="space-y-4">
                                <div className={submitCount && errors.password && 'has-error'}>
                                    <label className="form-label">Password</label>
                                    <div>
                                        <Field
                                            name="password"
                                            type="password"
                                            className="form-input"
                                            placeholder="Password"
                                        />
                                    </div>
                                </div>

                                <div className={submitCount && errors.password_confirmation && 'has-error'}>
                                    <label className="form-label">Confirm password</label>
                                    <div>
                                        <Field
                                            name="password_confirmation"
                                            type="password"
                                            className="form-input"
                                            placeholder="Confirm password"
                                        />
                                    </div>
                                </div>

                                <FieldButton loading={isSubmitting} type="submit" className="btn !mt-6 w-full">
                                    Reset Password
                                </FieldButton>
                            </Form>
                        )}
                    </Formik>
                </div>
            </div>
        </div>
    );
};

export default ResetPassword;

ResetPassword.middleware = {
    auth: false,
};

ResetPassword.layout = 'nosidebar';
