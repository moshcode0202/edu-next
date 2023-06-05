import { Form, Formik } from 'formik';
import CommonSideModal from '@/components/Common/CommonSideModal';
import { forwardRef, useImperativeHandle, useRef, useState } from 'react';
import { useRouter } from 'next/router';
import axios from '@/libs/axios';
import FieldButton from './Field/FieldButton';

const AdminOrganizationAge = ({ data, refresh }, forwardedRef) => {

    const organizationAges = [
        { id: '1', age: '4 and below' },
        { id: '2', age: '5' },
        { id: '3', age: '6' },
        { id: '4', age: '7' },
        { id: '5', age: '8' },
        { id: '6', age: '9' },
        { id: '7', age: '10' },
        { id: '8', age: '11' },
        { id: '9', age: '12' },
        { id: '10', age: '13' },
        { id: '11', age: '14' },
        { id: '12', age: '15' },
        { id: '13', age: '16' },
        { id: '14', age: '17' },
        { id: '15', age: '18' },
        { id: '16', age: '19 and older' },
    ];

    const modal = useRef();
    const router = useRouter();
    const [checkedAge, setCheckedAge] = useState([]);

    useImperativeHandle(forwardedRef, () => ({
        open() {
            if (data) {
            setCheckedAge([...data]);
            }
            modal?.current?.open();
        },
        close() {
            modal?.current?.close();
        },
    }));

    const formHandler = async () => {
        try {
            if (checkedAge.length) {
                const { data } = await axios.post(`admin/organizations/${router.query.id}/age-info`, {
                    age_suitability: checkedAge,
                });
                modal?.current?.close();
                refresh();
            }
        } catch {}
    };

    const changeOrganizationAge = (e) => {
        const value = e.target.value;
        const checked = e.target.checked;
        if (checked) {
            setCheckedAge([...checkedAge, value]);
        } else {
            setCheckedAge(checkedAge.filter((e) => e !== value));
        }
    };

    return (
        <CommonSideModal ref={modal}>
            <Formik initialValues={checkedAge} onSubmit={formHandler}>
                {({ isSubmitting }) => (
                    <Form className="h-full">
                        <div className="flex h-full flex-col justify-between">
                            <div className="space-y-4 xl:space-y-[30px]">
                                <h2 className="text-xl font-semibold">Edit Age Suitability</h2>
                                <h3 className="text-lg font-semibold text-black-dark">Age Suitability</h3>
                                <div role="group" className="grid gap-2.5  sm:grid-cols-2">
                                    {organizationAges.map((age) => {
                                        return (
                                            <label
                                                key={age.id}
                                                className="form-label inline-flex cursor-pointer items-center gap-2"
                                            >
                                                <input
                                                    name="checked"
                                                    type="checkbox"
                                                    value={age.id}
                                                    className="form-checkbox"
                                                    checked={checkedAge.includes(age.id)}
                                                    onChange={changeOrganizationAge}

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
