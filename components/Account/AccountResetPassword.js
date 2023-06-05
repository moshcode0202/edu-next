import FieldButton from '@/components/Field/FieldButton';
import { useUser } from '@/hooks/useUser';
import { Field, Form, Formik } from 'formik';
import * as Yup from 'yup';

const AccountResetPassword = () => {
    const { resetPassword } = useUser();
    const params = { current: '', password: '', password_confirmation: '' };
    const formHandler = async (value, { setSubmitting, resetForm }) => {
        const data = await resetPassword(value);
        if (data.success) {
            resetForm();
        }
        setSubmitting(false);
    };
    const validationSchema = Yup.object().shape({
        current: Yup.string().required('required'),
        password: Yup.string().required('required'),
        password_confirmation: Yup.string()
            .oneOf([Yup.ref('password'), null], 'Passwords must match')
            .required('required'),
    });
    return (
        <Formik initialValues={params} onSubmit={formHandler} validationSchema={validationSchema}>
            {({ isSubmitting, submitCount, errors }) => {
                return (
                    <Form>
                        <div className="mb-[25px]">
                            <h2 className="mb-[10px] text-[22px] font-semibold leading-7">Password</h2>
                            <p className="text-lightblack">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                        </div>
                        <div className="border-lightblue space-y-[15px] rounded border bg-white p-5">
                            <div className={submitCount && errors.current && 'has-error'}>
                                <label className="form-label">Current password</label>
                                <Field
                                    autoComplete="on"
                                    name="current"
                                    type="password"
                                    className="form-input"
                                    placeholder="Current password..."
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
                            <div className={submitCount && errors.password_confirmation && 'has-error'}>
                                <label className="form-label">Confirm new password</label>
                                <Field
                                    autoComplete="on"
                                    name="password_confirmation"
                                    type="password"
                                    className="form-input"
                                    placeholder="Confirm new password..."
                                />
                            </div>
                            <FieldButton loading={isSubmitting} type="submit" className="btn !mt-[25px]">
                                Save
                            </FieldButton>
                        </div>
                    </Form>
                );
            }}
        </Formik>
    );
};

export default AccountResetPassword;
