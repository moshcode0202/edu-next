import FieldButton from '@/components/Field/FieldButton';
import { useAuth } from '@/hooks/useAuth';
import { Field, Form, Formik } from 'formik';
import Link from 'next/link';
import * as Yup from 'yup';

const ForgotPassword = () => {
    const { forgotPassword } = useAuth();
    const params = { email: '' };

    const formHandler = async (values) => {
        await forgotPassword(values);
    };

    const validationSchema = Yup.object().shape({
        email: Yup.string().required('required').email('valid email'),
    });

    return (
        <div className="min-h-screen">
            <div className="flex min-h-[calc(100vh-77px)] flex-col items-center justify-center p-4">
                <div className="mx-auto w-full max-w-[600px] space-y-[25px] rounded border border-white-light bg-white p-10">
                    <h2 className="text-center text-xl font-semibold">Forgot Password</h2>

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

                                <FieldButton loading={isSubmitting} type="submit" className="btn !mt-6 w-full">
                                    Submit
                                </FieldButton>
                            </Form>
                        )}
                    </Formik>

                    <p className="text-center">
                        <Link
                            href="/login"
                            className="font-semibold text-primary transition-all duration-300 hover:text-black-dark"
                        >
                            Back to Sign In
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default ForgotPassword;

ForgotPassword.middleware = {
    auth: false,
};

ForgotPassword.layout = 'nosidebar';
