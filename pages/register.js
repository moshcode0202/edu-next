import FieldButton from '@/components/Field/FieldButton';
import { useAuth } from '@/hooks/useAuth';
import { Field, Form, Formik } from 'formik';
import Link from 'next/link';
import * as Yup from 'yup';

const Register = () => {
    const { register } = useAuth();
    const params = { first_name: '', last_name: '', email: '', password: '', password_confirmation: '' };

    const formHandler = async (values) => {
        await register(values);
    };

    const validationSchema = Yup.object().shape({
        first_name: Yup.string().required('required'),
        last_name: Yup.string().required('required'),
        email: Yup.string().required('required').email('valid email'),
        password: Yup.string().required('required'),
        password_confirmation: Yup.string()
            .oneOf([Yup.ref('password'), null], 'Passwords must match')
            .required('required'),
    });

    return (
        <div className="min-h-screen">
            <div className="flex min-h-[calc(100vh-77px)] flex-col items-center justify-center p-4">
                <div className="mx-auto w-full max-w-[600px] space-y-[25px] rounded border border-white-light bg-white p-10">
                    <h2 className="text-center text-xl font-semibold">Sign Up</h2>
                    <Formik initialValues={params} onSubmit={formHandler} validationSchema={validationSchema}>
                        {({ isSubmitting, submitCount, errors }) => (
                            <Form className="space-y-4">
                                <div className={submitCount && errors.first_name && 'has-error'}>
                                    <label className="form-label">First name</label>
                                    <div>
                                        <Field
                                            name="first_name"
                                            type="text"
                                            className="form-input"
                                            placeholder="First name..."
                                        />
                                    </div>
                                </div>

                                <div className={submitCount && errors.last_name && 'has-error'}>
                                    <label className="form-label">Last name</label>
                                    <div>
                                        <Field
                                            name="last_name"
                                            type="text"
                                            className="form-input"
                                            placeholder="Last name..."
                                        />
                                    </div>
                                </div>

                                <div className={submitCount && errors.email && 'has-error'}>
                                    <label className="form-label">Email address</label>
                                    <div>
                                        <Field
                                            name="email"
                                            type="text"
                                            className="form-input"
                                            placeholder="Email address..."
                                        />
                                    </div>
                                </div>

                                <div className={submitCount && errors.password && 'has-error'}>
                                    <label className="form-label">Password</label>
                                    <div>
                                        <Field
                                            name="password"
                                            type="password"
                                            className="form-input"
                                            placeholder="Password..."
                                        />
                                    </div>
                                </div>

                                <div className={submitCount && errors.password_confirmation && 'has-error'}>
                                    <label className="form-label">Confirm Password</label>
                                    <div>
                                        <Field
                                            name="password_confirmation"
                                            type="password"
                                            className="form-input"
                                            placeholder="Confirm password..."
                                        />
                                    </div>
                                </div>

                                <FieldButton loading={isSubmitting} type="submit" className="btn !mt-6 w-full">
                                    Sign up
                                </FieldButton>
                            </Form>
                        )}
                    </Formik>
                    <p className="text-center">
                        Already have account?{' '}
                        <Link
                            href="/login"
                            className="font-semibold text-primary transition-all duration-300 hover:text-black-dark"
                        >
                            Sign In
                        </Link>
                        .
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Register;

Register.middleware = {
    auth: false,
};

Register.layout = 'nosidebar';
