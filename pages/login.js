import FieldButton from '@/components/Field/FieldButton';
import { useAuth } from '@/hooks/useAuth';
import { Field, Form, Formik } from 'formik';
import Link from 'next/link';
import * as Yup from 'yup';

const Login = () => {
    const { login } = useAuth();
    const params = { email: 'admin@mail.com', password: 'admin@mail.com', remember_me_token: false };

    const formHandler = async (values) => {
        await login(values);
    };

    const validationSchema = Yup.object().shape({
        email: Yup.string().required('required').email('valid email'),
        password: Yup.string().required('required'),
    });

    return (
        <div className="min-h-screen">
            <div className="flex min-h-[calc(100vh-77px)] flex-col items-center justify-center p-4">
                <div className="mx-auto w-full max-w-[600px] space-y-[25px] rounded border border-white-light bg-white p-10">
                    <h2 className="text-center text-xl font-semibold">Sign In</h2>

                    <Formik initialValues={params} onSubmit={formHandler} validationSchema={validationSchema}>
                        {({ isSubmitting, submitCount, errors }) => (
                            <Form className="space-y-4">
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

                                <div>
                                    <label htmlFor="remember_me_token">
                                        <input
                                            name="remember_me_token"
                                            id="remember_me_token"
                                            type="checkbox"
                                            className="form-checkbox mr-2.5"
                                            onChange={(e) => {
                                                params.remember_me_token = e.target.checked;
                                            }}
                                        />
                                        Remember me
                                    </label>
                                </div>

                                <div>
                                    <Link
                                        href="/forgot-password"
                                        className="text-sm font-semibold text-primary hover:text-black-dark"
                                    >
                                        Forgot Password?
                                    </Link>
                                </div>
                                <FieldButton loading={isSubmitting} type="submit" className="btn !mt-6 w-full">
                                    Sign In
                                </FieldButton>
                            </Form>
                        )}
                    </Formik>
                    <p className="text-center">
                        Don&apos;t have account?{' '}
                        <Link
                            href="/register"
                            className="font-semibold text-primary transition-all duration-300 hover:text-black-dark"
                        >
                            Sign up
                        </Link>
                        .
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Login;

Login.middleware = {
    auth: false,
};

Login.layout = 'nosidebar';
