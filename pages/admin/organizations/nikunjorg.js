import IconDown from '@/components/Icon/IconDown';
import IconSearch from '@/components/Icon/IconSearch';
import Link from 'next/link';
import Header from '@/components/Layout/Header';
import IconMenubar from '@/components/Icon/IconMenubar';
import CommonSideModal from '@/components/Common/CommonSideModal';
import { useEffect, useRef, useState } from 'react';
import OrganizationEdit from '@/components/OrganizationEdit';
import axios from '@/libs/axios';

const Home = () => {
    const user_modal = useRef();
    const edit_modal = useRef();
    const add_modal = useRef();
    const add = useRef();
    const [organization, setOrganization] = useState([]);
    const [search, setSearch] = useState('');
    const [filteredItems, setFilteredItems] = useState(organization);
    const [order, setOrder] = useState('asc');

    useEffect(() => {
        fetchData();
    }, []);
    useEffect(() => {
        setFilteredItems(() => {
            return organization.filter((item) => {
                return item.name.toLowerCase().includes(search.toLowerCase());
            });
        });
    }, [search, organization]);

    const fetchData = async () => {
        const { data } = await axios.get(`/admin/organizations/`);
        if (data.data) {
            setOrganization(data.data);
        }
    };

    const refreshData = () => {
        fetchData();
    };

    const [itemsPerPage, setItemsPerPage] = useState(10);
    const [currentPage, setCurrentPage] = useState(1);

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = filteredItems.slice(indexOfFirstItem, indexOfLastItem);

    const totalPages = Math.ceil(organization.length / itemsPerPage);
    const pageNumbers = Array.from({ length: totalPages }, (ele, i) => i + 1);

    const sortOrganizationData = (name) => {
        console.log(name, 'click');
        setOrder(name);

        let result = organization;
        let resultData = result.sort((a, b) => {
            if (name === 'school') {
                if (order === 'asc') {
                    if (a.name < b.name) {
                        return -1;
                    }
                    if (a.name > b.name) {
                        return 1;
                    }
                    return 0;
                } else {
                    if (b.name < a.name) {
                        return -1;
                    }
                    if (b.name > a.name) {
                        return 1;
                    }
                    return 0;
                }
            } else if (name === 'domain') {
                if (order === 'asc') {
                    if (a.id < b.id) {
                        return -1;
                    }
                    if (a.id > b.id) {
                        return 1;
                    }
                    return 0;
                } else {
                    if (b.id < a.id) {
                        return -1;
                    }
                    if (b.id > a.id) {
                        return 1;
                    }
                    return 0;
                }
            } else if (name === 'state') {
                if (order === 'asc') {
                    if (a.name < b.name) {
                        return -1;
                    }
                    if (a.name > b.name) {
                        return 1;
                    }
                    return 0;
                } else {
                    if (b.name < a.name) {
                        return -1;
                    }
                    if (b.name > a.name) {
                        return 1;
                    }
                    return 0;
                }
            } else if (name === 'status') {
                if (order === 'asc') {
                    if (a.id < b.id) {
                        return -1;
                    }
                    if (a.id > b.id) {
                        return 1;
                    }
                    return 0;
                } else {
                    if (b.id < a.id) {
                        return -1;
                    }
                    if (b.id > a.id) {
                        return 1;
                    }
                    return 0;
                }
            }
        });
        setOrganization(resultData);
        setOrder(order === 'asc' ? 'desc' : 'asc');
        console.log(resultData);
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
            {/* <button
                                            type="button"
                                            className="w-full text-left "
                                            onClick={handleClick}
                                            ref={setReferenceElement}
                                        >
                                            <div className="form-input flex items-center truncate">
                                                <span className="truncate">8</span>
                                                <IconDown className="ml-auto h-5 w-5 shrink-0" />
                                            </div>
                                        </button>

                                        {showTooltip && (
                                            <Field as="div" name="product_suitability_age">
                                                <div
                                                    ref={setPopperElement}
                                                    style={styles.popper}
                                                    {...attributes.popper}
                                                    className="relative mt-1 grid max-h-80 w-full max-w-[400px] grid-cols-2 overflow-auto bg-white p-1 pt-0 shadow sm:min-w-[400px]"
                                                >
                                                    {organizationAges.map((age) => {
                                                        return (
                                                            <div
                                                                key={age.id}
                                                                className="false flex w-full cursor-pointer items-center gap-1.5 px-4 py-2 hover:bg-black-light"
                                                                name={age.age}
                                                            >
                                                                <input
                                                                    type="checkbox"
                                                                    checked={checkedAge.includes(age.id)}
                                                                    onChange={changeOrganizationAge}
                                                                    value={age.id}
                                                                />
                                                                {age.age}
                                                            </div>
                                                        );
                                                    })}
                                                </div>
                                            </Field>
                                        )} */}

            <div className="p-4 lg:p-10 lg:pt-[45px]">
                <div className="mb-5 justify-end md:flex">
                    <div className="grid grid-cols-2 gap-5 md:flex">
                        <button type="button" className="btn shrink-0" onClick={() => add.current.open()}>
                            Add New
                        </button>
                        <select className="form-select">
                            <option>Status...</option>
                            <option>Published</option>
                            <option>Unpublished</option>
                            <option>Archived</option>
                        </select>

                        <div className="flex-none md:w-[240px]">
                            <div className="relative">
                                <input
                                    type="text"
                                    className="form-input pr-10"
                                    placeholder="Search..."
                                    value={search}
                                    onChange={(e) => setSearch(e.target.value)}
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
                                            <IconDown />
                                        </div>
                                    </th>
                                    <th>
                                        <div className="inline-flex items-center gap-1">
                                            <button type="button" onClick={() => sortOrganizationData('domain')}>
                                                Internal Domain
                                            </button>
                                            <IconDown />
                                        </div>
                                    </th>
                                    <th>
                                        <div className="inline-flex items-center gap-1">
                                            <button type="button" onClick={() => sortOrganizationData('state')}>
                                                State
                                            </button>
                                            <IconDown />
                                        </div>
                                    </th>
                                    <th>
                                        <div className="inline-flex items-center gap-1">
                                            <button type="button" onClick={() => sortOrganizationData('status')}>
                                                Status
                                            </button>
                                            <IconDown />
                                        </div>
                                    </th>
                                    <th className="w-[100px]"></th>
                                </tr>
                            </thead>
                            <tbody>
                                {currentItems.map((item, i) => {
                                    return (
                                        <tr key={i}>
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
                                                <span className="status bg-black-dark/10 text-black-dark">
                                                    {item.id}
                                                </span>
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>

                    <div className="flex items-center justify-end gap-2">
                        <select
                            className="form-select w-auto"
                            value={itemsPerPage}
                            onChange={(e) => {
                                setItemsPerPage(e.target.value);
                            }}
                        >
                            <option value="5">5</option>
                            <option value="10">10</option>
                            <option value="20">20</option>
                            <option value="30">30</option>
                            <option value="50">50</option>
                            <option value="100">100</option>
                        </select>
                        <div>of 100 page(s)</div>
                    </div>
                    <section className="mx-3 flex">
                        {pageNumbers.map((pageNumber) => (
                            <button
                                className="bg-blue-500 hover:bg-blue-700 mx-3 rounded py-2 px-4 font-bold text-black"
                                key={pageNumber}
                                onClick={() => handlePageChange(pageNumber)}
                            >
                                {pageNumber}
                            </button>
                        ))}
                    </section>
                </div>

                {/* ********* Popup ********* */}

                <CommonSideModal ref={user_modal}>
                    <div className="flex flex-col justify-between md:h-full">
                        <div className="space-y-4 xl:space-y-[30px]">
                            <div className="flex items-center justify-between ">
                                <h2 className="text-xl font-semibold">Users</h2>
                                <button type="button" className="btn" onClick={() => add_modal.current.open()}>
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
                                                onClick={() => edit_modal.current.open()}
                                            >
                                                James Bury
                                            </td>
                                            <td>Full Access</td>
                                            <td>Active</td>
                                        </tr>

                                        <tr>
                                            <td
                                                className="cursor-pointer font-semibold text-primary"
                                                onClick={() => edit_modal.current.open()}
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

                <CommonSideModal ref={edit_modal}>
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

                <CommonSideModal ref={add_modal}>
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

                <OrganizationEdit ref={add} data={{}} refresh={refreshData} />
            </div>
        </>
    );
};

export default Home;

Home.middleware = {
    auth: true,
    verify: true,
};
