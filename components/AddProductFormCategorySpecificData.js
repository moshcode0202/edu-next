import { Field, Form, Formik } from 'formik';
import React, { forwardRef, useImperativeHandle, useRef, useState } from 'react';
import CommonSideModal from './Common/CommonSideModal';
import * as Yup from 'yup';
import FieldButton from './Field/FieldButton';

const AddProductFormCategorySpecificData = ({ data, refresh, submit }, forwardedRef) => {
    const modal = useRef();
    const defaultParams = {
        publisher_name: '',
        publisher_id: '',
        contributor_1_name: '',
        contributor_1_role: '',
        contributor_1_id: '',
        contributor_2_name: '',
        contributor_2_role: '',
        contributor_2_id: '',
        contributor_3_name: '',
        contributor_3_role: '',
        contributor_3_id: '',
        contributors: '',
        series_name: '',
        series_number: '',
        series_id: '',
        abridged_edition: '',
        large_print: '',
        edition_number: '',
        edition_description: '',
        page_number: '',
        playing_time_in_minutes: '',
        illustrated: '',
        accessory: '',
        desirability: '',
        publishing_status: '',
        award_name_1: '',
        award_year_1: '',
        award_type_1: '',
        award_category_1: '',
        award_name_2: '',
        award_year_2: '',
        award_type_2: '',
        award_category_2: '',
        award_name_3: '',
        award_year_3: '',
        award_type_3: '',
        award_category_3: '',
        accelerated_reader_quiz_number: '',
        accelerated_reader_quiz_name: '',
        accelerated_reader_interest_level: '',
        accelerated_reader_reading_level: '',
        accelerated_reader_point_value: '',
    };
    const [params, setParams] = useState(defaultParams);

    useImperativeHandle(forwardedRef, () => ({
        open() {
            modal?.current?.open();
            console.log('categorymodelData', data);
            if (Object.keys(data).length) {
                setParams(() => {
                    return {
                        publisher_name: data.publisher_name || '',
                        publisher_id: data.publisher_id || '',
                        contributor_1_name: data.contributor_1_name || '',
                        contributor_1_role: data.contributor_1_role || '',
                        contributor_1_id: data.contributor_1_id || '',
                        contributor_2_name: data.contributor_2_name || '',
                        contributor_2_role: data.contributor_2_role || '',
                        contributor_2_id: data.contributor_2_id || '',
                        contributor_3_name: data.contributor_3_name || '',
                        contributor_3_role: data.contributor_3_role || '',
                        contributor_3_id: data.contributor_3_id || '',
                        contributors: data.contributors || '',
                        series_name: data.series_name || '',
                        series_number: data.series_number || '',
                        series_id: data.series_id || '',
                        abridged_edition: data.abridged_edition || '',
                        large_print: data.large_print || '',
                        edition_number: data.edition_number || '',
                        edition_description: data.edition_description || '',
                        page_number: data.page_number || '',
                        playing_time_in_minutes: data.playing_time_in_minutes || '',
                        illustrated: data.illustrated || '',
                        accessory: data.accessory || '',
                        desirability: data.desirability || '',
                        publishing_status: data.publishing_status || '',
                        award_name_1: data.award_name_1 || '',
                        award_year_1: data.award_year_1 || '',
                        award_type_1: data.award_type_1 || '',
                        award_category_1: data.award_category_1 || '',
                        award_name_2: data.award_name_2 || '',
                        award_year_2: data.award_year_2 || '',
                        award_type_2: data.award_type_2 || '',
                        award_category_2: data.award_category_2 || '',
                        award_name_3: data.award_name_3 || '',
                        award_year_3: data.award_year_3 || '',
                        award_type_3: data.award_type_3 || '',
                        award_category_3: data.award_category_3 || '',
                        accelerated_reader_quiz_number: data.accelerated_reader_quiz_number || '',
                        accelerated_reader_quiz_name: data.accelerated_reader_quiz_name || '',
                        accelerated_reader_interest_level: data.accelerated_reader_interest_level || '',
                        accelerated_reader_reading_level: data.accelerated_reader_reading_level || '',
                        accelerated_reader_point_value: data.accelerated_reader_point_value || '',
                    };
                });
            }
        },
        close() {
            modal?.current?.close();
        },
    }));

    const formHandler = async (values) => {
        await submit(values);
    };

    return (
        <CommonSideModal ref={modal}>
            <Formik initialValues={params} onSubmit={formHandler} enableReinitialize>
                {({ isSubmitting, submitCount, errors, values }) => (
                    <Form className="form">
                        {/* {console.log(values)} */}
                        <div className="flex h-screen flex-col justify-between">
                            <div className="relative space-y-4 xl:space-y-[30px]">
                                <h2 className="text-xl font-semibold">Book Specific Data</h2>
                                <div>
                                    <label className="form-label">Publisher Name</label>
                                    <Field
                                        name="publisher_name"
                                        type="text"
                                        className="form-input"
                                        placeholder="Publisher Name..."
                                    />
                                </div>
                                <div>
                                    <label className="form-label">Publisher Id</label>
                                    <Field
                                        name="publisher_id"
                                        type="text"
                                        className="form-input"
                                        placeholder="Publisher Id..."
                                    />
                                </div>
                                <div>
                                    <label className="form-label">Contributor 1 Name</label>
                                    <Field
                                        name="contributor_1_name"
                                        type="text"
                                        className="form-input"
                                        placeholder="Contributor 1 Name..."
                                    />
                                </div>
                                <div>
                                    <label className="form-label">Contributor 1 Role</label>
                                    <Field
                                        name="contributor_1_role"
                                        type="text"
                                        className="form-input"
                                        placeholder="Contributor 1 Name..."
                                    />
                                </div>
                                <div>
                                    <label className="form-label">Contributor 1 Id</label>
                                    <Field
                                        name="contributor_1_id"
                                        type="text"
                                        className="form-input"
                                        placeholder="Contributor 1 Id..."
                                    />
                                </div>
                                <div>
                                    <label className="form-label">Contributor 2 Name</label>
                                    <Field
                                        name="contributor_2_name"
                                        type="text"
                                        className="form-input"
                                        placeholder="Contributor 2 Name..."
                                    />
                                </div>
                                <div>
                                    <label className="form-label">Contributor 2 Role</label>
                                    <Field
                                        name="contributor_2_role"
                                        type="text"
                                        className="form-input"
                                        placeholder="Contributor 2 Name..."
                                    />
                                </div>
                                <div>
                                    <label className="form-label">Contributor 2 Id</label>
                                    <Field
                                        name="contributor_2_id"
                                        type="text"
                                        className="form-input"
                                        placeholder="Contributor 2 Id..."
                                    />
                                </div>
                                <div>
                                    <label className="form-label">Contributor 3 Name</label>
                                    <Field
                                        name="contributor_3_name"
                                        type="text"
                                        className="form-input"
                                        placeholder="Contributor 3 Name..."
                                    />
                                </div>
                                <div>
                                    <label className="form-label">Contributor 3 Role</label>
                                    <Field
                                        name="contributor_3_role"
                                        type="text"
                                        className="form-input"
                                        placeholder="Contributor 3 Name..."
                                    />
                                </div>
                                <div>
                                    <label className="form-label">Contributor 3 Id</label>
                                    <Field
                                        name="contributor_3_id"
                                        type="text"
                                        className="form-input"
                                        placeholder="Contributor 3 Id..."
                                    />
                                </div>
                                <div>
                                    <label className="form-label">Contributors</label>
                                    <Field
                                        name="contributors"
                                        type="text"
                                        className="form-input"
                                        placeholder="Contributors..."
                                    />
                                </div>
                                <div>
                                    <label className="form-label">Series Name</label>
                                    <Field
                                        name="series_name"
                                        type="text"
                                        className="form-input"
                                        placeholder="Series Name..."
                                    />
                                </div>
                                <div>
                                    <label className="form-label">Series Number</label>
                                    <Field
                                        name="series_number"
                                        type="text"
                                        className="form-input"
                                        placeholder="Series Number..."
                                    />
                                </div>
                                <div>
                                    <label className="form-label">Series Id</label>
                                    <Field
                                        name="series_id"
                                        type="text"
                                        className="form-input"
                                        placeholder="Series Id..."
                                    />
                                </div>
                                <div>
                                    <label className="form-label">Abridged Edition</label>
                                    <Field
                                        name="abridged_edition"
                                        type="text"
                                        className="form-input"
                                        placeholder="Abridged Edition..."
                                    />
                                </div>
                                <div>
                                    <label className="form-label">Large Print</label>
                                    <Field
                                        name="large_print"
                                        type=""
                                        className="form-input"
                                        placeholder="Large Print..."
                                    />
                                </div>
                                <div>
                                    <label className="form-label">Edition Number</label>
                                    <Field
                                        name="edition_number"
                                        type="text"
                                        className="form-input"
                                        placeholder="Edition Number..."
                                    />
                                </div>
                                <div>
                                    <label className="form-label">Edition Description</label>
                                    <Field
                                        name="edition_description"
                                        type="text"
                                        className="form-input"
                                        placeholder="Edition Description..."
                                    />
                                </div>
                                <div>
                                    <label className="form-label">Page Number</label>
                                    <Field
                                        name="page_number"
                                        type="number"
                                        className="form-input"
                                        placeholder="Page Number..."
                                    />
                                </div>
                                <div>
                                    <label className="form-label">Playing Time In Minutes</label>
                                    <Field
                                        name="playing_time_in_minutes"
                                        type="number"
                                        className="form-input"
                                        placeholder="Playing Time In Minutes..."
                                    />
                                </div>
                                <div>
                                    <label className="form-label">Illustrated</label>
                                    <Field
                                        name="illustrated"
                                        type="text"
                                        className="form-input"
                                        placeholder="Illustrated..."
                                    />
                                </div>
                                <div>
                                    <label className="form-label">Accessory</label>
                                    <Field
                                        name="accessory"
                                        type="text"
                                        className="form-input"
                                        placeholder="Accessory..."
                                    />
                                </div>
                                <div>
                                    <label className="form-label">Desirability</label>
                                    <Field
                                        name="desirability"
                                        type="text"
                                        className="form-input"
                                        placeholder="Desirability..."
                                    />
                                </div>
                                <div>
                                    <label className="form-label">Publishing Status</label>
                                    <Field
                                        name="publishing_status"
                                        type="text"
                                        className="form-input"
                                        placeholder="Publishing Status..."
                                    />
                                </div>
                                <div>
                                    <label className="form-label">Award Name 1</label>
                                    <Field
                                        name="award_name_1"
                                        type="text"
                                        className="form-input"
                                        placeholder="Award Name 1..."
                                    />
                                </div>
                                <div>
                                    <label className="form-label">Award Year 1</label>
                                    <Field
                                        name="award_year_1"
                                        type="text"
                                        className="form-input"
                                        placeholder="Award Year 1..."
                                    />
                                </div>
                                <div>
                                    <label className="form-label">Award Type 1</label>
                                    <Field
                                        name="award_type_1"
                                        type="text"
                                        className="form-input"
                                        placeholder="Award Type 1..."
                                    />
                                </div>
                                <div>
                                    <label className="form-label">Award Category 1</label>
                                    <Field
                                        name="award_category_1"
                                        type="text"
                                        className="form-input"
                                        placeholder="Award Category 1..."
                                    />
                                </div>
                                <div>
                                    <label className="form-label">Award Name 2</label>
                                    <Field
                                        name="award_name_2"
                                        type="text"
                                        className="form-input"
                                        placeholder="Award Name 2..."
                                    />
                                </div>
                                <div>
                                    <label className="form-label">Award Year 2</label>
                                    <Field
                                        name="award_year_2"
                                        type="text"
                                        className="form-input"
                                        placeholder="Award Year 2..."
                                    />
                                </div>
                                <div>
                                    <label className="form-label">Award Type 2</label>
                                    <Field
                                        name="award_type_2"
                                        type="text"
                                        className="form-input"
                                        placeholder="Award Type 2..."
                                    />
                                </div>
                                <div>
                                    <label className="form-label">Award Category 2</label>
                                    <Field
                                        name="award_category_2"
                                        type="text"
                                        className="form-input"
                                        placeholder="Award Category 2..."
                                    />
                                </div>
                                <div>
                                    <label className="form-label">Award Name 3</label>
                                    <Field
                                        name="award_name_3"
                                        type="text"
                                        className="form-input"
                                        placeholder="Award Name 3..."
                                    />
                                </div>
                                <div>
                                    <label className="form-label">Award Year 3</label>
                                    <Field
                                        name="award_year_3"
                                        type="text"
                                        className="form-input"
                                        placeholder="Award Year 3..."
                                    />
                                </div>
                                <div>
                                    <label className="form-label">Award Type 3</label>
                                    <Field
                                        name="award_type_3"
                                        type="text"
                                        className="form-input"
                                        placeholder="Award Type 3..."
                                    />
                                </div>
                                <div>
                                    <label className="form-label">Award Category 3</label>
                                    <Field
                                        name="award_category_3"
                                        type="text"
                                        className="form-input"
                                        placeholder="Award Category 3..."
                                    />
                                </div>
                                <div>
                                    <label className="form-label">Accelerated Reader Quiz Number</label>
                                    <Field
                                        name="accelerated_reader_quiz_number"
                                        type="text"
                                        className="form-input"
                                        placeholder="Accelerated Reader Quiz Number..."
                                    />
                                </div>
                                <div>
                                    <label className="form-label">Accelerated Reader Quiz Name</label>
                                    <Field
                                        name="accelerated_reader_quiz_name"
                                        type="text"
                                        className="form-input"
                                        placeholder="Accelerated Reader Quiz Name..."
                                    />
                                </div>
                                <div>
                                    <label className="form-label">Accelerated Reader Interest Level</label>
                                    <Field
                                        name="accelerated_reader_interest_level"
                                        type="text"
                                        className="form-input"
                                        placeholder="Accelerated Reader Interest Level..."
                                    />
                                </div>
                                <div>
                                    <label className="form-label">Accelerated Reader Reading Level</label>
                                    <Field
                                        name="accelerated_reader_reading_level"
                                        type="text"
                                        className="form-input"
                                        placeholder="Accelerated Reader Reading Level..."
                                    />
                                </div>
                                <div>
                                    <label className="form-label">Accelerated Reader Point Level</label>
                                    <Field
                                        name="accelerated_reader_point_value"
                                        type="text"
                                        className="form-input"
                                        placeholder="Accelerated Reader Point Level..."
                                    />
                                </div>
                                <div className="mt-5 text-right">
                                    <FieldButton loading={isSubmitting} type="submit" className="btn">
                                        Save
                                    </FieldButton>
                                </div>
                            </div>
                        </div>
                    </Form>
                )}
            </Formik>
        </CommonSideModal>
    );
};

export default forwardRef(AddProductFormCategorySpecificData);
