import IconTrash from '@/components/Icon/IconTrash';
import IconUpload from '@/components/Icon/IconUpload';
import Link from 'next/link';
import { Field, Form, Formik } from 'formik';
import React, { forwardRef, useRef, useState, useEffect } from 'react';
import * as Yup from 'yup';
import IconDown from './Icon/IconDown';
import Dropdown from './Dropdown';
import axios from '@/libs/axios';
import { useRouter } from 'next/router';
import Header from '@/components/Layout/Header';
import IconArrowleft from '@/components/Icon/IconArrowleft';
import dynamic from 'next/dynamic';
import 'react-quill/dist/quill.snow.css';
import IconClose from './Icon/IconClose';
import helper from '@/libs/helper';
import toast from '@/libs/toast';
import AddProductFormMetaData from './AddProductFormMetaData';
import AddProductFormCategorySpecificData from './AddProductFormCategorySpecificData';
const ReactQuill = dynamic(import('react-quill'), { ssr: false });
// import ReactQuill from 'react-quill';

const defaultParams = {
    title: '',
    slug: '',
    status: '',
    price: '',
    is_taxable: '',
    skip_description_update: '',
    skip_title_update: '',
    product_suitability_age: '',
    sin: '',
    inventory_quantity: '',
    package_measurement_type: '',
    product_measurement_type: '',
    product_weight: '',
    package_height: '',
    package_length: '',
    package_width: '',
    returnable_time_period_days: '',
    ship_lead_time_period_days: '',
    categories: '',

    explicit_content: '',
    parent_id: '',
    option1_name: '',
    option1_value: '',
    option2_name: '',
    option2_value: '',

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

const AddProductForm = ({ button }, forwardedRef) => {
    const modalMetaData = useRef();
    const modalCategorySpecificData = useRef();

    const organizationAges = [
        { grade_key: 'pk', grade_title: 'Pre-Kindergarten', age: '4 and below', value: '1' },
        { grade_key: 'k', grade_title: 'Kindergarten', age: '5', value: '2' },
        { grade_key: '1', grade_title: '1st Grade', age: '6', value: '3' },
        { grade_key: '2', grade_title: '2nd Grade', age: '7', value: '4' },
        { grade_key: '3', grade_title: '3rd Grade', age: '8', value: '5' },
        { grade_key: '4', grade_title: '4th Grade', age: '9', value: '6' },
        { grade_key: '5', grade_title: '5th Grade', age: '10', value: '7' },
        { grade_key: '6', grade_title: '6th Grade', age: '11', value: '8' },
        { grade_key: '7', grade_title: '7th Grade', age: '12', value: '9' },
        { grade_key: '8', grade_title: '8th Grade', age: '13', value: '10' },
        { grade_key: '9', grade_title: '9th Grade', age: '14', value: '11' },
        { grade_key: '10', grade_title: '10th Grade', age: '15', value: '12' },
        { grade_key: '11', grade_title: '11th Grade', age: '16', value: '13' },
        { grade_key: '12', grade_title: '12th Grade', age: '17', value: '14' },
        { grade_key: 'ec', grade_title: 'Early College', age: '18', value: '15' },
        { grade_key: 'ae', grade_title: 'Adult Education', age: '19 and older', value: '16' },
    ];
    const validationSchema = Yup.object().shape({
        title: Yup.string().required('required'),
        slug: Yup.string().required('required'),
        status: Yup.string().required('required'),
        price: Yup.string().required('required'),
        is_taxable: Yup.string().required('required'),
        // product_suitability_age: Yup.string().required('required'),
        sin: Yup.string().required('required'),
        inventory_quantity: Yup.string().required('required'),
        package_measurement_type: Yup.string().required('required'),
        product_measurement_type: Yup.string().required('required'),
        product_weight: Yup.string().required('required'),
        package_height: Yup.string().required('required'),
        package_length: Yup.string().required('required'),
        package_width: Yup.string().required('required'),
        returnable_time_period_days: Yup.string().required('required'),
        ship_lead_time_period_days: Yup.string().required('required'),
        // categories: Yup.string().required('required'),
    });

    const [params, setParams] = useState(defaultParams);

    const ref = useRef();
    const imageRef = useRef();
    const videoRef = useRef();
    const router = useRouter();

    const [search, setSearch] = useState('');
    const [categories, setCategories] = useState([]);

    const [checkedAge, setCheckedAge] = useState([]);
    const [checkedCategory, setCheckedCategory] = useState([]);

    const [sinNumber, setSinNumber] = useState();
    const [descriptionData, setDescriptionData] = useState('');

    const [uploadImages, setUploadImages] = useState([]);
    const [uploadvideos, setUploadVideos] = useState([]);

    const [selectedImage, setSelectedImage] = useState([]);
    const [selectedVideo, setSelectedVideo] = useState([]);

    // const defaultMetaData = {
    //     explicit_content: '',
    //     parent_id: '',
    //     option1_name: '',
    //     option1_value: '',
    //     option2_name: '',
    //     option2_value: '',
    //     explicit_content: '',
    // };

    const [metaFormData, setMetaFormData] = useState(defaultParams);
    const [categorySpecificData, setCategorySpecificData] = useState(defaultParams);

    useEffect(() => {
        getData();
    }, [router]);
    // const defaultCategorySpecificData = {
    //     publisher_name: '',
    //     publisher_id: '',
    //     contributor_1_name: '',
    //     contributor_1_role: '',
    //     contributor_1_id: '',
    //     contributor_2_name: '',
    //     contributor_2_role: '',
    //     contributor_2_id: '',
    //     contributor_3_name: '',
    //     contributor_3_role: '',
    //     contributor_3_id: '',
    //     contributors: '',
    //     series_name: '',
    //     series_number: '',
    //     series_id: '',
    //     abridged_edition: '',
    //     large_print: '',
    //     edition_number: '',
    //     edition_description: '',
    //     page_number: '',
    //     playing_time_in_minutes: '',
    //     illustrated: '',
    //     accessory: '',
    //     desirability: '',
    //     publishing_status: '',
    //     award_name_1: '',
    //     award_year_1: '',
    //     award_type_1: '',
    //     award_category_1: '',
    //     award_name_2: '',
    //     award_year_2: '',
    //     award_type_2: '',
    //     award_category_2: '',
    //     award_name_3: '',
    //     award_year_3: '',
    //     award_type_3: '',
    //     award_category_3: '',
    //     accelerated_reader_quiz_number: '',
    //     accelerated_reader_quiz_name: '',
    //     accelerated_reader_interest_level: '',
    //     accelerated_reader_reading_level: '',
    //     accelerated_reader_point_value: '',
    // };

    const getData = async () => {
        try {
            if (router.query.id) {
                const { data } = await axios.get(`/admin/products/${router.query.id}`);
                setParams(() => {
                    return {
                        title: data.title,
                        slug: data.slug,
                        status: data.status,
                        price: data.price,
                        is_taxable: !!data.is_taxable,
                        skip_description_update: !!data.skip_description_update,
                        skip_title_update: !!data.skip_title_update,
                        product_suitability_age: data.product_suitability_ages,
                        sin: data.sin,
                        description: data.description,
                        images: data.images,
                        videos: data.videos,
                        images_array: data.images_array,
                        videos_array: data.videos_array,
                        inventory_quantity: data.inventory_quantity,
                        package_measurement_type: data.package_measurement_type,
                        product_measurement_type: data.product_measurement_type,
                        product_weight: data.product_weight,
                        package_height: data.package_height,
                        package_length: data.package_length,
                        package_width: data.package_width,
                        returnable_time_period_days: data.returnable_time_period_days,
                        ship_lead_time_period_days: data.ship_lead_time_period_days,
                        categories: data.categories,

                        parent_id: data.parent_id,
                        explicit_content: data.explicit_content,
                        option1_name: data.option1_name,
                        option1_value: data.option1_value,
                        option2_name: data.option2_name,
                        option2_value: data.option2_value,

                        publisher_name: data.publisher_name,
                        publisher_id: data.publisher_id,
                        contributor_1_name: data.contributor_1_name,
                        contributor_1_role: data.contributor_1_role,
                        contributor_1_id: data.contributor_1_id,
                        contributor_2_name: data.contributor_2_name,
                        contributor_2_role: data.contributor_2_role,
                        contributor_2_id: data.contributor_2_id,
                        contributor_3_name: data.contributor_3_name,
                        contributor_3_role: data.contributor_3_role,
                        contributor_3_id: data.contributor_3_id,
                        contributors: data.contributors,
                        series_name: data.series_name,
                        series_number: data.series_number,
                        series_id: data.series_id,
                        abridged_edition: data.abridged_edition,
                        large_print: data.large_print,
                        edition_number: data.edition_number,
                        edition_description: data.edition_description,
                        page_number: data.page_number,
                        playing_time_in_minutes: data.playing_time_in_minutes,
                        illustrated: data.illustrated,
                        accessory: data.accessory,
                        desirability: data.desirability,
                        publishing_status: data.publishing_status,
                        award_name_1: data.award_name_1,
                        award_year_1: data.award_year_1,
                        award_type_1: data.award_type_1,
                        award_category_1: data.award_category_1,
                        award_name_2: data.award_name_2,
                        award_year_2: data.award_year_2,
                        award_type_2: data.award_type_2,
                        award_category_2: data.award_category_2,
                        award_name_3: data.award_name_3,
                        award_year_3: data.award_year_3,
                        award_type_3: data.award_type_3,
                        award_category_3: data.award_category_3,
                        accelerated_reader_quiz_number: data.accelerated_reader_quiz_number,
                        accelerated_reader_quiz_name: data.accelerated_reader_quiz_name,
                        accelerated_reader_interest_level: data.accelerated_reader_interest_level,
                        accelerated_reader_reading_level: data.accelerated_reader_reading_level,
                        accelerated_reader_point_value: data.accelerated_reader_point_value,
                    };
                });
                setCheckedCategory(data.categories);
                setCheckedAge(data.product_suitability_ages);
                setSinNumber(data.sin);
                setDescriptionData(data.description);
                setUploadImages(data.images_array);
                setUploadVideos(data.videos_array);
            }
        } catch {}
    };
    useEffect(() => {
        categoryData();
    }, [search]);

    const formHandler = async (values) => {
        console.log(values);
        // for (const item of formData) {
        //     formData.append('categories[]', checkedAge.map((age)=>age.value));
        // }
        const formData = new FormData();
        checkedCategory.map((d) => {
            formData.append('categories[]', d.id);
        });
        checkedAge.map((d) => {
            formData.append('product_suitability_age[]', d.value);
        });

        uploadImages.map((d) => {
            formData.append('old_images[]', d);
        });
        selectedImage.map((d) => {
            formData.append('images[]', d);
        });
        selectedVideo.map((d) => {
            formData.append('videos[]', d);
        });
        uploadvideos.map((d) => {
            formData.append('old_videos[]', d);
        });
        formData.append('status', values.status.toString());
        formData.append('description', descriptionData);
        formData.append('title', values.title);
        formData.append('slug', values.slug);
        formData.append('price', values.price);
        formData.append('is_taxable', values.is_taxable);
        formData.append('skip_description_update', values.skip_description_update);
        formData.append('skip_title_update', values.skip_title_update);
        formData.append('sin', values.sin);
        formData.append('inventory_quantity', values.inventory_quantity);
        formData.append('package_measurement_type', values.package_measurement_type);
        formData.append('product_measurement_type', values.product_measurement_type);
        formData.append('product_weight', values.product_weight);
        formData.append('package_height', values.package_height);
        formData.append('package_width', values.package_width);
        formData.append('package_length', values.package_length);
        formData.append('returnable_time_period_days', values.returnable_time_period_days);
        formData.append('ship_lead_time_period_days', values.ship_lead_time_period_days);
        try {
            if (router.query.id) {
                const { data } = await axios.post(`/admin/products/${router.query.id}/update`, formData);
            } else {
                const { data } = await axios.post('/admin/products', formData);
                router.push('/admin/products');
            }
        } catch {}
    };

    const changeOrganizationAge = (e, age) => {
        if (e.target.checked) {
            setCheckedAge([...checkedAge, { age: age.age, value: age.value }]);
        } else {
            setCheckedAge(checkedAge.filter((e) => e.value !== age.value));
        }
    };

    const changeCategory = (e, category) => {
        const checked = e.target.checked;

        if (checked) {
            setCheckedCategory([...checkedCategory, { id: category.id, name: category.name }]);
        } else {
            setCheckedCategory(checkedCategory.filter((e) => e.id !== category.id));
        }
    };

    const categoryData = async () => {
        try {
            const { data } = await axios.get('/admin/categories/', {
                params: {
                    filter: search,
                },
            });
            setCategories(data.data);
        } catch {}
    };

    const handleImageChange = (e) => {
        const selectedFile = e.target.files[0].size;
        const fileSizeInMegabytes = selectedFile / (1024 * 1024);
        if (fileSizeInMegabytes > 2) {
            toast.error('Selected file is too large. Maximum allowed size is 2 MB.');
        } else {
            setSelectedImage([...selectedImage, e.target.files[0]]);
        }
    };

    const handleVideoChange = (e) => {
        const selectedFile = e.target.files[0].size;
        const fileSizeInMegabytes = selectedFile / (1024 * 1024);
        if (fileSizeInMegabytes > 10) {
            toast.error('Selected file is too large. Maximum allowed size is 10 MB.');
        } else {
            setSelectedVideo([...selectedVideo, e.target.files[0]]);
        }
    };

    const metaFormSubmit = async (values) => {
        const { data } = await axios.post(`/admin/products/${router.query.id}/meta-update`, {
            parent_id: values.parent_id,
            explicit_content: values.explicit_content,
            option1_name: values.option1_name,
            option1_value: values.option1_value,
            option2_name: values.option2_name,
            option2_value: values.option2_value,
        });
        modalMetaData.current.close();
        getData();
    };
    const categorySpecificFormSubmit = async (values) => {
        const { data } = await axios.post(`/admin/products/${router.query.id}/category-specified-update`, {
            publisher_name: values.publisher_name,
            publisher_id: values.publisher_id,
            contributor_1_name: values.contributor_1_name,
            contributor_1_role: values.contributor_1_role,
            contributor_1_id: values.contributor_1_id,
            contributor_2_name: values.contributor_2_name,
            contributor_2_role: values.contributor_2_role,
            contributor_2_id: values.contributor_2_id,
            contributor_3_name: values.contributor_3_name,
            contributor_3_role: values.contributor_3_role,
            contributor_3_id: values.contributor_3_id,
            contributors: values.contributors,
            series_name: values.series_name,
            series_number: values.series_number,
            series_id: values.series_id,
            abridged_edition: values.abridged_edition,
            large_print: values.large_print,
            edition_number: values.edition_number,
            edition_description: values.edition_description,
            page_number: values.page_number,
            playing_time_in_minutes: values.playing_time_in_minutes,
            illustrated: values.illustrated,
            accessory: values.accessory,
            desirability: values.desirability,
            publishing_status: values.publishing_status,
            award_name_1: values.award_name_1,
            award_year_1: values.award_year_1,
            award_type_1: values.award_type_1,
            award_category_1: values.award_category_1,
            award_name_2: values.award_name_2,
            award_year_2: values.award_year_2,
            award_type_2: values.award_type_2,
            award_category_2: values.award_category_2,
            award_name_3: values.award_name_3,
            award_year_3: values.award_year_3,
            award_type_3: values.award_type_3,
            award_category_3: values.award_category_3,
            accelerated_reader_quiz_number: values.accelerated_reader_quiz_number,
            accelerated_reader_quiz_name: values.accelerated_reader_quiz_name,
            accelerated_reader_interest_level: values.accelerated_reader_interest_level,
            accelerated_reader_reading_level: values.accelerated_reader_reading_level,
            accelerated_reader_point_value: values.accelerated_reader_point_value,
        });
        modalCategorySpecificData.current.close();
        getData();
    };

    return (
        <>
            <Header
                title={
                    <>
                        <li className="font-semibold text-primary">
                            <Link href="/admin/products" className="hover:text-primary/80">
                                Products
                            </Link>
                        </li>

                        <li>{sinNumber ? `/${sinNumber}` : ' /Add'}</li>
                    </>
                }
                action={
                    <>
                        <div className="flex items-center gap-1 sm:gap-3">
                            <button type="button" className="rotate-180 hover:text-black-dark">
                                <IconArrowleft />
                            </button>

                            <button type="button" className="hover:text-black-dark">
                                <IconArrowleft />
                            </button>
                        </div>

                        <button
                            type="submit"
                            className="btn"
                            onClick={() => {
                                ref.current.handleSubmit();
                            }}
                        >
                            {button}
                        </button>
                    </>
                }
            ></Header>

            <div className="p-4 lg:p-10 lg:pt-[45px]">
                <Formik
                    initialValues={params}
                    onSubmit={formHandler}
                    validationSchema={validationSchema}
                    enableReinitialize
                    innerRef={ref}
                >
                    {({ isSubmitting, submitCount, errors, values }) => (
                        <Form className="form">
                            {/* {console.log(values)} */}
                            <div className="mt-5 text-right">
                                {/* <FieldButton loading={isSubmitting} type="button" className="btn" >
                                    {button}
                                </FieldButton> */}
                            </div>
                            <div className="flex flex-col gap-4 md:flex-row xl:gap-[30px]">
                                <div className="flex-1 space-y-4 xl:space-y-[30px]">
                                    <div className="grid gap-4 xl:grid-cols-2 xl:gap-x-5 xl:gap-y-[30px]">
                                        <div className={submitCount && errors.title && 'has-error'}>
                                            <label className="form-label">Title</label>
                                            <Field
                                                type="text"
                                                className="form-input"
                                                placeholder="Title..."
                                                name="title"
                                            />
                                        </div>

                                        <div className={submitCount && errors.slug && 'has-error'}>
                                            <label className="form-label">Slug</label>
                                            <Field
                                                type="text"
                                                className="form-input"
                                                placeholder="Slug..."
                                                name="slug"
                                            />
                                        </div>

                                        <div className="0 xl:col-span-2">
                                            <label className="form-label">WYSIWYG Description</label>
                                            <ReactQuill
                                                className="min-h-[100px]"
                                                placeholder="WYSIWYG Description..."
                                                value={descriptionData}
                                                onChange={setDescriptionData}
                                            />
                                        </div>
                                    </div>

                                    <h2 className="text-lg font-semibold text-black-dark">Media</h2>

                                    <div className={submitCount && errors.images && 'has-error'}>
                                        <div className="mb-2 flex items-center justify-between">
                                            <label className="form-label">Images</label>
                                            {uploadImages.length > 0 || selectedImage.length > 0 ? (
                                                <button
                                                    type="button"
                                                    className="flex items-center justify-items-end text-sm hover:text-primary hover:underline"
                                                    onClick={() => imageRef.current.click()}
                                                >
                                                    <IconUpload className="mr-2 h-3.5 w-3.5" />
                                                    Add More Images
                                                </button>
                                            ) : (
                                                ''
                                            )}
                                        </div>

                                        <div className="mb-2.5 flex w-full items-center justify-center">
                                            <label
                                                htmlFor="dropzone-file"
                                                className="2 flex min-h-[123px] w-full cursor-pointer flex-col items-center justify-center rounded-[3px] border border-dashed border-white-light bg-white shadow-[0_4px_4px_rgba(0,0,0,0.05)] duration-300 "
                                                onClick={() => {
                                                    if (uploadImages.length === 0 && selectedImage.length === 0) {
                                                        imageRef.current.click();
                                                    }
                                                }}
                                            >
                                                {uploadImages.length > 0 || selectedImage.length > 0 ? (
                                                    <div className="grid w-full grid-cols-1 gap-5 p-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 xl:grid-cols-7">
                                                        {uploadImages.length > 0 &&
                                                            uploadImages.map((imageSrc, i) => (
                                                                <div className="group relative" key={i}>
                                                                    <img
                                                                        className="h-24 w-full object-cover shadow-sm"
                                                                        src={helper.getSignedUrl(imageSrc)}
                                                                        alt="not found"
                                                                    />

                                                                    <button
                                                                        type="button"
                                                                        className="absolute -top-2 -right-2 hidden rounded-full bg-danger/20 p-0.5 text-danger group-hover:block"
                                                                        onClick={() => {
                                                                            setUploadImages(
                                                                                uploadImages.filter(
                                                                                    (img) => img !== imageSrc
                                                                                )
                                                                            );
                                                                        }}
                                                                    >
                                                                        <IconClose className="h-4 w-4" />
                                                                    </button>
                                                                </div>
                                                            ))}
                                                        {selectedImage.length > 0 &&
                                                            selectedImage.map((imgSrc, i) => (
                                                                <div key={i}>
                                                                    <img
                                                                        className="h-24 w-full object-cover shadow-sm"
                                                                        src={URL.createObjectURL(imgSrc)}
                                                                        alt="not found"
                                                                    />
                                                                    <button
                                                                        type="button"
                                                                        className="absolute -top-2 -right-2 hidden rounded-full bg-danger/20 p-0.5 text-danger group-hover:block"
                                                                        onClick={() => {
                                                                            setSelectedImage(
                                                                                selectedImage.filter(
                                                                                    (img) => img !== imgSrc
                                                                                )
                                                                            );
                                                                        }}
                                                                    >
                                                                        <IconClose className="h-4 w-4" />
                                                                    </button>
                                                                </div>
                                                            ))}
                                                    </div>
                                                ) : (
                                                    <div className="flex flex-col items-center justify-center gap-2.5 text-primary">
                                                        <div className="flex items-center justify-center opacity-50">
                                                            <IconUpload />
                                                        </div>
                                                        <p className="font-semibold">Upload image(s)</p>
                                                    </div>
                                                )}
                                            </label>
                                            <input
                                                ref={imageRef}
                                                // id="dropzone-file"
                                                type="file"
                                                className="hidden"
                                                name="images"
                                                accept="image/jpg,image/jpeg,image/png"
                                                onChange={handleImageChange}
                                                multiple
                                            />
                                        </div>
                                        <p className="text-sm italic text-black-dark">
                                            This is some upload information.
                                        </p>
                                    </div>

                                    <div className={submitCount && errors.videos && 'has-error'}>
                                        <div className="mb-2 flex items-center justify-between">
                                            <label className="form-label">Videos</label>
                                            {uploadvideos.length > 0 || selectedVideo.length > 0 ? (
                                                <button
                                                    type="button"
                                                    className="flex items-center justify-items-end text-sm hover:text-primary hover:underline"
                                                    onClick={() => videoRef.current.click()}
                                                >
                                                    <IconUpload className="mr-2 h-3.5 w-3.5" />
                                                    Add More videos
                                                </button>
                                            ) : (
                                                ''
                                            )}
                                        </div>
                                        <div className="mb-2.5 flex w-full items-center justify-center">
                                            <label
                                                htmlFor="dropzone-file-videos"
                                                className="flex h-[123px] w-full cursor-pointer flex-col items-center justify-center rounded-[3px] border border-dashed border-white-light bg-white shadow-[0_4px_4px_rgba(0,0,0,0.05)] duration-300"
                                                onClick={() => {
                                                    if (uploadvideos.length === 0 && selectedVideo.length === 0) {
                                                        videoRef.current.click();
                                                    }
                                                }}
                                            >
                                                <div className="flex flex-col items-center justify-center gap-2.5 text-primary">
                                                    {uploadvideos.length > 0 || selectedVideo.length > 0 ? (
                                                        <div className="grid w-full grid-cols-1 gap-5 p-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 xl:grid-cols-7">
                                                            {uploadvideos.length > 0 &&
                                                                uploadvideos.map((videoSrc, i) => (
                                                                    <div className="group relative" key={i}>
                                                                        <video
                                                                            width=""
                                                                            height=""
                                                                            className="h-24 w-full object-cover shadow-sm"
                                                                            controls
                                                                        >
                                                                            <source
                                                                                src={helper.getSignedUrl(videoSrc)}
                                                                                type="video/mp4"
                                                                            ></source>
                                                                        </video>

                                                                        <button
                                                                            type="button"
                                                                            className="absolute -top-2 -right-2 hidden rounded-full bg-danger/20 p-0.5 text-danger group-hover:block"
                                                                            onClick={() => {
                                                                                setUploadVideos(
                                                                                    uploadvideos.filter(
                                                                                        (video) => video !== videoSrc
                                                                                    )
                                                                                );
                                                                            }}
                                                                        >
                                                                            <IconClose className="h-4 w-4" />
                                                                        </button>
                                                                    </div>
                                                                ))}
                                                            {selectedVideo.length > 0 &&
                                                                selectedVideo.map((videoSrc, i) => (
                                                                    <div className="group relative" key={i}>
                                                                        <video
                                                                            width=""
                                                                            height=""
                                                                            className="h-24 w-full object-cover shadow-sm"
                                                                            controls
                                                                        >
                                                                            <source
                                                                                src={URL.createObjectURL(videoSrc)}
                                                                                type="video/mp4"
                                                                            ></source>
                                                                        </video>

                                                                        <button
                                                                            type="button"
                                                                            className="absolute -top-2 -right-2 hidden rounded-full bg-danger/20 p-0.5 text-danger group-hover:block"
                                                                            onClick={() => {
                                                                                setSelectedVideo(
                                                                                    selectedVideo.filter(
                                                                                        (video) => video !== videoSrc
                                                                                    )
                                                                                );
                                                                            }}
                                                                        >
                                                                            <IconClose className="h-4 w-4" />
                                                                        </button>
                                                                    </div>
                                                                ))}
                                                        </div>
                                                    ) : (
                                                        <div>
                                                            <div className="flex items-center justify-center opacity-50">
                                                                <IconUpload />
                                                            </div>
                                                            <p className="font-semibold">Upload video(s)</p>
                                                        </div>
                                                    )}
                                                </div>
                                            </label>
                                            <input
                                                // id="dropzone-file-videos"
                                                ref={videoRef}
                                                type="file"
                                                className="hidden"
                                                name="videos"
                                                accept="video/mp4"
                                                onChange={handleVideoChange}
                                                multiple
                                            />
                                        </div>
                                        <p className="text-sm italic text-black-dark">
                                            This is some upload information.
                                        </p>
                                    </div>

                                    <h2 className="text-lg font-semibold text-black-dark">Pricing</h2>

                                    <div className="grid gap-4 xl:grid-cols-2 xl:gap-x-5 xl:gap-y-[30px]">
                                        <div className={submitCount && errors.price && 'has-error'}>
                                            <div className="mb-4">
                                                <label className="form-label">Price</label>
                                                <Field
                                                    type="number"
                                                    className="form-input"
                                                    placeholder="Price..."
                                                    name="price"
                                                />
                                            </div>

                                            <label className="text-sm">
                                                <Field
                                                    type="checkbox"
                                                    className="form-checkbox mr-2.5"
                                                    name="is_taxable"
                                                />
                                                Charge tax on this product
                                            </label>
                                        </div>
                                    </div>

                                    <h2 className="text-lg font-semibold text-black-dark">Inventory</h2>

                                    <div className="grid gap-4 xl:grid-cols-2 xl:gap-x-5 xl:gap-y-[30px]">
                                        <div className={submitCount && errors.sin && 'has-error'}>
                                            <label className="form-label">SIN</label>
                                            <Field type="text" className="form-input" placeholder="SIN..." name="sin" />
                                        </div>

                                        <div></div>

                                        <div className={submitCount && errors.inventory_quantity && 'has-error'}>
                                            <label className="form-label">Inventory Quantity</label>
                                            <Field
                                                type="number"
                                                className="form-input"
                                                placeholder="Inventory Quantity..."
                                                name="inventory_quantity"
                                                min="0"
                                            />
                                        </div>
                                    </div>

                                    <h2 className="text-lg font-semibold text-black-dark">Shipping</h2>

                                    <div className="grid gap-4 xl:grid-cols-2 xl:gap-x-5 xl:gap-y-[30px]">
                                        <div className={submitCount && errors.product_weight && 'has-error'}>
                                            <label className="form-label">Weight</label>
                                            <Field
                                                type="number"
                                                className="form-input"
                                                placeholder="Weight..."
                                                name="product_weight"
                                                min="0"
                                            />
                                        </div>

                                        <div className={submitCount && errors.product_measurement_type && 'has-error'}>
                                            <label className="form-label">Weight Measurement</label>
                                            <Field as="select" className="form-select" name="product_measurement_type">
                                                <option>Weight Measurement...</option>
                                                <option value="G">G</option>
                                                <option value="KG">KG</option>
                                                <option value="MLOZ">MLOZ</option>
                                                <option value="LB">LB</option>
                                            </Field>
                                        </div>

                                        <div className="grid grid-cols-3 gap-2">
                                            <div className={submitCount && errors.package_width && 'has-error'}>
                                                <label className="form-label">Package Width</label>
                                                <Field
                                                    type="number"
                                                    className="form-input"
                                                    placeholder="Width..."
                                                    name="package_width"
                                                    min="0"
                                                />
                                            </div>

                                            <div className={submitCount && errors.package_length && 'has-error'}>
                                                <label className="form-label">Package Length</label>
                                                <Field
                                                    type="number"
                                                    className="form-input"
                                                    placeholder="Length..."
                                                    name="package_length"
                                                    min="0"
                                                />
                                            </div>

                                            <div className={submitCount && errors.package_height && 'has-error'}>
                                                <label className="form-label">Package Height</label>
                                                <Field
                                                    type="number"
                                                    className="form-input"
                                                    placeholder="Height..."
                                                    name="package_height"
                                                    min="0"
                                                />
                                            </div>
                                        </div>

                                        <div className={submitCount && errors.package_measurement_type && 'has-error'}>
                                            <label className="form-label">Package Measurement</label>
                                            <Field as="select" className="form-select" name="package_measurement_type">
                                                <option>Package Measurement...</option>
                                                <option value="M">M</option>
                                                <option value="CM">CM</option>
                                                <option value="MM">MM</option>
                                                <option value="IN">IN</option>
                                                <option value="FT">FT</option>
                                            </Field>
                                        </div>

                                        <div
                                            className={submitCount && errors.ship_lead_time_period_days && 'has-error'}
                                        >
                                            <label className="form-label">Ship Lead Time (Days)</label>
                                            <Field
                                                type="number"
                                                className="form-input"
                                                placeholder="Ship Lead Time (Days)..."
                                                name="ship_lead_time_period_days"
                                                min="0"
                                            />
                                        </div>

                                        <div
                                            className={submitCount && errors.returnable_time_period_days && 'has-error'}
                                        >
                                            <label className="form-label">Returnable Time Period (Days)</label>
                                            <Field
                                                type="number"
                                                className="form-input"
                                                placeholder="Returnable Time Period (Days)..."
                                                name="returnable_time_period_days"
                                                min="0"
                                                value={values.returnable_time_period_days ?? ''}
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className="w-full flex-none md:w-[315px] ">
                                    <div className="space-y-4 xl:space-y-[30px]">
                                        <div className={submitCount && errors.status && 'has-error'}>
                                            <label className="form-label">Status</label>
                                            <Field as="select" name="status" className="form-select">
                                                <option value="">Product Status...</option>
                                                <option value="1">Unpublished</option>
                                                <option value="2">Published</option>
                                                <option value="3">Archived</option>
                                            </Field>
                                        </div>

                                        <div className={checkedCategory.length === 0 && submitCount ? 'has-error' : ''}>
                                            <label className="form-label">Categories</label>
                                            <Dropdown
                                                placement="bottom-end"
                                                btnClassName="w-full text-left"
                                                button={
                                                    <div className="form-input flex items-center gap-1">
                                                        <div className="block truncate text-black">
                                                            {checkedCategory.length === 0 ? (
                                                                <span>Categories...</span>
                                                            ) : (
                                                                checkedCategory
                                                                    .map((category) => {
                                                                        return category.name;
                                                                    })
                                                                    .join(', ')
                                                            )}
                                                        </div>
                                                        <IconDown className="ml-auto h-5 w-5 shrink-0" />
                                                    </div>
                                                }
                                            >
                                                <ul className="z-[60] w-full content-end overflow-hidden rounded bg-white p-0 shadow">
                                                    <li className="relative mt-1 max-h-80 w-full overflow-auto p-1 pt-0">
                                                        <input
                                                            type="text"
                                                            className="form-input sticky top-0"
                                                            placeholder="Search..."
                                                            onKeyUp={(e) => setSearch(e.target.value)}
                                                        />

                                                        {categories.length > 0
                                                            ? categories.map((category) => {
                                                                  return (
                                                                      <React.Fragment key={category.id}>
                                                                          <label className="false flex w-full cursor-pointer items-center px-4 py-2 text-left hover:bg-black-light">
                                                                              <input
                                                                                  type="checkbox"
                                                                                  className="form-checkbox mr-2 h-4 w-4"
                                                                                  value={category.id}
                                                                                  checked={checkedCategory.some(
                                                                                      (obj) => obj.id === category.id
                                                                                  )}
                                                                                  onChange={(e) => {
                                                                                      changeCategory(e, category);
                                                                                  }}
                                                                              />
                                                                              {category.name}
                                                                          </label>
                                                                          {category.subcategories.map((subCategory) => {
                                                                              return (
                                                                                  <React.Fragment key={subCategory.id}>
                                                                                      <label className="false flex cursor-pointer py-2 pr-4 pl-7 hover:bg-black-light">
                                                                                          <input
                                                                                              type="checkbox"
                                                                                              className="form-checkbox mr-2 h-4 w-4"
                                                                                              value={subCategory.id}
                                                                                              checked={checkedCategory.some(
                                                                                                  (obj) =>
                                                                                                      obj.id ===
                                                                                                      subCategory.id
                                                                                              )}
                                                                                              onChange={(e) => {
                                                                                                  changeCategory(
                                                                                                      e,
                                                                                                      subCategory
                                                                                                  );
                                                                                              }}
                                                                                          />
                                                                                          {subCategory.name}
                                                                                      </label>
                                                                                      {subCategory.subcategories.map(
                                                                                          (subSubCategory) => {
                                                                                              return (
                                                                                                  <React.Fragment
                                                                                                      key={
                                                                                                          subSubCategory.id
                                                                                                      }
                                                                                                  >
                                                                                                      <label className="false flex cursor-pointer py-2 pr-4 pl-11 hover:bg-black-light">
                                                                                                          <input
                                                                                                              type="checkbox"
                                                                                                              className="form-checkbox mr-2 h-4 w-4"
                                                                                                              value={
                                                                                                                  subSubCategory.id
                                                                                                              }
                                                                                                              checked={checkedCategory.some(
                                                                                                                  (
                                                                                                                      obj
                                                                                                                  ) =>
                                                                                                                      obj.id ===
                                                                                                                      subSubCategory.id
                                                                                                              )}
                                                                                                              onChange={(
                                                                                                                  e
                                                                                                              ) => {
                                                                                                                  changeCategory(
                                                                                                                      e,
                                                                                                                      subSubCategory
                                                                                                                  );
                                                                                                              }}
                                                                                                          />
                                                                                                          {
                                                                                                              subSubCategory.name
                                                                                                          }
                                                                                                      </label>
                                                                                                  </React.Fragment>
                                                                                              );
                                                                                          }
                                                                                      )}
                                                                                  </React.Fragment>
                                                                              );
                                                                          })}
                                                                      </React.Fragment>
                                                                  );
                                                              })
                                                            : ''}
                                                    </li>
                                                </ul>
                                            </Dropdown>

                                            <ul className="mt-[13px] flex flex-wrap gap-2.5">
                                                {checkedCategory.map((category, i) => {
                                                    return (
                                                        <li key={i}>
                                                            <button type="button" className="icon-status text-left">
                                                                {category.name}
                                                                <span
                                                                    onClick={() => {
                                                                        setCheckedCategory(
                                                                            checkedCategory.filter(
                                                                                (obj) => obj.id !== category.id
                                                                            )
                                                                        );
                                                                    }}
                                                                >
                                                                    <IconTrash />
                                                                </span>
                                                            </button>
                                                        </li>
                                                    );
                                                })}
                                            </ul>
                                        </div>

                                        <div className={checkedAge.length === 0 && submitCount ? 'has-error' : ''}>
                                            <label className="form-label">Age Suitability</label>
                                            <Dropdown
                                                placement="bottom-end"
                                                btnClassName="text-left z-[60] w-full overflow-hidden rounded bg-white p-0 shadow"
                                                button={
                                                    <div className="form-input flex items-center gap-1">
                                                        <div className="block truncate">
                                                            {checkedAge.length === 0
                                                                ? 'Suitability...'
                                                                : checkedAge
                                                                      .map((age) => {
                                                                          return age.age;
                                                                      })
                                                                      .join(', ')}
                                                        </div>
                                                        <IconDown className="ml-auto h-5 w-5 shrink-0" />
                                                    </div>
                                                }
                                            >
                                                <ul className="relative mt-1 grid max-h-80 w-full grid-cols-2 overflow-auto p-1 pt-0 shadow">
                                                    {helper.getOrganizationAges().map((age) => {
                                                        return (
                                                            <li key={age.value}>
                                                                <label className="false flex w-full cursor-pointer items-center gap-1.5 px-4 py-2 hover:bg-black-light">
                                                                    <input
                                                                        type="checkbox"
                                                                        value={age.value}
                                                                        checked={checkedAge.some(
                                                                            (obj) => obj.value === age.value
                                                                        )}
                                                                        onChange={(e) => changeOrganizationAge(e, age)}
                                                                    />
                                                                    {age.age}
                                                                </label>
                                                            </li>
                                                        );
                                                    })}
                                                </ul>
                                            </Dropdown>
                                            <ul className="mt-[13px] flex flex-wrap gap-2.5">
                                                {checkedAge.map((age) => {
                                                    return (
                                                        <li key={age.value}>
                                                            <button type="button" className="icon-status">
                                                                Age {age.age}
                                                                <span
                                                                    onClick={() => {
                                                                        setCheckedAge(
                                                                            checkedAge.filter(
                                                                                (obj) => obj.value !== age.value
                                                                            )
                                                                        );
                                                                    }}
                                                                >
                                                                    <IconTrash />
                                                                </span>
                                                            </button>
                                                        </li>
                                                    );
                                                })}
                                            </ul>
                                        </div>

                                        <h2 className="text-lg font-semibold text-black-dark">Options</h2>

                                        <div className="grid gap-2.5">
                                            <label className="text-sm">
                                                <Field
                                                    type="checkbox"
                                                    className="form-checkbox mr-2.5"
                                                    name="skip_title_update"
                                                />
                                                Lock title (from CSV updates)
                                            </label>

                                            <label className="text-sm">
                                                <Field
                                                    type="checkbox"
                                                    className="form-checkbox mr-2.5"
                                                    name="skip_description_update"
                                                />
                                                Lock description (from CSV updates)
                                            </label>
                                        </div>

                                        <h2 className="text-lg font-semibold text-black-dark">
                                            Metadata (
                                            <button
                                                type="button"
                                                onClick={() => modalMetaData?.current?.open()}
                                                className="text-primary hover:text-black"
                                            >
                                                edit
                                            </button>
                                            )
                                        </h2>

                                        <div>
                                            <label className="form-label">Parent ID</label>
                                            <p className="text-primary">{params.parent_id}</p>
                                        </div>

                                        <h2 className="text-lg font-semibold text-black-dark">
                                            Category-specific Data (
                                            <button
                                                type="button"
                                                onClick={() => modalCategorySpecificData?.current?.open()}
                                                className="text-primary hover:text-black"
                                            >
                                                edit
                                            </button>
                                            )
                                        </h2>

                                        <div>
                                            <label className="form-label">Publisher ID</label>
                                            <p className="text-primary">{params.publisher_id}</p>
                                        </div>

                                        <div>
                                            <label className="form-label">Publisher Name</label>
                                            <p>{params.publisher_name}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Form>
                    )}
                </Formik>
                <AddProductFormMetaData ref={modalMetaData} data={params} submit={metaFormSubmit} refresh={getData} />
                <AddProductFormCategorySpecificData
                    ref={modalCategorySpecificData}
                    data={params}
                    submit={categorySpecificFormSubmit}
                    refresh={getData}
                />
            </div>
        </>
    );
};

export default forwardRef(AddProductForm);
