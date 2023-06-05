import IconDown from '@/components/Icon/IconDown';
import IconSearch from '@/components/Icon/IconSearch';
import { useRef, useState, useEffect } from 'react';
import Header from '@/components/Layout/Header';
import AdminDonation from '@/components/Admin/AdminDonation';
import helper from '@/libs/helper';
import axios from '@/libs/axios';
import Link from 'next/link';

const Donations = () => {
    const modal = useRef();
    const donations = [
        {
            id: 1,
            donationId: '#eRO-100',
            customer: 'Rob Blunt',
            organization: 'School A',
            amount: '$25.00',
            status: 'Complete',
            date: '07 June 2023',
        },
        {
            id: 2,
            donationId: '#eRO-101',
            customer: 'Mary Murphy',
            organization: 'School B',
            amount: '$25.00',
            status: 'Complete',
            date: '07 June 2023',
        },
        {
            id: 3,
            donationId: '#eRO-102',
            customer: 'Pat Short',
            organization: 'School c',
            amount: '$25.00',
            status: 'Complete',
            date: '07 June 2023',
        },
    ];
    
    return (
        <>
            <Header title={<li className="font-semibold text-primary">Donations</li>}></Header>

            <div className="p-4 lg:p-10 lg:pt-[45px]">
                <div className="mb-5 justify-end md:flex">
                    <div className="gap-5 md:flex">
                        <div className="flex-none md:w-[240px]">
                            <div className="relative">
                                <input type="text" className="form-input pr-10" placeholder="Search..." />
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
                                            Donation ID
                                            <IconDown />
                                        </div>
                                    </th>
                                    <th>
                                        <div className="inline-flex items-center gap-1">
                                            Customer
                                            <IconDown />
                                        </div>
                                    </th>
                                    <th>
                                        <div className="inline-flex items-center gap-1">
                                            Organization
                                            <IconDown />
                                        </div>
                                    </th>
                                    <th>
                                        <div className="inline-flex items-center gap-1">
                                            Amount
                                            <IconDown />
                                        </div>
                                    </th>
                                    <th>
                                        <div className="inline-flex items-center gap-1">
                                            Status
                                            <IconDown />
                                        </div>
                                    </th>
                                    <th>
                                        <div className="inline-flex items-center gap-1">
                                            Date
                                            <IconDown />
                                        </div>
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {donations.map((donation) => {
                                    return (
                                        <tr key={donation.id}>
                                            <td
                                                className="cursor-pointer font-semibold text-primary hover:text-black"
                                                onClick={() => modal.current.open()}
                                            >
                                                {donation.donationId}
                                            </td>
                                            <td className="font-semibold text-primary">{donation.customer}</td>
                                            <td className="font-semibold text-primary">{donation.organization}</td>
                                            <td>{donation.amount}</td>
                                            <td>
                                                <span className="status bg-success/10 text-success">
                                                    {donation.status}
                                                </span>
                                            </td>
                                            <td>{donation.date}</td>
                                        </tr>
                                    );
                                })}

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

                <AdminDonation ref={modal}></AdminDonation>
            </div>
        </>
    );
};

export default Donations;

Donations.middleware = {
    auth: true,
    verify: true,
};
