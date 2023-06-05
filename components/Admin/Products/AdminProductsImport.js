import { Field, Form, Formik } from 'formik';
import * as Yup from 'yup';
import CommonSideModal from '@/components/Common/CommonSideModal';
import { forwardRef, useImperativeHandle, useRef } from 'react';
import FieldButton from '@/components/Field/FieldButton';

const AdminProductsImport = (props, forwardedRef) => {
    const modal = useRef();
    const params = { import_type: '', file: null };

    const validationSchema = Yup.object().shape({
        import_type: Yup.string().required('required'),
        file: Yup.mixed().required('required'),
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
        console.log(values);
    };

    return (
        <CommonSideModal ref={modal}>
            <Formik initialValues={params} onSubmit={formHandler} validationSchema={validationSchema}>
                {({ isSubmitting, submitCount, errors, setFieldValue }) => (
                    <Form className="h-full">
                        <div className="flex h-full flex-col justify-between">
                            <div className="space-y-4 xl:space-y-[30px]">
                                <h2 className="text-xl font-semibold">Import Products</h2>

                                <div className={submitCount && errors.import_type && 'has-error'}>
                                    <label className="form-label">Import Type</label>
                                    <Field as="select" name="import_type" className="form-select mb-1">
                                        <option value="">Import Type...</option>
                                        <option value="Import1">Import1</option>
                                        <option value="Import2">Import2</option>
                                        <option value="Import3">Import3</option>
                                    </Field>
                                    <p className="text-sm italic text-black-dark">This is some upload information.</p>
                                </div>

                                <div>
                                    <input
                                        className={`block w-full cursor-pointer text-sm text-black file:mr-4 file:rounded file:border file:border-primary file:bg-primary/10 file:py-2 file:px-3 file:text-sm file:font-semibold hover:file:bg-primary/20 ${
                                            submitCount && errors.file && 'file:border-danger file:bg-danger/10'
                                        }`}
                                        type="file"
                                        onChange={(event) => {
                                            setFieldValue('file', event.currentTarget.files[0]);
                                        }}
                                    />
                                </div>
                            </div>
                            <div className="mt-5 text-right">
                                <FieldButton loading={isSubmitting} type="submit" className="btn" onClick={()=>modal?.current?.close()}>
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

export default forwardRef(AdminProductsImport);
