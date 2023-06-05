import IconSearch from '@/components/Icon/IconSearch';
import Link from 'next/link';
import Header from '@/components/Layout/Header';
import IconMenubar from '@/components/Icon/IconMenubar';
import CommonSideModal from '@/components/Common/CommonSideModal';
import { useEffect, useRef, useState } from 'react';
import OrganizationEdit from '@/components/OrganizationEdit';
import axios from '@/libs/axios';
import Pagination from 'rc-pagination';
import 'rc-pagination/assets/index.css';
import IconDown from '@/components/Icon/IconDown';
const Home = () => {
    
    const modal = useRef();
    const userModal = useRef();
    const editModal = useRef();
    const addModal = useRef();

    const [organizations, setOrganizations] = useState([]);
    const [meta, setMeta] = useState({});

    const [params, setParams] = useState({
        search: '',
        orderField: 'school',
        orderType: 'asc',
        page: 1,
        perPage: 10,
        status: '',
    });

    useEffect(() => {
        organizationData();
    }, [params]);

    const organizationData = async () => {
        try {
            const { data } = await axios.get('/admin/organizations/', {
                params: {
                    order_field: params.orderField,
                    order: params.orderType,
                    per_page: params.perPage,
                    filter: params.search,
                    page: params.page,
                    status: params.status,
                },
            });
            setOrganizations(data.data);
            setMeta(data.meta);
        } catch {}
    };

    const sortOrganizationData = (name) => {
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
                        <li className="font-semibold text-primary">Organizations</li>
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
                    <div className="grid grid-cols-2 gap-5 md:flex">
                        <button type="button" className="btn shrink-0" onClick={() => modal?.current?.open()}>
                            Add New
                        </button>
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
                            <option value="published">Published</option>
                            <option value="unpublished">Unpublished</option>
                            <option value="archived">Archived</option>
                        </select>

                        <div className="flex-none md:w-[240px]">
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
                                            <button type="button" onClick={() => sortOrganizationData('school')}>
                                                School
                                            </button>

                                            {params.orderField === 'school' ? (
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
                                            <button type="button" onClick={() => sortOrganizationData('domain')}>
                                                Internal Domain
                                            </button>
                                            {params.orderField === 'domain' ? (
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
                                            <button type="button" onClick={() => sortOrganizationData('state')}>
                                                State
                                            </button>
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
                                    <th>
                                        <div className="inline-flex items-center gap-1">
                                            <button type="button" onClick={() => sortOrganizationData('status')}>
                                                Status
                                            </button>
                                            {params.orderField === 'status' ? (
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
                                {organizations.length > 0 ? (
                                    organizations.map((item) => {
                                        return (
                                            <tr key={item.id}>
                                                <td>
                                                    <Link
                                                        href={`/admin/organizations/${item.id}`}
                                                        className="font-semibold text-primary hover:text-black"
                                                    >
                                                        {item.name}
                                                    </Link>
                                                </td>
                                                <td className="font-semibold text-primary">{item.id}</td>
                                                <td>{item.name}</td>

                                                <td>
                                                    <span className="status bg-black-dark/10 text-black-dark"></span>
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
                        total={meta.total}
                        current={params.page}
                        pageSize={params.perPage}
                        onChange={changePageSize}
                    />
                </div>

                <CommonSideModal ref={userModal}>
                    <div className="flex flex-col justify-between md:h-full">
                        <div className="space-y-4 xl:space-y-[30px]">
                            <div className="flex items-center justify-between ">
                                <h2 className="text-xl font-semibold">Users</h2>
                                <button type="button" className="btn" onClick={() => addModal.current.open()}>
                                    Add User
                                </button>
                            </div>

                            <div className="overflow-x-auto shadow-[0_4px_4px_rgba(0,0,0,0.05)]">
                                <table>
                                    <thead className="bg-[#F7F7F7]">
                                        <tr>
                                            <th>Name</th>
                                            <th>Role</th>
                                            <th>Status</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td
                                                className="cursor-pointer font-semibold text-primary"
                                                onClick={() => editModal.current.open()}
                                            >
                                                James Bury
                                            </td>
                                            <td>Full Access</td>
                                            <td>Active</td>
                                        </tr>

                                        <tr>
                                            <td
                                                className="cursor-pointer font-semibold text-primary"
                                                onClick={() => editModal.current.open()}
                                            >
                                                Rita Clancy
                                            </td>
                                            <td>Full Access</td>
                                            <td className="font-semibold text-warning">Pending</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </CommonSideModal>

                <CommonSideModal ref={editModal}>
                    <form className="flex flex-col justify-between md:h-full">
                        <div className="space-y-4 xl:space-y-[30px]">
                            <div className="flex items-center gap-5">
                                <h2 className="text-xl font-semibold">Edit User</h2>
                                <p className="inline-flex gap-2 font-semibold">
                                    <Link href="#" className="text-success hover:text-black/50">
                                        Approve
                                    </Link>
                                    <Link href="#" className="text-danger hover:text-black/50">
                                        Reject
                                    </Link>
                                </p>
                            </div>

                            <h3 className="text-lg font-semibold text-black-dark">Information</h3>

                            <div className="grid gap-4 sm:grid-cols-2 xl:gap-[30px]">
                                <div>
                                    <label className="form-label">First Name</label>
                                    <input type="text" className="form-input" placeholder="James" />
                                </div>

                                <div>
                                    <label className="form-label">Last Name</label>
                                    <input type="text" className="form-input" placeholder="Bury" />
                                </div>

                                <div className="sm:col-span-2">
                                    <label className="form-label">Email Address</label>
                                    <input type="text" className="form-input mb-1" placeholder="Email Address..." />
                                    <p className="text-sm italic text-black-dark">
                                        An email will be sent to confirm the new email address.
                                    </p>
                                </div>

                                <div>
                                    <label className="form-label">Phone Prefix</label>
                                    <select className="form-select">
                                        <option>Phone Prefix...</option>
                                        <option>Phone</option>
                                        <option>Phone</option>
                                        <option>Phone</option>
                                    </select>
                                </div>

                                <div>
                                    <label className="form-label">Phone Number</label>
                                    <input type="text" className="form-input" placeholder="Phone Number..." />
                                </div>

                                <div>
                                    <label className="form-label">Role</label>
                                    <select className="form-select">
                                        <option>Role...</option>
                                        <option>Role</option>
                                        <option>Role</option>
                                        <option>Role</option>
                                    </select>
                                </div>

                                <div>
                                    <label className="form-label">Role in Organization</label>
                                    <input type="text" className="form-input" placeholder="Role in Organization.." />
                                </div>

                                <div className="sm:col-span-2">
                                    <label className="form-label">Internal Notes</label>
                                    <textarea className="form-textarea" placeholder="Internal Notes..."></textarea>
                                </div>
                            </div>
                        </div>
                        <div className="mt-5 text-right">
                            <button type="button" className="btn">
                                Save
                            </button>
                        </div>
                    </form>
                </CommonSideModal>

                <CommonSideModal ref={addModal}>
                    <form className="flex h-full flex-col justify-between">
                        <div className="space-y-4 xl:space-y-[30px]">
                            <h2 className="text-xl font-semibold">Add User</h2>

                            <h3 className="text-lg font-semibold text-black-dark">Information</h3>

                            <div className="sm:col-span-2">
                                <label className="form-label">Email Address</label>
                                <input type="text" className="form-input" placeholder="Email Address..." />
                            </div>

                            <div>
                                <label className="form-label">Role</label>
                                <select className="form-select">
                                    <option>Role...</option>
                                    <option>Role</option>
                                    <option>Role</option>
                                    <option>Role</option>
                                </select>
                            </div>
                        </div>

                        <div className="mt-5 text-right">
                            <button type="button" className="btn">
                                Save
                            </button>
                        </div>
                    </form>
                </CommonSideModal>

                <OrganizationEdit ref={modal} data={{}} refresh={organizationData} />
            </div>
        </>
    );
};

export default Home;

Home.middleware = {
    auth: true,
    verify: true,
};
