import IconDown from '@/components/Icon/IconDown';
import IconSearch from '@/components/Icon/IconSearch';
import React, { useRef, useState, useEffect } from 'react';
import Link from 'next/link';
import Header from '@/components/Layout/Header';
import ProductsImport from '@/components/Admin/Products/AdminProductsImport';
import helper from '@/libs/helper';
import axios from '@/libs/axios';
import 'rc-pagination/assets/index.css';
import Dropdown from '@/components/Dropdown';

const Products = () => {
    const modal = useRef();
    const [allProducts, setAllProducts] = useState([]);
    const [meta, setMeta] = useState({});
    const pageRef = useRef();

    const [params, setParams] = useState({
        page: 1,
        perPage: 10,
        search: '',
        status: '',
        orderField: 'title',
        orderType: 'asc',
        vender: '',
    });

    const [searchCategory, setSearchCategory] = useState('');
    const [categories, setCategories] = useState([]);
    const [checkedCategory, setCheckedCategory] = useState([]);
    const [numberPage, setNumberPage] = useState(1);

    useEffect(() => {
        productsData();
    }, [params, checkedCategory]);

    const productsData = async () => {
        try {
            const { data } = await axios.get('/admin/products', {
                params: {
                    current_page: params.page,
                    per_page: params.perPage,
                    filter: params.search,
                    status: params.status,
                    order_field: params.orderField,
                    order: params.orderType,
                    vendor_id: params.vender,
                    categories: checkedCategory.map((category) => category.id),
                    page: numberPage,
                },
            });
            setAllProducts(data.data);
            setMeta(data.meta);
        } catch {}
    };

    useEffect(() => {
        categoryData();
    }, [searchCategory]);

    const categoryData = async () => {
        try {
            const { data } = await axios.get('/admin/categories/', {
                params: {
                    filter: searchCategory,
                    categories: checkedCategory,
                },
            });
            setCategories(data.data);
        } catch {}
    };

    const changeCategory = (e, category) => {
        const value = e.target.value;
        const checked = e.target.checked;

        if (checked) {
            setCheckedCategory([...checkedCategory, { id: category.id, name: category.name }]);
        } else {
            setCheckedCategory(checkedCategory.filter((e) => e.id !== category.id));
        }
    };

    useEffect(() => {
        venderData();
    }, []);

    const venderData = async () => {
        try {
            const { data } = await axios.get('/admin/vendors', {
                params: {
                    vendor_id: params.vender,
                },
            });
        } catch {}
    };

    const sortOrganizationData = (name) => {
        setParams({
            ...params,
            orderField: name,
            orderType: params.orderField === name ? (params.orderType === 'asc' ? 'desc' : 'asc') : 'asc',
        });
    };

    const previousPageButton = async (previous_page_url) => {
        try {
            const { data } = await axios.get(`/admin/products/${previous_page_url}`);
            setAllProducts(data.data);
            setMeta(data.meta);
        } catch {}
    };

    const nextPageButton = async (next_page_url) => {
        try {
            const { data } = await axios.get(`/admin/products/${next_page_url}`);
            setAllProducts(data.data);
            setMeta(data.meta);
        } catch {}
    };

    return (
        <>
            <Header
                title={<li className="font-semibold text-primary">Products</li>}
                action={
                    <button type="button" className="btn" onClick={() => modal.current.open()}>
                        Import
                    </button>
                }
            ></Header>

            <div className="p-4 lg:p-10 lg:pt-[45px]">
                <div className="mb-5 justify-end md:flex">
                    <div className="grid grid-cols-2 gap-5 md:flex">
                        <div>
                            <Dropdown
                                placement="bottom-end"
                                btnClassName="text-left w-full"
                                button={
                                    <div className="form-input flex items-center gap-1">
                                        <div className="block max-w-xs truncate" style={{ maxWidth: '6rem' }}>
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
                                <ul className="z-[60] w-full overflow-hidden rounded bg-white p-0 shadow">
                                    <li className="relative mt-1 max-h-80 w-full overflow-auto p-1 pt-0 ">
                                        <input
                                            type="text"
                                            className="form-input sticky top-0"
                                            placeholder="Search..."
                                            onKeyUp={(e) => {
                                                setSearchCategory(e.target.value);
                                                setParams({ ...params, page: 1 });
                                            }}
                                        />

                                        {categories.length > 0 ? (
                                            categories.map((category) => {
                                                return (
                                                    <React.Fragment key={category.id}>
                                                        <label className="false flex w-full cursor-pointer items-center px-4 py-2 hover:bg-black-light">
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
                                                                                (obj) => obj.id === subCategory.id
                                                                            )}
                                                                            onChange={(e) => {
                                                                                changeCategory(e, subCategory);
                                                                            }}
                                                                        />
                                                                        {subCategory.name}
                                                                    </label>
                                                                    {subCategory.subcategories.map((subSubCategory) => {
                                                                        return (
                                                                            <React.Fragment key={subSubCategory.id}>
                                                                                <label className="false flex cursor-pointer py-2 pr-4 pl-11 hover:bg-black-light">
                                                                                    <input
                                                                                        type="checkbox"
                                                                                        className="form-checkbox mr-2 h-4 w-4"
                                                                                        value={subSubCategory.id}
                                                                                        checked={checkedCategory.some(
                                                                                            (obj) =>
                                                                                                obj.id ===
                                                                                                subSubCategory.id
                                                                                        )}
                                                                                        onChange={(e) => {
                                                                                            changeCategory(
                                                                                                e,
                                                                                                subSubCategory
                                                                                            );
                                                                                        }}
                                                                                    />
                                                                                    {subSubCategory.name}
                                                                                </label>
                                                                            </React.Fragment>
                                                                        );
                                                                    })}
                                                                </React.Fragment>
                                                            );
                                                        })}
                                                    </React.Fragment>
                                                );
                                            })
                                        ) : (
                                            <div>no data available</div>
                                        )}
                                    </li>
                                </ul>
                            </Dropdown>
                        </div>

                        <select
                            className="form-select"
                            value={params.vender}
                            onChange={(e) => {
                                setParams({
                                    ...params,
                                    vender: e.target.value,
                                    page: 1,
                                });
                            }}
                        >
                            <option value="">Vendor...</option>
                            <option value="2">Ingram</option>
                            <option value="1">Fun Express</option>
                        </select>

                        <select
                            className="form-select"
                            value={params.status}
                            onChange={(e) => {
                                setParams({
                                    ...params,
                                    status: e.target.value,
                                });
                            }}
                        >
                            <option value="">Status...</option>
                            <option value="1">Unpublished</option>
                            <option value="2">Published</option>
                            <option value="3">Archived</option>
                        </select>

                        <div className="flex-none md:w-[240px]">
                            <div className="relative">
                                <input
                                    type="text"
                                    className="form-input pr-10"
                                    placeholder="Search..."
                                    onKeyUp={(e) => {
                                        if (e.key === 'Enter') {
                                            setParams({
                                                ...params,
                                                search: e.target.value,
                                                page: 1,
                                            });
                                        }
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

                        <Link href="/admin/products/add" className="btn whitespace-nowrap">
                            Add New
                        </Link>
                    </div>
                </div>

                <div>
                    <div className="mb-5 overflow-x-auto shadow-[0_4px_4px_rgba(0,0,0,0.05)]">
                        <table>
                            <thead className="bg-[#F7F7F7]">
                                <tr>
                                    <th className="w-[50px]">#</th>
                                    <th className={`${params.orderField === 'title' ? 'text-primary' : ''}`}>
                                        <div
                                            className="inline-flex items-center gap-1 hover:text-primary"
                                            onClick={() => sortOrganizationData('title')}
                                        >
                                            Title
                                            {params.orderField === 'title' ? (
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
                                    <th className={`${params.orderField === 'category' ? 'text-primary' : ''}`}>
                                        <div
                                            className="inline-flex items-center gap-1  hover:text-primary"
                                            onClick={() => sortOrganizationData('category')}
                                        >
                                            Category
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
                                    <th className={`${params.orderField === 'stock' ? 'text-primary' : ''}`}> Stock</th>
                                    <th className={`${params.orderField === 'staus' ? 'text-primary' : ''}`}>
                                        <div
                                            className="inline-flex items-center gap-1  hover:text-primary"
                                            onClick={() => sortOrganizationData('staus')}
                                        >
                                            Status
                                            {params.orderField === 'staus' ? (
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
                                </tr>
                            </thead>
                            <tbody>
                                {allProducts.length > 0 ? (
                                    allProducts.map((product) => {
                                        return (
                                            <tr key={product.id}>
                                                <td>
                                                    <div className="w-max">
                                                        <img
                                                            src={`/assets/images/profile_img1.png`}
                                                            alt=""
                                                            className="h-[30px] w-[30px] rounded-sm object-cover"
                                                        />
                                                    </div>
                                                </td>
                                                <td className="max-w-xs truncate">
                                                    <Link
                                                        href={`/admin/products/${product.id}`}
                                                        className="font-semibold text-primary hover:text-black"
                                                    >
                                                        {product.title}
                                                    </Link>
                                                </td>
                                                <td className="max-w-xs truncate">
                                                    {product.categories
                                                        .map((category) => {
                                                            return category.name;
                                                        })
                                                        .join(', ')}
                                                </td>
                                                <td>
                                                    {product.inventory_quantity === 0
                                                        ? '-'
                                                        : product.inventory_quantity.toLocaleString()}
                                                </td>
                                                <td>
                                                    <span
                                                        className={`${
                                                            product.status === 1
                                                                ? 'status bg-primary/10 text-primary'
                                                                : product.status === 2
                                                                ? 'status bg-success/10 text-success'
                                                                : product.status === 3
                                                                ? 'status bg-black-dark/10 text-black-dark'
                                                                : ''
                                                        }`}
                                                    >
                                                        {product.status === 1
                                                            ? 'Unpublished'
                                                            : product.status === 2
                                                            ? 'Published'
                                                            : product.status === 3
                                                            ? 'Archieved'
                                                            : ''}
                                                    </span>
                                                </td>
                                            </tr>
                                        );
                                    })
                                ) : (
                                    <tr className="left-50% absolute mt-5 mb-5 flex place-items-center justify-center text-3xl text-danger">
                                        <td>no data available</td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>

                    <div className="flex items-center justify-end gap-2">
                        <select
                            className="form-select w-auto"
                            onChange={(e) => {
                                setParams({
                                    ...params,
                                    perPage: e.target.value,
                                    page: params.page,
                                });
                            }}
                        >
                            {helper.perPageOption.map((option) => {
                                return (
                                    <option key={option} value={option}>
                                        {option}
                                    </option>
                                );
                            })}
                        </select>
                        <div className="flex">
                            <input
                                type="number"
                                ref={pageRef}
                                className="form-input max-w-[60px] rounded-r-none"
                                value={numberPage}
                                onChange={(e) => {
                                    setNumberPage(e.target.value);
                                }}
                            />
                            <button type="button" className="btn rounded-l-none" onClick={productsData}>
                                Go
                            </button>
                        </div>
                        <div>
                            {meta.current_page} of {meta.last_page} page(s)
                        </div>
                    </div>

                    <button
                        type="button"
                        className="btn mx-1 mt-2"
                        onClick={() => {
                            setNumberPage(meta.current_page - 1);
                            previousPageButton(meta.previous_page_url);
                        }}
                        disabled={meta.current_page === meta.first_page}
                    >
                        Prev
                    </button>
                    <button
                        type="button"
                        className="btn mx-1 mt-2"
                        onClick={() => {
                            setNumberPage(meta.current_page + 1);
                            nextPageButton(meta.next_page_url);
                        }}
                        disabled={meta.current_page === meta.last_page}
                    >
                        Next
                    </button>
                </div>

                <ProductsImport ref={modal} />
            </div>
        </>
    );
};

export default Products;

Products.middleware = {
    auth: true,
    verify: true,
};
