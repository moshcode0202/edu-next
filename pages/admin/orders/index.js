import IconDown from '@/components/Icon/IconDown';
import IconSearch from '@/components/Icon/IconSearch';
import Header from '@/components/Layout/Header';
import OrganizationEdit from '@/components/OrganizationEdit';
import axios from '@/libs/axios';
import helper from '@/libs/helper';
import Link from 'next/link';
const Orders = () => {
    return (
        <>
            <Header title={<li className="font-semibold text-primary">Orders</li>}></Header>

            <div className="p-4 lg:p-10 lg:pt-[45px]">
                <div className="mb-5 justify-end md:flex">
                    <div className="grid grid-cols-2 gap-5 md:flex">
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
                                            <button type="button">Order ID</button>
                                            <IconDown />
                                        </div>
                                    </th>
                                    <th>
                                        <div className="inline-flex items-center gap-1">
                                            <button type="button">Customer</button>
                                            <IconDown />
                                        </div>
                                    </th>
                                    <th>
                                        <div className="inline-flex items-center gap-1">
                                            <button type="button">Organization</button>
                                            <IconDown />
                                        </div>
                                    </th>
                                    <th>
                                        <div className="inline-flex items-center gap-1">
                                            <button type="button">Status</button>

                                            <IconDown />
                                        </div>
                                    </th>
                                    <th>
                                        <div className="inline-flex items-center gap-1">
                                            <button type="button">Date</button>

                                            <IconDown />
                                        </div>
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>
                                        <Link
                                            href="/admin/orders/1"
                                            className="font-semibold text-primary hover:text-black"
                                        >
                                            #eRO-100
                                        </Link>
                                    </td>
                                    <td className="font-semibold text-primary">Rob Blunt</td>
                                    <td className="font-semibold text-primary">School A</td>
                                    <td>
                                        <span className="status">Processing</span>
                                    </td>
                                    <td>07 June 2023</td>
                                </tr>

                                <tr>
                                    <td>
                                        <Link
                                            href="/admin/orders/1"
                                            className="font-semibold text-primary hover:text-black"
                                        >
                                            #eRO-101
                                        </Link>
                                    </td>
                                    <td className="font-semibold text-primary">Mary Murphy</td>
                                    <td className="font-semibold text-primary">School B</td>
                                    <td>
                                        <span className="status bg-success/10 text-success">Complete</span>
                                    </td>
                                    <td>06 June 2023</td>
                                </tr>

                                <tr>
                                    <td>
                                        <Link
                                            href="/admin/orders/1"
                                            className="font-semibold text-primary hover:text-black"
                                        >
                                            #eRO-102
                                        </Link>
                                    </td>
                                    <td className="font-semibold text-primary">Pat Short</td>
                                    <td className="font-semibold text-primary">School C</td>
                                    <td>
                                        <span className="status bg-danger/10 text-danger">Cancelled</span>
                                    </td>
                                    <td>06 June 2023</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    <div className="flex items-center justify-end gap-2">
                        <select className="form-select w-auto">
                            {helper.perPageOption.map((option) => {
                                return (
                                    <option key={option} value={option}>
                                        {option}
                                    </option>
                                );
                            })}
                        </select>
                        <div>of 100 page(s)</div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Orders;

Orders.middleware = {
    auth: true,
    verify: true,
};
