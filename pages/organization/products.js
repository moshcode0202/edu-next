import React, { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import helper from '@/libs/helper';
import Header from '@/components/Layout/Header';
import IconDown from '@/components/Icon/IconDown';
import IconSearch from '@/components/Icon/IconSearch';
import OrganizationDropdown from '@/components/Organization/OrganizationDropdown';
import OrganizationProductsAvailability from '@/components/Organization/OrganizationProductsAvailability';
import OrganizationProductCard from '@/components/Organization/Product/OrganizationProductCard';
import axios from '@/libs/axios';
import AnimateHeight from 'react-animate-height';
import { useWorkspace } from '@/hooks/useWorkspace';
import { data } from 'autoprefixer';

const Products = () => {
    const modal = useRef();
    const [activeTab, setActiveTab] = useState('products');
    const [meta, setMeta] = useState({});
    const [numberPage, setNumberPage] = useState(1);
    const [categories, setCategories] = useState([]);
    const [searchCategory, setSearchCategory] = useState('');
    const [currentMenu, setCurrentMenu] = useState('');
    const workSpace = useWorkspace();

    const [productListData, setProductListData] = useState([]);
    const [ages, setAges] = useState([]);
    const [selectedAges, setSelectedAges] = useState([]);
    const [selectedCategories, setSelectedCategories] = useState([]);

    const [checkedAge, setCheckedAge] = useState([]);
    const [checkedCategory, setCheckedCategory] = useState([]);

    const toggleMenu = (value) => {
        setCurrentMenu((oldValue) => {
            return oldValue === value ? '' : value;
        });
    };

    const [params, setParams] = useState({
        page: 1,
        perPage: 100,
        search: '',
        order: '',
        // categoriesFilter: '',
        // agesFilter: '',
    });

    const getOrganizationAges = () => {
        let arr = [];
        workSpace.current().age_suitability.map((age) => {
            arr.push(helper.getAge(age));
        });
        setAges(arr);
    };

    useEffect(() => {
        ProductData();
    }, [params]);

    const ProductData = async () => {
        try {
            const { data } = await axios.get('/organization/products', {
                params: {
                    current_page: params.page,
                    per_page: params.perPage,
                    filter: params.search,
                    page: numberPage,
                    order: params.order,
                    // ages: selectedAges.map((data) => data.value),
                    // categories: selectedCategories.map((data) => data.id),
                },
            });
            setProductListData(data.data);
            setMeta(data.meta);
        } catch {}
    };

    useEffect(() => {
        categoryData();
    }, [searchCategory]);

    const categoryData = async () => {
        try {
            const { data } = await axios.get('/organization/categories', {
                params: {
                    filter: searchCategory,
                },
            });
            setCategories(data.data);
        } catch {}
    };

    const excludedProducts = async () => {
        try {
            const { data } = await axios.get('/organization/products/excluded', {
                params: {
                    current_page: params.page,
                    per_page: params.perPage,
                    filter: params.search,
                    page: numberPage,
                    order: params.order,
                    ages: selectedAges.map((data) => data.value),
                    categories: selectedCategories.map((data) => data.id),
                },
            });
            setProductListData(data.data);
            setMeta(data.meta);
        } catch {}
    };

    const openDropdownSelectedCategories = (category) => {
        const item = selectedCategories.find((data) => data.id === category.id);
        let categoriesData = selectedCategories;
        if (item) {
            categoriesData = categoriesData.filter((data) => data.id !== category.id);
        } else {
            categoriesData.push(category);
        }
        setSelectedCategories([...categoriesData]);
    };
    const openDropdownSelectedAges = (age) => {
        const item = selectedAges.find((data) => data.value === age.value);
        let agesData = selectedAges;
        if (item) {
            agesData = agesData.filter((data) => data.value !== age.value);
        } else {
            agesData.push(age);
        }
        setSelectedAges([...agesData]);
    };

    const isCheckedAge = (id) => {
        return selectedAges.some((data) => data.value === id);
    };
    const isCheckedCategory = (id) => {
        return selectedCategories.some((data) => data.id === id);
    };

    const refresh = () => {
        ProductData(); 
        getOrganizationAges();
        categoryData()
    };

    // const deleteCardData = (id) => {
    //     console.log('object');
    //     setProductListData(productListData.filter((d) => d.id !== id));
    // };

    const previousPageButton = async (previous_page_url) => {
        try {
            const { data } = await axios.get(`/organization/products/${previous_page_url}`);
            setProductListData(data.data);
            setMeta(data.meta);
        } catch {}
    };
    const nextPageButton = async (next_page_url) => {
        try {
            const { data } = await axios.get(`/organization/products/${next_page_url}`);
            setProductListData(data.data);
            setMeta(data.meta);
        } catch {}
    };

    return (
        <>
            <Header
                title={<li className="font-semibold text-primary">Products</li>}
                action={<OrganizationDropdown />}
            ></Header>

            <div className="flex h-[calc(100vh-51px)] flex-col md:flex-row">
                <div className="flex-none border-r border-white-light bg-white md:w-[280px]">
                    <h2 className="mb-[18px] flex items-center justify-between border-b border-white-light bg-white-dark px-5 py-4 font-semibold text-black-dark">
                        Filters
                        <button
                            type="button"
                            className="text-danger hover:text-black"
                            onClick={() => {
                                setSelectedAges([]);
                                setSelectedCategories([]);
                            }}
                        >
                            Clear all
                        </button>
                    </h2>

                    <div
                        className={`flex cursor-pointer items-center justify-between  px-5 py-2.5 text-lg font-semibold ${
                            currentMenu === 'categories' ? 'bg-primary text-white' : 'bg-primary/10'
                        } `}
                        onClick={() => toggleMenu('categories')}
                    >
                        Categories
                        <span>
                            <IconDown
                                className={`h-5 w-5 text-black-dark ${
                                    currentMenu === 'categories' ? 'rotate-180 text-white' : ''
                                }`}
                            />
                        </span>
                    </div>

                    <AnimateHeight duration={300} height={currentMenu === 'categories' ? 'auto' : 0}>
                        <div className="p-5">
                            <input
                                type="text"
                                className="form-input"
                                placeholder="Search..."
                                onKeyUp={(e) => {
                                    if (e.key === 'Enter') {
                                        setSearchCategory(e.target.value);
                                    }
                                }}
                            />
                        </div>
                        <div className="max-h-[200px] overflow-y-auto overflow-x-hidden p-5 pt-0 ">
                            <div className="flex flex-col space-y-2.5 ">
                                {categories.length > 0 ? (
                                    categories.map((category) => {
                                        return (
                                            <React.Fragment key={category.id}>
                                                <label className="inline-flex cursor-pointer break-all">
                                                    <input
                                                        type="checkbox"
                                                        className="form-checkbox mr-2.5 mt-0.5"
                                                        value={category.id}
                                                        checked={selectedCategories.some(
                                                            (obj) => obj.id === category.id
                                                        )}
                                                        onChange={(e) => {
                                                            openDropdownSelectedCategories(category);
                                                            // setParams({
                                                            //     ...params,
                                                            //     categoriesFilter: e.target.checked,
                                                            // });
                                                        }}
                                                    />
                                                    <span>{category.name}</span>
                                                </label>
                                                {category.subcategories.map((subCategory) => {
                                                    return (
                                                        <React.Fragment key={subCategory.id}>
                                                            <label className="inline-flex cursor-pointer break-all pl-4">
                                                                <input
                                                                    type="checkbox"
                                                                    className="form-checkbox mr-2.5 mt-0.5"
                                                                    value={subCategory.id}
                                                                    checked={selectedCategories.some(
                                                                        (obj) => obj.id === subCategory.id
                                                                    )}
                                                                    onChange={() => {
                                                                        openDropdownSelectedCategories(subCategory);
                                                                        // setParams({
                                                                        //     ...params,
                                                                        //     categoriesFilter: e.target.checked,
                                                                        // });
                                                                    }}
                                                                />
                                                                <span>{subCategory.name}</span>
                                                            </label>
                                                            {subCategory.subcategories.map((subSubCategory) => {
                                                                return (
                                                                    <React.Fragment key={subSubCategory.id}>
                                                                        <label className="inline-flex cursor-pointer break-all pl-8">
                                                                            <input
                                                                                type="checkbox"
                                                                                className="form-checkbox mr-2.5 mt-0.5"
                                                                                value={subSubCategory.id}
                                                                                checked={selectedCategories.some(
                                                                                    (obj) =>
                                                                                        obj.id === subSubCategory.id
                                                                                )}
                                                                                onChange={() => {
                                                                                    openDropdownSelectedCategories(
                                                                                        subSubCategory
                                                                                    );
                                                                                    // setParams({
                                                                                    //     ...params,
                                                                                    //     categoriesFilter:
                                                                                    //         e.target.checked,
                                                                                    // });
                                                                                }}
                                                                            />
                                                                            <span>{subSubCategory.name}</span>
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
                                    <div className="py-4 text-center font-semibold">No data found</div>
                                )}
                            </div>
                        </div>
                    </AnimateHeight>

                    <div>
                        <div
                            className={`flex cursor-pointer items-center justify-between  px-5 py-2.5 text-lg font-semibold ${
                                currentMenu === 'agesuitability' ? 'bg-primary text-white' : 'bg-primary/10'
                            } `}
                            onClick={() => toggleMenu('agesuitability')}
                        >
                            Age Suitability
                            <span>
                                <IconDown
                                    className={`h-5 w-5 text-black-dark ${
                                        currentMenu === 'agesuitability' ? 'rotate-180 text-white' : ''
                                    }`}
                                />
                            </span>
                        </div>
                        <AnimateHeight duration={300} height={currentMenu === 'agesuitability' ? 'auto' : 0}>
                            <div className="flex flex-col space-y-2.5 p-5">
                                {helper.getOrganizationAges().map((age) => {
                                    return (
                                        <label
                                            key={age.value}
                                            className="inline-flex cursor-pointer items-center break-all"
                                        >
                                            <input
                                                type="checkbox"
                                                className="form-checkbox mr-2.5"
                                                value={age.value}
                                                checked={selectedAges.some((obj) => obj.value === age.value)}
                                                onChange={() => {
                                                    openDropdownSelectedAges(age);
                                                    // setParams({
                                                    //     ...params,
                                                    //     agesFilter:e.target.value
                                                    // })
                                                }}
                                            />
                                            {age.age}
                                        </label>
                                    );
                                })}
                            </div>
                        </AnimateHeight>
                        <p className="px-5 py-8">
                            The products in your store depend on age suitability assigned to your account. You can
                            <Link
                                href=""
                                className="ml-1 font-semibold text-primary hover:text-black"
                                onClick={() => modal?.current?.open()}
                            >
                                manage products availability here
                            </Link>
                            .
                        </p>
                    </div>
                </div>

                <div className="flex-1 p-4 lg:p-10">
                    <ul className="mb-[30px] flex gap-5 text-black-dark">
                        <li>
                            <button
                                type="button"
                                className={`border-b-2 border-black-dark  py-1 ${
                                    activeTab === 'products' && '!border-primary font-semibold text-primary'
                                }`}
                                onClick={() => setActiveTab('products')}
                            >
                                My Products
                            </button>
                        </li>

                        <li>
                            <button
                                type="button"
                                className={`border-b-2 border-black-dark  py-1 ${
                                    activeTab === 'excludedProducts' && '!border-primary font-semibold text-primary'
                                }`}
                                onClick={() => setActiveTab('excludedProducts')}
                            >
                                Excluded Products
                            </button>
                        </li>
                    </ul>

                    <div className="space-y-[30px]">
                        <p className="text-black-dark">
                            Active products are products showing in your store based on your default product
                            availability selections.
                        </p>

                        <div className="flex flex-col justify-between gap-2 sm:flex-row">
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

                            <div className="flex-none md:w-[240px]">
                                <select
                                    className="form-select"
                                    defaultValue="5"
                                    onChange={(e) => {
                                        setParams({
                                            ...params,
                                            order: e.target.value,
                                        });
                                    }}
                                >
                                    <option value="5">Recent</option>
                                    <option value="1">Price (High to low)</option>
                                    <option value="2">Price (Low to high)</option>
                                    <option value="3">A-Z</option>
                                    <option value="4">Z-A</option>
                                </select>
                            </div>
                        </div>

                        {activeTab === 'products' ? (
                            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
                                {productListData.length>0 ? productListData.map((product) => {
                                    return (
                                        <OrganizationProductCard
                                            key={product.id}
                                            title={product.title}
                                            price={product.price}
                                            suitabilityAge={product.product_suitability_ages
                                                .map((age) => {
                                                    return age.age;
                                                })
                                                .join(' - ')}
                                            // deleteCard={deleteCardData(product.id)}
                                        />
                                    );
                                }) : <div className="py-4 text-center font-semibold">No data found</div>}
                            </div>
                        ) : (
                            <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-5 ">
                                <div className="py-10 text-center sm:col-span-2 lg:col-span-3 xl:col-span-5">
                                    No products available
                                </div>
                            </div>
                        )}

                        <div className="!mt-5 flex items-center justify-end gap-2 md:!mt-11">
                            <select
                                className="form-select w-auto"
                                defaultValue="100"
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
                            {meta.last_page > 1 && (
                                <>
                                    <div className="flex">
                                        <input
                                            type="number"
                                            className="form-input max-w-[60px] rounded-r-none"
                                            value={numberPage}
                                            onChange={(e) => {
                                                setNumberPage(e.target.value);
                                            }}
                                        />
                                        <button type="button" className="btn rounded-l-none" onClick={ProductData}>
                                            Go
                                        </button>
                                    </div>
                                    <div>
                                        {meta.current_page} of {meta.last_page} page(s)
                                    </div>
                                </>
                            )}
                        </div>
                        {meta.last_page > 1 && (
                            <>
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
                            </>
                        )}
                    </div>
                </div>

                <OrganizationProductsAvailability
                    ref={modal}
                    refresh={refresh}
                    data={ages}
                    getOrganizationAges={getOrganizationAges}
                ></OrganizationProductsAvailability>
            </div>
        </>
    );
};

export default Products;

Products.middleware = {
    auth: true,
    verify: true,
};
