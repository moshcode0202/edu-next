import IconCube from '@/components/Icon/IconCube';
import IconDown from '@/components/Icon/IconDown';
import IconSearch from '@/components/Icon/IconSearch';
import { useRef, useState, useEffect } from 'react';
import Header from '@/components/Layout/Header';
import AdminCustomerEdit from '@/components/Admin/Customer/AdminCustomerEdit';
import helper from '@/libs/helper';
import axios from '@/libs/axios';

const Customers = () => {
    const modal = useRef();
    const [params, setParams] = useState({
        page: 1,
        perPage: 100,
        search: '',
        orderField: 'title',
        orderType: 'asc',
    });
    const [selectedCustomer, setSelectedCustomer] = useState({});
    const [customersList, setCustomersList] = useState([]);
    const [meta, setMeta] = useState({});
    const [numberPage, setNumberPage] = useState(1);

    useEffect(() => {
        customersData();
    }, [params]);

    const customersData = async () => {
        try {
            const { data } = await axios.get('/admin/customers', {
                params: {
                    current_page: params.page,
                    per_page: params.perPage,
                    filter: params.search,
                    order_field: params.orderField,
                    order: params.orderType,
                    page: numberPage,
                },
            });
            setCustomersList(data.data);
            setMeta(data.meta);
            setSelectedCustomer(data.data);
        } catch {}
    };

    const sortCustomersData = (name) => {
        setParams({
            ...params,
            orderField: name,
            orderType: params.orderField === name ? (params.orderType === 'asc' ? 'desc' : 'asc') : 'asc',
        });
    };
    const previousPageButton = async (previous_page_url) => {
        try {
            const { data } = await axios.get(`/admin/customers/${previous_page_url}`);
            setCustomersList(data.data);
            setMeta(data.meta);
        } catch {}
    };
    const nextPageButton = async (next_page_url) => {
        try {
            const { data } = await axios.get(`/admin/customers/${next_page_url}`);
            setCustomersList(data.data);
            setMeta(data.meta);
        } catch {}
    };

    return (
        <>
            <Header title={<li className="font-semibold text-primary">Customers</li>}></Header>

            <div className="p-4 lg:p-10 lg:pt-[45px]">
                <div className="mb-5 justify-end md:flex">
                    <div className="grid grid-cols-2 gap-5 md:flex">
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
                    </div>
                </div>

                <div>
                    <div className="mb-5 overflow-x-auto shadow-[0_4px_4px_rgba(0,0,0,0.05)]">
                        <table>
                            <thead className="bg-[#F7F7F7]">
                                <tr>
                                    <th className={`${params.orderField === 'customerName' ? 'text-primary' : ''}`}>
                                        <div
                                            className="inline-flex items-center gap-1 hover:text-primary"
                                            onClick={() => sortCustomersData('customerName')}
                                        >
                                            Customer Name
                                            {params.orderField === 'customerName' ? (
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
                                    <th className={`${params.orderField === 'customerEmail' ? 'text-primary' : ''}`}>
                                        <div
                                            className="inline-flex items-center gap-1 hover:text-primary"
                                            onClick={() => sortCustomersData('customerEmail')}
                                        >
                                            Customer Email
                                            {params.orderField === 'customerEmail' ? (
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
                                    <th className={`${params.orderField === 'city' ? 'text-primary' : ''}`}>
                                        <div
                                            className="inline-flex items-center gap-1 hover:text-primary"
                                            onClick={() => sortCustomersData('city')}
                                        >
                                            Shipping City
                                            {params.orderField === 'city' ? (
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
                                    <th className={`${params.orderField === 'state' ? 'text-primary' : ''}`}>
                                        <div
                                            className="inline-flex items-center gap-1 hover:text-primary"
                                            onClick={() => sortCustomersData('state')}
                                        >
                                            Shipping State
                                            {params.orderField === 'state' ? (
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

                                    <th className={`${params.orderField === 'date' ? 'text-primary' : ''}`}>
                                        <div
                                            className="inline-flex items-center gap-1 hover:text-primary"
                                            onClick={() => sortCustomersData('date')}
                                        >
                                            Date
                                            {params.orderField === 'date' ? (
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
                                    <th className="w-[100px]"></th>
                                </tr>
                            </thead>
                            <tbody>
                                {customersList.length > 0 ? (
                                    customersList.map((customer) => {
                                        const dateString = customer.created_at;
                                        const date = new Date(dateString);
                                        const formateDate = date.toLocaleString('en-US', {
                                            day: 'numeric',
                                            month: 'long',
                                            year: 'numeric',
                                        });
                                        return (
                                            <tr key={customer.id}>
                                                <td
                                                    className="cursor-pointer font-semibold text-primary"
                                                    onClick={() => {
                                                        setTimeout(() => {
                                                            modal?.current?.open(customer.id);
                                                        });
                                                    }}
                                                >
                                                    {customer.first_name} {customer.last_name}
                                                </td>
                                                <td>{customer.email}</td>
                                                <td>{helper.isEmpty(customer.shipping_address_city)}</td>
                                                <td>{helper.isEmpty(customer.shipping_address_state)}</td>
                                                <td>{formateDate ? formateDate : '-'}</td>
                                                <td>
                                                    <button type="button" className="text-black hover:text-primary">
                                                        <IconCube />
                                                    </button>
                                                </td>
                                            </tr>
                                        );
                                    })
                                ) : (
                                    <tr className="mt-5 mb-5 flex place-items-center justify-center text-3xl text-danger">
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
                            defaultValue="100"
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
                                    <button type="button" className="btn rounded-l-none" onClick={customersData}>
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
                <AdminCustomerEdit ref={modal} data={selectedCustomer.id} refresh={customersData}></AdminCustomerEdit>
            </div>
        </>
    );
};

export default Customers;

Customers.middleware = {
    auth: true,
    verify: true,
};
