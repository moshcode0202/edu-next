import { Field, Form, Formik } from 'formik';
import * as Yup from 'yup';
import CommonSideModal from '@/components/Common/CommonSideModal';
import { forwardRef, useImperativeHandle, useRef, useState } from 'react';
import helper from '@/libs/helper';
import CommonAddress from '@/components/Common/CommonAddress';
import FieldButton from '@/components/Field/FieldButton';
import axios from '@/libs/axios';

const AdminOrganizationAddresses = ({ refresh }, forwardedRef) => {
    const modal = useRef();
    const [information, setInformation] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phonePrefix: '+1',
        phone: '',
    });

    const [shippingData, setShippingData] = useState({
        line1: '',
        line2: '',
        city: '',
        state: '',
        zipcode: '',
        country: '',
    });

    const [billingData, setBillingData] = useState({
        line1: '',
        line2: '',
        city: '',
        state: '',
        zipcode: '',
        country: '',
    });

    const [internalNotesData, setInternalNotesData] = useState({ internalNotes: '' });

    const [passwordInfo, setPasswordInfo] = useState({ password: '', passwordConfirmation: '' });

    const informationValidationSchema = Yup.object().shape({
        firstName: Yup.string().required('required'),
        lastName: Yup.string().required('required'),
        email: Yup.string().required('required').email('valid email'),
        phonePrefix: Yup.string().required('required'),
        phone: Yup.string().required('required'),
    });

    const internalNotesValidationSchema = Yup.object().shape({
        internalNotes: Yup.string().required('required'),
    });

    const passwordValidationSchema = Yup.object().shape({
        password: Yup.string().required('required'),
        passwordConfirmation: Yup.string()
            .oneOf([Yup.ref('password'), null], 'Passwords must match')
            .required('required'),
    });

    const openModalData = async (id) => {
        const { data } = await axios.get(`/admin/customers/${id}`);
        setInformation(() => {
            return {
                id: data.id,
                firstName: data.first_name || '',
                lastName: data.last_name || '',
                email: data.email || '',
                phonePrefix: data.phone_Prefix || '+1',
                phone: data.phone || '',
            };
        });
        setShippingData(() => {
            return {
                id: data.id,
                line1: data.shipping_address_line1 || '',
                line2: data.shipping_address_line2 || '',
                city: data.shipping_address_city || '',
                state: data.shipping_address_state || '',
                zipcode: data.shipping_address_zipcode || '',
                country: data.shipping_address_country || '',
            };
        });
        setBillingData(() => {
            return {
                id: data.id,
                line1: data.billing_address_line1 || '',
                line2: data.billing_address_line2 || '',
                city: data.billing_address_city || '',
                state: data.billing_address_state || '',
                zipcode: data.billing_address_zipcode || '',
                country: data.billing_address_country || '',
            };
        });
        setInternalNotesData(() => {
            return {
                id: data.id,
                internalNotes: data.internal_notes || '',
            };
        });
        setPasswordInfo(() => {
            return {
                id: data.id,
                password: data.password || '',
                passwordConfirmation: data.password_confirmation || '',
            };
        });
    };
    useImperativeHandle(forwardedRef, () => ({
        open(id) {
            setTimeout(() => {
                modal?.current?.open();
            });
            openModalData(id);
        },
        close() {
            modal?.current?.close();
        },
    }));
    const informationFormSubmit = async (value) => {
        try {
            const { data } = await axios.post(`/admin/customers/${value.id}`, {
                first_name: value.firstName,
                last_name: value.lastName,
                email: value.email,
                phone_Prefix: value.phonePrefix,
                phone: value.phone,
            });
        } catch {}
        modal?.current?.close();
        refresh();
    };
    
    const shippingFormSubmit = async (value) => {
        try {
            const { data } = await axios.post(`/admin/customers/${value.id}/shipping`, {
                line1: value.line1,
                line2: value.line2,
                city: value.city,
                state: value.state,
                zipcode: value.zipcode,
                country: value.country,
            });
        } catch {}
        modal?.current?.close();
        refresh();
    };

    const billingFormSubmit = async (value) => {
        try {
            const { data } = await axios.post(`/admin/customers/${value.id}/billing`, {
                line1: value.line1,
                line2: value.line2,
                city: value.city,
                state: value.state,
                zipcode: value.zipcode,
                country: value.country,
            });
        } catch {}
        modal?.current?.close();
        refresh();
    };

    const internalFormSubmit = async (value) => {
        try {
            const { data } = await axios.post(`/admin/customers/${value.id}/internal-notes`, {
                internal_notes: value.internalNotes,
            });
        } catch {}
        modal?.current?.close();
        refresh();
    };

    const passwordFormSubmit = async (value) => {
        try {
            const { data } = await axios.post(`/admin/customers/${value.id}/password`, {
                password: value.password,
                password_confirmation: value.passwordConfirmation,
            });
        } catch {}
        modal?.current?.close();
        refresh();
    };

    return (
        <CommonSideModal ref={modal}>
            <Formik
                initialValues={information}
                onSubmit={informationFormSubmit}
                validationSchema={informationValidationSchema}
                enableReinitialize
            >
                {({ isSubmitting, submitCount, errors, values }) => (
                    <Form>
                        <div className="flex h-full flex-col justify-between">
                            <div className="space-y-4 xl:space-y-[30px]">
                                <h2 className="text-xl font-semibold">{`${'Edit'} Customer`}</h2>
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

                                    <div className={submitCount && errors.phonePrefix && 'has-error'}>
                                        <label className="form-label">Phone Prefix</label>
                                        <Field as="select" name="phonePrefix" className="form-select">
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

            <CommonAddress title="Shipping" data={shippingData} submit={shippingFormSubmit}></CommonAddress>
            <CommonAddress title="Billing" data={billingData} submit={billingFormSubmit}></CommonAddress>

            <Formik
                initialValues={internalNotesData}
                onSubmit={internalFormSubmit}
                validationSchema={internalNotesValidationSchema}
                enableReinitialize
            >
                {({ isSubmitting, submitCount, errors }) => (
                    <Form>
                        <div className="space-y-4 xl:space-y-[30px]">
                            <h3 className="text-lg font-semibold text-black-dark">Other</h3>
                            <div className={submitCount && errors.internalNotes && 'has-error'}>
                                <label className="form-label">Internal Notes</label>
                                <Field name="internalNotes" as="textarea" className="form-textarea" />
                            </div>
                        </div>
                        <div className="mt-5 text-right">
                            <FieldButton loading={isSubmitting} type="submit" className="btn">
                                Save
                            </FieldButton>
                        </div>
                    </Form>
                )}
            </Formik>
            <Formik
                initialValues={passwordInfo}
                onSubmit={passwordFormSubmit}
                validationSchema={passwordValidationSchema}
                enableReinitialize
            >
                {({ isSubmitting, submitCount, errors }) => (
                    <Form>
                        <div className="space-y-4 xl:space-y-[30px]">
                            <h3 className="text-lg font-semibold text-black-dark">Password</h3>
                            <div className="grid grid-cols-1 gap-4 xl:gap-[30px]">
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
                    </Form>
                )}
            </Formik>
        </CommonSideModal>
    );
};

export default forwardRef(AdminOrganizationAddresses);
