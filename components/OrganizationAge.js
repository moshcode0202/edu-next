import { Form, Formik } from 'formik';
import CommonSideModal from '@/components/Common/CommonSideModal';
import { forwardRef, useImperativeHandle, useRef, useState } from 'react';
import { useRouter } from 'next/router';
import helper from '@/libs/helper';
import axios from '@/libs/axios';
import FieldButton from './Field/FieldButton';

const AdminOrganizationAge = (props, forwardedRef) => {
    const modal = useRef();
    const router = useRouter();
    const [checked, setChecked] = useState([]);

    useImperativeHandle(forwardedRef, () => ({
        open() {
            if (props.data) {
                setChecked([...props.data]);
            }
            modal?.current?.open();
        },
        close() {
            modal?.current?.close();
        },
    }));

    const formHandler = async () => {
        if (checked.length) {
            const { data } = await axios.post(`admin/organizations/${router.query.id}/age-info`, {
                age_suitability: checked,
            });
            if (data.data) {
                modal?.current?.close();
                props.refresh();
            }
        }
    };

    return (
        <CommonSideModal ref={modal}>
            <Formik initialValues={checked} onSubmit={formHandler}>
                {({ isSubmitting, submitCount, errors, arrayHelpers }) => (
                    <Form className="h-full">
                        <div className="flex h-full flex-col justify-between">
                            <div className="space-y-4 xl:space-y-[30px]">
                                <h2 className="text-xl font-semibold">Edit Age Suitability</h2>
                                <h3 className="text-lg font-semibold text-black-dark">Age Suitability</h3>
                                <div role="group" className="grid gap-2.5  sm:grid-cols-2">
                                    {helper.getOrganizationAges().map((age) => {
                                        return (
                                            <label
                                                key={age.value}
                                                className="form-label inline-flex cursor-pointer items-center gap-2"
                                            >
                                                <input
                                                    name="checked"
                                                    type="checkbox"
                                                    id={age.value}
                                                    value={age.value}
                                                    className="form-checkbox"
                                                    checked={checked.includes(age.value)}
                                                    onChange={(e) => {
                                                        if (checked.includes(age.value)) {
                                                            setChecked((value) => value.filter((d) => d !== age.value));
                                                        } else {
                                                            setChecked([...checked, age.value]);
                                                        }
                                                    }}
                                                />
                                                {age.age}
                                            </label>
                                        );
                                    })}
                                </div>
                            </div>
                            <div className="mt-5 text-right">
                                <FieldButton loading={isSubmitting} type="submit" className="btn">
                                    Import
                                </FieldButton>
                            </div>
                        </div>
                    </Form>
                )}
            </Formik>
        </CommonSideModal>
    );
};

export default forwardRef(AdminOrganizationAge);
