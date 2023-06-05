import { Field, Form, Formik } from 'formik';
import * as Yup from 'yup';
import CommonSideModal from '@/components/Common/CommonSideModal';
import { forwardRef, useImperativeHandle, useRef, useState } from 'react';
import IconQuestion from '@/components/Icon/IconQuestion';
import axios from '@/libs/axios';
import helper from '@/libs/helper';
import { useRouter } from 'next/router';
import FieldButton from './Field/FieldButton';

const OrganizationEdit = ({ data, refresh }, forwardedRef) => {
    const modal = useRef();
    const router = useRouter();

    const defaultParams = {
        name: '',
        short_name: '',
        slug: '',
        organization_id: '',
        web_domain: '',
        phone_prefix: '',
        phone: '',
        ico: '',
        type: '',
    };

    const [params, setParams] = useState(defaultParams);

    const validationSchema = Yup.object().shape({
        name: Yup.string().required('required'),
        short_name: Yup.string().required('required'),
        slug: Yup.string().required('required'),
        organization_id: Yup.string().required('required'),
        web_domain: Yup.string().required('required'),
        phone_prefix: Yup.string().required('required'),
        phone: Yup.string().required('required'),
        ico: Yup.string().required('required'),
        type: Yup.string().required('required'),
    });

    useImperativeHandle(forwardedRef, () => ({
        open() {
            modal?.current?.open();
            if (Object.keys(data).length) {
                setParams({ ...data });
            } else {
                setParams(defaultParams);
            }
        },
        close() {
            modal?.current?.close();
        },
    }));

    const formHandler = async (values) => {
        try {
            if (router.query.id) {
                const { data } = await axios.post(`/admin/organizations/${router.query.id}/basic-info/`, {
                    ...values,
                    phone: values.phone_prefix + values.phone,
                });
                modal?.current?.close();
                refresh();
            } else {
                const { data } = await axios.post('/admin/organizations/basic-info/', {
                    ...values,
                    phone: values.phone_prefix + values.phone,
                });
                modal?.current?.close();
                refresh();
            }
        } catch {}
    };

    return (
        <CommonSideModal ref={modal}>
            <Formik initialValues={params} onSubmit={formHandler} validationSchema={validationSchema}>
                {({ isSubmitting, submitCount, errors }) => (
                    <Form className="h-full">
                        <div className="flex h-full flex-col justify-between">
                            <div className="space-y-4 xl:space-y-[30px]">
                                <h2 className="text-xl font-semibold">{`${
                                    Object.keys(data).length ? 'Edit' : 'Add'
                                } Information`}</h2>

                                <h3 className="text-lg font-semibold text-black-dark">Information</h3>

                                <div className="space-y-5">
                                    <div className="grid gap-4 sm:grid-cols-2 xl:gap-[30px]">
                                        <div className={submitCount && errors.name && 'has-error'}>
                                            <label className="form-label">Organization Name</label>
                                            <Field
                                                name="name"
                                                type="text"
                                                className="form-input"
                                                placeholder="Organization Name..."
                                            />
                                        </div>

                                        <div className={submitCount && errors.short_name && 'has-error'}>
                                            <label className="form-label">Shortened Name</label>
                                            <Field
                                                name="short_name"
                                                type="text"
                                                className="form-input"
                                                placeholder="Shortened Name..."
                                            />
                                        </div>

                                        <div className={submitCount && errors.slug && 'has-error'}>
                                            <label className="form-label">Slug</label>
                                            <Field
                                                name="slug"
                                                type="text"
                                                className="form-input"
                                                placeholder="Slug..."
                                            />
                                        </div>

                                        <div className={submitCount && errors.type && 'has-error'}>
                                            <label className="form-label">Organization Type</label>
                                            <Field
                                                name="type"
                                                type="text"
                                                className="form-input"
                                                placeholder="Organization Type..."
                                            />
                                        </div>

                                        <div className={submitCount && errors.organization_id && 'has-error'}>
                                            <label className="form-label">Organisation ID</label>
                                            <Field
                                                name="organization_id"
                                                type="text"
                                                className="form-input"
                                                placeholder="Organisation ID..."
                                            />
                                        </div>

                                        <div className={submitCount && errors.web_domain && 'has-error'}>
                                            <label className="form-label inline-flex items-center gap-1">
                                                Organization Web Domain
                                                <span>
                                                    <IconQuestion />
                                                </span>
                                            </label>
                                            <Field
                                                name="web_domain"
                                                type="text"
                                                className="form-input"
                                                placeholder="Organization Web Domain..."
                                            />
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

                                        <div className={submitCount && errors.ico && 'has-error'}>
                                            <label className="form-label">In Care Of</label>
                                            <Field
                                                name="ico"
                                                type="text"
                                                className="form-input"
                                                placeholder="In Care Of..."
                                            />
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
        </CommonSideModal>
    );
};

export default forwardRef(OrganizationEdit);
