import IconDown from '@/components/Icon/IconDown';
import Header from '@/components/Layout/Header';
import IconQuestion from '@/components/Icon/IconQuestion';
import OrganizationDropdown from '@/components/Organization/OrganizationDropdown';
import helper from '@/libs/helper';

const Donations = () => {
    const donations = [
        {
            id: 1,
            transactionId: '#eRO-100',
            name: 'Rob Blunt',
            actualDonation: '$10.00',
            transactionFees: '$0.25',
            donationDisbursed: '$9.75',
            status: 'Processing',
            date: '07 June 2023',
        },
        {
            id: 2,
            transactionId: '#eRO-101',
            name: 'Mary Murphy',
            actualDonation: '$10.00',
            transactionFees: '$0.25',
            donationDisbursed: '$9.75',
            status: 'Complete',
            date: '07 June 2023',
        },
        {
            id: 3,
            transactionId: '#eRO-102',
            name: 'Pat Short',
            actualDonation: '$10.00',
            transactionFees: '$0.25',
            donationDisbursed: '$9.75',
            status: 'Cancelled',
            date: '07 June 2023',
        },
    ];
    return (
        <>
            <Header
                title={<li className="font-semibold text-primary">Donations</li>}
                action={<OrganizationDropdown />}
            ></Header>

            <div className="p-4 lg:p-10 lg:pt-[45px]">
                <div className="mb-5 overflow-x-auto shadow-[0_4px_4px_rgba(0,0,0,0.05)]">
                    <table>
                        <thead className="bg-[#F7F7F7]">
                            <tr>
                                <th>
                                    <div className="inline-flex items-center gap-1">
                                        Transaction ID
                                        <IconDown />
                                        <IconQuestion />
                                    </div>
                                </th>
                                <th>Name</th>
                                <th>
                                    <div className="inline-flex items-center gap-1">
                                        Actual Donation
                                        <IconQuestion />
                                    </div>
                                </th>
                                <th>
                                    <div className="inline-flex items-center gap-1">
                                        Transaction Fees
                                        <IconQuestion />
                                    </div>
                                </th>
                                <th>
                                    <div className="inline-flex items-center gap-1">
                                        Donation Disbursed
                                        <IconQuestion />
                                    </div>
                                </th>
                                <th>
                                    <div className="inline-flex items-center gap-1">
                                        Date
                                        <IconDown />
                                    </div>
                                </th>
                                <th>
                                    <div className="inline-flex items-center gap-1">
                                        Status
                                        <IconQuestion />
                                    </div>
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {donations.map((donation) => {
                                return (
                                    <tr key={donation.id}>
                                        <td>{donation.transactionId}</td>
                                        <td>{donation.name}</td>
                                        <td>{donation.actualDonation}</td>
                                        <td>{donation.transactionFees}</td>
                                        <td>{donation.donationDisbursed}</td>
                                        <td>{donation.date}</td>
                                        <td>
                                            <span
                                                className={`status ${
                                                    donation.status === 'Complete'
                                                        ? '!bg-success/10 !text-success'
                                                        : donation.status === 'Cancelled'
                                                        ? '!bg-danger/10 !text-danger'
                                                        : ''
                                                }`}
                                            >
                                                {donation.status}
                                            </span>
                                        </td>
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
        </>
    );
};

export default Donations;

Donations.middleware = {
    auth: true,
    verify: true,
};
