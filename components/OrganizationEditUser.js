import { Field, Form, Formik } from 'formik';
import * as Yup from 'yup';
import CommonSideModal from '@/components/Common/CommonSideModal';
import { forwardRef, useImperativeHandle, useRef, useState } from 'react';
import helper from '@/libs/helper';
import axios from '@/libs/axios';
import FieldButton from './Field/FieldButton';

const OrganizationEditUser = (props, forwardedRef) => {
    const modal = useRef();
    const defaultParams = {
        first_name: '',
        last_name: '',
        email: '',
        phone_prefix: '',
        phone: '',
        role: '',
        role_in_organization: '',
        internal_notes: '',
    };

    const [params, setParams] = useState(defaultParams);

    const validationSchema = Yup.object().shape({
        first_name: Yup.string().required('required'),
        last_name: Yup.string().required('required'),
        email: Yup.string().required('required').email('valid email'),
        phone_prefix: Yup.string().required('required'),
        phone: Yup.string().required('required'),
        role: Yup.string().required('required'),
    });

    useImperativeHandle(forwardedRef, () => ({
        async open(id) {
            await getUserDetails(id);
            modal?.current?.open();
        },
        close() {
            modal?.current?.close();
        },
    }));

    const getUserDetails = async (id) => {
        const { data } = await axios.get(`admin/organizations/${props.organizationId}/users/${id}`);
        if (data) {
            const user = {
                id: data.user.id,
                organization_id: data.organization_id || props.organizationId,
                first_name: data.user.first_name || '',
                last_name: data.user.last_name || '',
                email: data.user.email || '',
                phone_prefix: data.user.phone_prefix || '',
                phone: data.user.phone || '',
                role: data.role || '',
                role_in_organization: data.role_in_organization || '',
                internal_notes: data.internal_notes || '',
            };
            setParams(user);
        }
    };

    const changeUserStatus = async (value) => {
        const { data } = await axios.post(`admin/organizations/${props.organizationId}/users/change-status`, {
            user_id: params.id,
            status: value,
        });
        if (data.success) {
            props.refresh();
        }
    };

    const formHandler = async (values) => {
        const { data } = await axios.post(`admin/organizations/${values.organization_id}/users/update`, {
            ...values,
            user_id: params.id,
            phone: values.phone_prefix + values.phone,
        });
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
                                <div className="flex items-center gap-5">
                                    <h2 className="text-xl font-semibold">Edit User</h2>
                                    {params.status === 1 && (
                                        <p className="inline-flex gap-2 font-semibold">
                                            <button
                                                type="button"
                                                className="text-success hover:text-black/50"
                                                onClick={() => changeUserStatus(2)}
                                            >
                                                Approve
                                            </button>
                                            <button
                                                type="button"
                                                className="text-danger hover:text-black/50"
                                                onClick={() => changeUserStatus(3)}
                                            >
                                                Reject
                                            </button>
                                        </p>
                                    )}
                                </div>

                                <h3 className="text-lg font-semibold text-black-dark">Information</h3>
                                <div className="grid gap-4 sm:grid-cols-2 xl:gap-[30px]">
                                    <div className={submitCount && errors.first_name && 'has-error'}>
                                        <label className="form-label">First Name</label>
                                        <Field
                                            name="first_name"
                                            type="text"
                                            className="form-input"
                                            placeholder="First name..."
                                        />
                                    </div>

                                    <div className={submitCount && errors.last_name && 'has-error'}>
                                        <label className="form-label">Last Name</label>
                                        <Field
                                            name="last_name"
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

                                    <div className={submitCount && errors.phone_prefix && 'has-error'}>
                                        <label className="form-label">Phone Prefix</label>
                                        <Field as="select" name="phone_prefix" className="form-select">
                                            <option value="">Phone Prefix...</option>
                                            {helper.phonePrefix.map((prefix) => {
                                                return (
                                                    <option value={prefix} key={prefix}>
                                                        {prefix}
                                                    </option>
                                                );
                                            })}
                                        </Field>
                                    </div>

                                    <div className={submitCount && errors.phone && 'has-error'}>
                                        <label className="form-label">Phone Number</label>
                                        <Field
                                            name="phone"
                                            type="text"
                                            className="form-input"
                                            placeholder="Phone Number..."
                                        />
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
                                    <div className={submitCount && errors.role_in_organization && 'has-error'}>
                                        <label className="form-label">Role in Organization</label>
                                        <Field
                                            name="role_in_organization"
                                            type="text"
                                            className="form-input"
                                            placeholder="Role in Organization..."
                                        />
                                    </div>

                                    <div
                                        className={`sm:col-span-2 ${
                                            submitCount && errors.internal_notes && 'has-error'
                                        }`}
                                    >
                                        <label className="form-label">Internal Notes</label>
                                        <Field name="internal_notes" as="textarea" className="form-textarea" />
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

export default forwardRef(OrganizationEditUser);
