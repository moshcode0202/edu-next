import IconEye from '@/components/Icon/IconEye';
import IconSearch from '@/components/Icon/IconSearch';
import IconTrash from '@/components/Icon/IconTrash';
import React, { useRef, useEffect, useState } from 'react';
import Link from 'next/link';
import Header from '@/components/Layout/Header';
import IconMenubar from '@/components/Icon/IconMenubar';
import axios from '@/libs/axios';
import CategoryForm from '@/components/Admin/Products/CategoryForm';
import Pagination from 'rc-pagination';
import 'rc-pagination/assets/index.css';
import IconDown from '@/components/Icon/IconDown';

const Home = () => {
    const modal = useRef();
    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState({});
    const [meta, setMeta] = useState({});

    const [params, setParams] = useState({
        search: '',
        orderField: 'category',
        page: 1,
        perPage: 10,
        orderType: 'asc',
    });

    useEffect(() => {
        categoryData();
    }, [params]);

    const categoryData = async () => {
        try {
            const { data } = await axios.get('/admin/categories/', {
                params: {
                    filter: params.search,
                    order_field: params.orderField,
                    order: params.orderType,
                    per_page: params.perPage,
                    page: params.page,
                },
            });
            setCategories(data.data);
            console.log(data.data);
            setMeta(data.meta);
        } catch {}
    };

    const sortCategoryData = (name) => {
        setParams({
            ...params,
            orderField: name,
            orderType: params.orderField === name ? (params.orderType === 'asc' ? 'desc' : 'asc') : 'asc',
        });
    };

    const changePageSize = (page) => {
        setParams({
            ...params,
            page: page,
        });
    };

    const deleteCategory = async (id) => {
        try {
            const { data } = await axios.delete(`/admin/categories/${id}`);
            categoryData();
        } catch {}
    };

    return (
        <>
            <Header>
                <div className="flex items-center gap-4">
                    <div className="block lg:hidden">
                        <Link href="/" className="inline-flex">
                            <img src="/assets/images/logo.svg" alt="logo" />
                        </Link>
                    </div>

                    <ul className="hidden items-center gap-1 lg:flex">
                        <li className="font-semibold text-primary">
                            <Link href="/admin/product" className="hover:text-primary/80">
                                Products
                            </Link>
                        </li>
                        <li>/ Categories</li>
                    </ul>
                </div>

                <div className="flex items-center gap-3">
                    <button type="button" className="btn block h-10 w-10 p-2 duration-300 lg:hidden">
                        <IconMenubar />
                    </button>
                </div>
            </Header>

            <div className="p-4 lg:p-10 lg:pt-[45px]">
                <div className="mb-5 justify-end md:flex">
                    <div className="flex justify-end gap-5">
                        <button
                            type="button"
                            className="btn shrink-0"
                            onClick={() => {
                                setSelectedCategory({});
                                setTimeout(() => {
                                    modal?.current?.open();
                                });
                            }}
                        >
                            Add New
                        </button>

                        <div className="md:w-[240px] md:flex-none">
                            <div className="relative">
                                <input
                                    type="text"
                                    className="form-input pr-10"
                                    placeholder="Search..."
                                    onKeyUp={(e) => {
                                        setParams({
                                            ...params,
                                            search: e.target.value,
                                            page: 1,
                                        });
                                    }}
                                />
                                <button
                                    type="button"
                                    className="absolute top-0 right-0 my-auto inline-flex h-10 w-10 items-center justify-center text-black-dark hover:opacity-70"
                                >
                                    <IconSearch />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                <div>
                    <div className="mb-5 overflow-x-auto shadow-[0_4px_4px_rgba(0,0,0,0.05)]">
                        <table>
                            <thead className="bg-[#F7F7F7]">
                                <tr>
                                    <th>
                                        <div className="inline-flex items-center gap-1">
                                            <button
                                                onClick={() => {
                                                    sortCategoryData('category');
                                                }}
                                            >
                                                Category Name
                                            </button>
                                            {params.orderField === 'category' ? (
                                                params.orderType === 'asc' ? (
                                                    <IconDown className="rotate-180" />
                                                ) : (
                                                    <IconDown />
                                                )
                                            ) : (
                                                ''
                                            )}
                                        </div>
                                    </th>
                                    <th>
                                        <div className="inline-flex items-center gap-1">
                                            <button
                                                onClick={() => {
                                                    sortCategoryData('Slug');
                                                }}
                                            >
                                                Slug
                                            </button>
                                            {params.orderField === 'Slug' ? (
                                                params.orderType === 'asc' ? (
                                                    <IconDown className="rotate-180" />
                                                ) : (
                                                    <IconDown />
                                                )
                                            ) : (
                                                ''
                                            )}
                                        </div>
                                    </th>
                                    <th>
                                        <div className="inline-flex items-center gap-1">
                                            <button
                                                onClick={() => {
                                                    sortCategoryData('id');
                                                }}
                                            >
                                                Connected Products
                                            </button>
                                            {params.orderField === 'id' ? (
                                                params.orderType === 'asc' ? (
                                                    <IconDown className="rotate-180" />
                                                ) : (
                                                    <IconDown />
                                                )
                                            ) : (
                                                ''
                                            )}
                                        </div>
                                    </th>
                                    <th className="text-right"></th>
                                </tr>
                            </thead>
                            <tbody>
                                {categories.length > 0 ? (
                                    categories.map((category) => {
                                        return (
                                            <React.Fragment key={category.id}>
                                                <tr>
                                                    <td
                                                        className="cursor-pointer font-semibold text-primary"
                                                        onClick={() => {
                                                            setSelectedCategory(category);
                                                            setTimeout(() => {
                                                                modal?.current?.open();
                                                            });
                                                        }}
                                                    >
                                                        {category.name}
                                                    </td>
                                                    <td className="font-semibold text-primary">{category.slug}</td>
                                                    <td className="font-semibold text-primary">{category.id}</td>
                                                    <td className="text-right">
                                                        <div className="inline-flex items-center gap-1">
                                                            <button
                                                                type="button"
                                                                className="text-primary hover:text-black"
                                                                onClick={() => {
                                                                    setSelectedCategory(category);
                                                                    setTimeout(() => {
                                                                        modal?.current?.open();
                                                                    });
                                                                }}
                                                            >
                                                                <IconEye />
                                                            </button>
                                                            <button
                                                                type="button"
                                                                className="text-primary hover:text-black"
                                                                onClick={() => deleteCategory(category.id)}
                                                            >
                                                                <IconTrash />
                                                            </button>
                                                        </div>
                                                    </td>
                                                </tr>
                                                {category.subcategories.map((subCategory) => {
                                                    return (
                                                        <React.Fragment key={subCategory.id}>
                                                            <tr>
                                                                <td
                                                                    onClick={() => {
                                                                        setSelectedCategory({
                                                                            ...subCategory,
                                                                            parent_id: category.id,
                                                                        });
                                                                        setTimeout(() => {
                                                                            modal?.current?.open();
                                                                        });
                                                                    }}
                                                                    className="cursor-pointer pl-8 font-semibold text-primary"
                                                                >
                                                                    -{subCategory.name}
                                                                </td>
                                                                <td className="font-semibold text-primary">
                                                                    {subCategory.slug}
                                                                </td>
                                                                <td className="font-semibold text-primary">
                                                                    {subCategory.id}
                                                                </td>
                                                                <td className="text-right">
                                                                    <div className="inline-flex items-center gap-1">
                                                                        <button
                                                                            type="button"
                                                                            className="text-primary hover:text-black"
                                                                            onClick={() => {
                                                                                setSelectedCategory(subCategory);
                                                                                setTimeout(() => {
                                                                                    modal?.current?.open();
                                                                                });
                                                                            }}
                                                                        >
                                                                            <IconEye />
                                                                        </button>
                                                                        <button
                                                                            type="button"
                                                                            className="text-primary hover:text-black"
                                                                            onClick={() =>
                                                                                deleteCategory(subCategory.id)
                                                                            }
                                                                        >
                                                                            <IconTrash />
                                                                        </button>
                                                                    </div>
                                                                </td>
                                                            </tr>
                                                            {subCategory.subcategories.map((subSubCategory) => {
                                                                return (
                                                                    <tr key={subSubCategory.id}>
                                                                        <td
                                                                            onClick={() => {
                                                                                setSelectedCategory({
                                                                                    ...subSubCategory,
                                                                                    parent_id: subCategory.id,
                                                                                });

                                                                                setTimeout(() => {
                                                                                    modal?.current?.open();
                                                                                });
                                                                            }}
                                                                            className="cursor-pointer pl-12 font-semibold text-primary"
                                                                        >
                                                                            -{subSubCategory.name}
                                                                        </td>
                                                                        <td className="font-semibold text-primary">
                                                                            {subSubCategory.slug}
                                                                        </td>
                                                                        <td className="font-semibold text-primary">
                                                                            {subSubCategory.id}
                                                                        </td>
                                                                        <td className="text-right">
                                                                            <div className="inline-flex items-center gap-1">
                                                                                <button
                                                                                    type="button"
                                                                                    className="text-primary hover:text-black"
                                                                                    onClick={() => {
                                                                                        setSelectedCategory(
                                                                                            subSubCategory
                                                                                        );
                                                                                        setTimeout(() => {
                                                                                            modal?.current?.open();
                                                                                        });
                                                                                    }}
                                                                                >
                                                                                    <IconEye />
                                                                                </button>
                                                                                <button
                                                                                    type="button"
                                                                                    className="text-primary hover:text-black"
                                                                                    onClick={() =>
                                                                                        deleteCategory(
                                                                                            subSubCategory.id
                                                                                        )
                                                                                    }
                                                                                >
                                                                                    <IconTrash />
                                                                                </button>
                                                                            </div>
                                                                        </td>
                                                                    </tr>
                                                                );
                                                            })}
                                                        </React.Fragment>
                                                    );
                                                })}
                                            </React.Fragment>
                                        );
                                    })
                                ) : (
                                    <tr className="mt-5 mb-5 flex place-items-center justify-center text-3xl text-danger">
                                        <td> no data available</td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>

                    <div className="flex items-center justify-end gap-2">
                        <select
                            className="form-select w-auto"
                            value={params.perPage}
                            onChange={(e) => {
                                setParams({
                                    ...params,
                                    perPage: e.target.value,
                                    page: params.page,
                                });
                            }}
                        >
                            <option value="10">10</option>
                            <option value="25">25</option>
                            <option value="50">50</option>
                            <option value="100">100</option>
                        </select>
                        <div>
                            Showing {params.perPage} of {meta.total < params.perPage ? '100' : meta.total} entries
                        </div>
                    </div>
                    <Pagination
                        className="pagination-data"
                        showPrevNextJumpers={true}
                        current={params.page}
                        total={meta.total}
                        pageSize={params.perPage}
                        onChange={changePageSize}
                    />
                </div>

                <CategoryForm ref={modal} data={selectedCategory} refresh={categoryData} />
            </div>
        </>
    );
};

export default Home;

Home.middleware = {
    auth: true,
    verify: true,
};
