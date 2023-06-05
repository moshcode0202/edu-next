import { Field, Form, Formik } from 'formik';
import * as Yup from 'yup';
import CommonSideModal from '@/components/Common/CommonSideModal';
import React, { forwardRef, useEffect, useImperativeHandle, useRef, useState } from 'react';
import axios from '@/libs/axios';
import axiosInstance from 'axios';
import Dropdown from '@/components/Dropdown';
import IconDown from '@/components/Icon/IconDown';
import FieldButton from '@/components/Field/FieldButton';

const AdminProductsCategories = ({data,refresh}, forwardedRef) => {
    const modal = useRef();
    const parentCategoryDropdown = useRef();
    const defaultParams = { name: '', slug: '', parent_id: '' };
    const [parentsCategories, setParentsCategories] = useState([]);
    const [params, setParams] = useState(defaultParams);
    const [selectedParentCategory, setSelectedParentCategory] = useState({ id: '', name: '' });
    const [search, setSearch] = useState('');
    const [oldSearch, setOldSearch] = useState('');
    const [timer, setTimer] = useState(null);
    const [searchRequest, setSearchRequest] = useState(null);

    const validationSchema = Yup.object().shape({
        name: Yup.string().required('required'),
        slug: Yup.string().required('required'),
    });

    useImperativeHandle(forwardedRef, () => ({
        open(level, id) {
            modal?.current?.open();
            if (Object.keys(data).length) {
                setParams(data);
                findParentCategory(level, id);
            } else {
                setParams(defaultParams);
            }
        },
        close() {
            modal?.current?.close();
        },
    }));

    useEffect(() => {
        getParentCategories();
    }, []);

    useEffect(() => {
        // const delay = setTimeout(() => {
        //     getParentCategories();
        // }, 300);
        // return () => {
        //     clearTimeout(delay);
        // };
        searchParentCategories();
    }, [search]);

    const searchParentCategories = () => {
        if (oldSearch !== search && (search.length > 0 || !search.length)) {
            setParentsCategories([]);
            setOldSearch(search);
            clearTimeout(timer);
            setTimer(
                setTimeout(() => {
                    if (searchRequest) {
                        searchRequest.cancel();
                    }
                    setSearchRequest(axiosInstance.CancelToken.source());
                    getParentCategories();
                }, 300)
            );
        }
    };

    const getParentCategories = async () => {
        const { data } = await axios.get(`admin/categories/parents?filter=${search}`);
        setParentsCategories(data.data);
    };

    const findParentCategory = (level, id) => {
        if (level === 3 && id) {
            const cat = parentsCategories.find((d) => d.id === id);
            setSelectedParentCategory(cat.subcategories.find((d) => d.id === data.parent_id));
        } else if (level === 2) {
            setSelectedParentCategory(parentsCategories.find((d) => d.id === data.parent_id));
        }
    };

    const formHandler = async (values) => {
        if (params.id) {
            const { data } = await axios.post(`admin/categories/${params.id}`, values);
            if (data.success) {
                refresh();
                modal.current.close();
            }
        } else {
            const { data } = await axios.post(`admin/categories`, values);
            if (data.success) {
                refresh();
                getParentCategories();
                modal.current.close();
            }
        }
    };

    return (
        <CommonSideModal ref={modal}>
            <Formik initialValues={params} onSubmit={formHandler} validationSchema={validationSchema}>
                {({ isSubmitting, submitCount, errors, setFieldValue, values }) => (
                    <Form className="h-full">
                        <div className="flex h-full flex-col justify-between">
                            <div className="space-y-4 xl:space-y-[30px]">
                                <h2 className="text-xl font-semibold">{`${
                                    Object.keys(data).length ? 'Edit' : 'Add'
                                } Product Category`}</h2>

                                <h3 className="text-lg font-semibold text-black-dark">Information</h3>

                                <div className="space-y-5">
                                    <div className="grid gap-5 sm:grid-cols-2">
                                        <div className={submitCount && errors.name && 'has-error'}>
                                            <label className="form-label">Category Name</label>
                                            <Field
                                                name="name"
                                                type="text"
                                                className="form-input"
                                                placeholder="Category Name..."
                                            />
                                        </div>

                                        <div className={submitCount && errors.slug && 'has-error'}>
                                            <label className="form-label">Category Slug</label>
                                            <Field
                                                name="slug"
                                                type="text"
                                                className="form-input"
                                                placeholder="Category Slug..."
                                            />
                                        </div>
                                    </div>
                                    <div className={submitCount && errors.parent_id && 'has-error'}>
                                        <label className="form-label">Category Parent</label>
                                        <Dropdown
                                            ref={parentCategoryDropdown}
                                            btnClassName="w-full text-left"
                                            placement="bottom-start"
                                            offset={[0, 5]}
                                            button={
                                                <div className="form-input flex items-center">
                                                    <span>
                                                        {values.parent_id
                                                            ? selectedParentCategory?.name
                                                            : 'Category Parent...'}
                                                    </span>
                                                    <IconDown className="ml-auto h-5 w-5"></IconDown>
                                                </div>
                                            }
                                        >
                                            <div className="relative mt-1 max-h-72 overflow-auto p-1 pt-0">
                                                <input
                                                    className="form-input sticky top-0"
                                                    type="text"
                                                    placeholder="Search..."
                                                    onChange={(e) => {
                                                        setSearch(e.target.value);
                                                    }}
                                                />
                                                {parentsCategories.length ? (
                                                    parentsCategories.map((category) => {
                                                        return (
                                                            <React.Fragment key={category.id}>
                                                                <div
                                                                    className={`w-full cursor-pointer px-4 py-2 hover:bg-black-light ${
                                                                        selectedParentCategory?.id === category.id &&
                                                                        'bg-black-light'
                                                                    }`}
                                                                    value={category.id}
                                                                    onClick={() => {
                                                                        parentCategoryDropdown.current.close();
                                                                        setFieldValue('parent_id', category.id);
                                                                        setSelectedParentCategory(category);
                                                                    }}
                                                                >
                                                                    {category.name}
                                                                </div>
                                                                {category.subcategories.length !== 0 &&
                                                                    category.subcategories.map((subCategory) => {
                                                                        return (
                                                                            <div
                                                                                key={subCategory.id}
                                                                                className={`w-full cursor-pointer py-2 pr-4 pl-7 hover:bg-black-light ${
                                                                                    selectedParentCategory?.id ===
                                                                                        subCategory.id &&
                                                                                    'bg-black-light'
                                                                                }`}
                                                                                value={subCategory.id}
                                                                                onClick={() => {
                                                                                    parentCategoryDropdown.current.close();
                                                                                    setFieldValue(
                                                                                        'parent_id',
                                                                                        subCategory.id
                                                                                    );
                                                                                    setSelectedParentCategory(
                                                                                        subCategory
                                                                                    );
                                                                                }}
                                                                            >
                                                                                {subCategory.name}
                                                                            </div>
                                                                        );
                                                                    })}
                                                            </React.Fragment>
                                                        );
                                                    })
                                                ) : (
                                                    <div className="py-5 text-center">No Data Found</div>
                                                )}
                                            </div>
                                        </Dropdown>
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

export default forwardRef(AdminProductsCategories);
