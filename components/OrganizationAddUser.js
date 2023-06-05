import { Field, Form, Formik } from 'formik';
import * as Yup from 'yup';
import CommonSideModal from '@/components/Common/CommonSideModal';
import { forwardRef, useImperativeHandle, useRef } from 'react';
import helper from '@/libs/helper';
import axios from '@/libs/axios';
import FieldButton from './Field/FieldButton';

const ProductsImport = (props, forwardedRef) => {
    const modal = useRef();
    const params = { role: 1, email: '' };

    const validationSchema = Yup.object().shape({
        role: Yup.string().required('required'),
        email: Yup.string().required('required').email('valid email'),
    });

    useImperativeHandle(forwardedRef, () => ({
        open() {
            modal?.current?.open();
        },
        close() {
            modal?.current?.close();
        },
    }));

    const formHandler = async (values) => {
        const { data } = await axios.post(`admin/organizations/${props.organizationId}/assign-user-by-email`, values);
        if (data.success) {
            props.refresh();
        }
    };

    return (
        <CommonSideModal ref={modal}>
            <Formik initialValues={params} onSubmit={formHandler} validationSchema={validationSchema}>
                {({ isSubmitting, submitCount, errors }) => (
                    <Form className="h-full">
                        <div className="flex h-full flex-col justify-between">
                            <div className="space-y-4 xl:space-y-[30px]">
                                <h2 className="text-xl font-semibold">Add User</h2>

                                <h3 className="text-lg font-semibold text-black-dark">Information</h3>

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

                                <div className={submitCount && errors.role && 'has-error'}>
                                    <label className="form-label">Role</label>
                                    <Field as="select" name="role" className="form-select mb-1">
                                        <option value="">Role...</option>
                                        {helper.roles.map((role) => {
                                            return (
                                                <option key={role.id} value={role.id}>
                                                    {role.name}
                                                </option>
                                            );
                                        })}
                                    </Field>
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
