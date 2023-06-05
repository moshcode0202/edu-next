import Header from '@/components/Layout/Header';
import Link from 'next/link';

const Order = () => {
    return (
        <>
            <Header
                left={
                    <>
                        <li className="font-semibold text-primary">
                            <Link href="/admin/orders" className="hover:text-primary/80">
                                Orders
                            </Link>
                        </li>
                        <li>/ #eRO-100</li>
                    </>
                }
            ></Header>

            <div className="p-4 lg:p-10 lg:pt-[45px]">
                <div className="mb-5">
                    <div className="mb-5 flex flex-col justify-between space-y-3 sm:mb-1 sm:flex-row sm:items-center sm:space-y-0">
                        <p className="inline-flex flex-1 items-center">
                            07 June 2023 at 10:15 am <span className="status ml-5">Processing</span>
                        </p>

                        <select className="form-select w-full flex-none font-semibold text-black sm:max-w-[105px]">
                            <option>Actions</option>
                            <option>Published</option>
                            <option>Unpublished</option>
                            <option>Archived</option>
                        </select>
                    </div>

                    <div className="grid grid-cols-2 items-center justify-between gap-5 md:flex">
                        <h2 className="text-xl font-semibold">Products</h2>

                        <div className="flex-none md:w-[160px]">
                            <input type="text" className="form-input" placeholder="Cancel order" />
                        </div>
                    </div>
                </div>

                <div className="flex flex-col gap-4 xl:flex-row xl:gap-[30px]">
                    <div className="mb-5 flex-1 lg:mb-0">
                        <div className="mb-[30px] overflow-x-auto">
                            <table>
                                <thead className="bg-[#F7F7F7]">
                                    <tr>
                                        <th className="w-[50px]"></th>
                                        <th>SKU</th>
                                        <th>Title</th>
                                        <th>Vendor</th>
                                        <th>Cost</th>
                                        <th>Qty</th>
                                        <th>Total</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>
                                            <div className="w-max">
                                                <img
                                                    src="/assets/images/profile_img1.png"
                                                    alt=""
                                                    className="h-[30px] w-[30px] rounded-sm object-cover"
                                                />
                                            </div>
                                        </td>
                                        <td className="font-semibold text-primary">A1235</td>
                                        <td className="font-semibold text-primary">Product A - VA</td>
                                        <td className="font-semibold text-primary">Vendor A</td>
                                        <td>$35.00</td>
                                        <td>1</td>
                                        <td className="font-semibold">$35.00</td>
                                    </tr>

                                    <tr>
                                        <td>
                                            <div className="w-max">
                                                <img
                                                    src="/assets/images/profile_img2.png"
                                                    alt=""
                                                    className="h-[30px] w-[30px] rounded-sm object-cover"
                                                />
                                            </div>
                                        </td>
                                        <td className="font-semibold text-primary">B5324</td>
                                        <td className="font-semibold text-primary">Product B - VB</td>
                                        <td className="font-semibold text-primary">Vendor B</td>
                                        <td>$15.00</td>
                                        <td>3</td>
                                        <td className="font-semibold">$45.00</td>
                                    </tr>

                                    <tr>
                                        <td>
                                            <div className="w-max">
                                                <img
                                                    src="/assets/images/profile_img3.png"
                                                    alt=""
                                                    className="h-[30px] w-[30px] rounded-sm object-cover"
                                                />
                                            </div>
                                        </td>
                                        <td className="font-semibold text-primary">C4235</td>
                                        <td className="font-semibold text-primary">Product C - VC</td>
                                        <td className="font-semibold text-primary">Vendor C</td>
                                        <td>$25.00</td>
                                        <td>2</td>
                                        <td className="font-semibold">$50.00</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>

                        <h2 className="mb-2.5 text-xl font-semibold">Summary</h2>

                        <div className="mb-14 overflow-x-auto">
                            <table className="summary-table">
                                <tbody>
                                    <tr>
                                        <td>Subtotal</td>
                                        <td className="w-[100px] italic">6 Items</td>
                                        <td className="w-[100px] text-right">$130.00</td>
                                    </tr>

                                    <tr>
                                        <td>Tax</td>
                                        <td className="w-[100px] italic">15%</td>
                                        <td className="w-[100px] text-right">$19.50</td>
                                    </tr>

                                    <tr>
                                        <td>Shipping</td>
                                        <td className="w-[100px] italic"></td>
                                        <td className="w-[100px] text-right">$15.00</td>
                                    </tr>

                                    <tr>
                                        <td className="font-semibold">Total</td>
                                        <td className="w-[100px] italic"></td>
                                        <td className="w-[100px] text-right font-semibold">$145.00</td>
                                    </tr>

                                    <tr>
                                        <td>Transaction Fees</td>
                                        <td className="w-[100px] italic"></td>
                                        <td className="w-[100px] text-right">$1.20</td>
                                    </tr>

                                    <tr>
                                        <td>Donation Disbursed</td>
                                        <td className="w-[100px] italic">10%</td>
                                        <td className="w-[100px] text-right">$13.00</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>

                        <h2 className="mb-2.5 text-xl font-semibold">Timeline</h2>

                        <div className="mb-6 flex gap-5">
                            <input type="text" className="form-input" placeholder="Notes..." />
                            <Link href="#" className="btn">
                                Save
                            </Link>
                        </div>

                        <div className="mb-6">
                            <label className="inline-flex items-center gap-2 text-sm">
                                <input type="checkbox" className="form-checkbox" /> Add as public note (customer will be
                                able to view).
                            </label>
                        </div>

                        <ul className="relative space-y-5 before:absolute before:inset-y-4 before:left-[5px] before:border-l before:border-primary/10">
                            <li className="flex items-center gap-4">
                                <span className="h-[11px] w-[11px] flex-none rounded-full bg-success"></span>
                                <div className="flex-1 justify-between gap-4 sm:flex">
                                    <div>
                                        <strong className="text-success">Public Note:</strong> This is a test note.
                                    </div>
                                    <div className="ml-auto italic">07 June 2023 at 11:06</div>
                                </div>
                            </li>

                            <li className="flex items-center gap-4">
                                <span className="h-[11px] w-[11px] flex-none rounded-full bg-black"></span>
                                <div className="flex-1 justify-between gap-4 sm:flex">
                                    <div>
                                        <strong>Internal Note:</strong> This is a test note.
                                    </div>
                                    <div className="ml-auto italic">07 June 2023 at 11:06</div>
                                </div>
                            </li>

                            <li className="flex items-center gap-4">
                                <span className="h-[11px] w-[11px] flex-none rounded-full bg-primary"></span>
                                <div className="flex-1 justify-between gap-4 sm:flex">
                                    <div>
                                        Confirmation email was sent to the customer (
                                        <Link href="#" className="font-semibold text-primary hover:text-black">
                                            re-send email
                                        </Link>
                                        ).
                                    </div>
                                    <div className="ml-auto italic">07 June 2023 at 11:06</div>
                                </div>
                            </li>

                            <li className="flex items-center gap-4">
                                <span className="h-[11px] w-[11px] flex-none rounded-full bg-primary"></span>
                                <div className="flex-1 justify-between gap-4 sm:flex">
                                    <div>Order #eR-100 placed.</div>
                                    <div className="ml-auto italic">07 June 2023 at 11:06</div>
                                </div>
                            </li>
                        </ul>
                    </div>

                    <div className="grid flex-none gap-5 sm:grid-cols-2 lg:gap-[30px] xl:w-[315px] xl:grid-cols-1">
                        <div className="rounded-[3px] bg-white shadow-[0_4px_4px_rgba(0,0,0,0.05)]">
                            <h3 className="border-b border-white-light bg-white-dark py-2 px-5 font-semibold">
                                Organization
                            </h3>

                            <p className="py-2 px-5 font-semibold text-primary">School A</p>
                        </div>

                        <div className="rounded-[3px] bg-white shadow-[0_4px_4px_rgba(0,0,0,0.05)]">
                            <h3 className="border-b border-white-light bg-white-dark py-2 px-5 font-semibold">
                                Customer
                            </h3>

                            <p className="py-2 px-5 font-semibold text-primary">Rob Blunt</p>
                        </div>

                        <div className="rounded-[3px] bg-white shadow-[0_4px_4px_rgba(0,0,0,0.05)]">
                            <h3 className="border-b border-white-light bg-white-dark py-2 px-5 font-semibold">
                                Shipping Address
                            </h3>

                            <p className="py-2 px-5 font-semibold text-primary">
                                <span className="font-normal text-black">James Blunt</span>
                                <br />
                                5001 East Main St #1403
                                <br />
                                Mesa, AZ 85205
                                <br />
                                United States
                            </p>
                        </div>

                        <div className="rounded-[3px] bg-white shadow-[0_4px_4px_rgba(0,0,0,0.05)]">
                            <h3 className="border-b border-white-light bg-white-dark py-2 px-5 font-semibold">
                                Billing Address
                            </h3>

                            <p className="py-2 px-5 font-semibold text-primary">
                                <span className="font-normal text-black">James Blunt</span>
                                <br />
                                5001 East Main St #1403
                                <br />
                                Mesa, AZ 85205
                                <br />
                                United States
                            </p>
                        </div>

                        <div className="rounded-[3px] bg-white shadow-[0_4px_4px_rgba(0,0,0,0.05)]">
                            <h3 className="border-b border-white-light bg-white-dark py-2 px-5 font-semibold">
                                Telephone
                            </h3>

                            <p className="py-2 px-5 font-semibold text-primary">
                                <Link href="tel:+14546054245" className="hover:text-black">
                                    +1 454 605 4245
                                </Link>
                            </p>
                        </div>

                        <div className="rounded-[3px] bg-white shadow-[0_4px_4px_rgba(0,0,0,0.05)]">
                            <h3 className="border-b border-white-light bg-white-dark py-2 px-5 font-semibold">Email</h3>

                            <p className="py-2 px-5 font-semibold text-primary">
                                <Link href="mailto:james@blunt.com" className="hover:text-black">
                                    james@blunt.com
                                </Link>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Order;

Order.middleware = {
    auth: true,
    verify: true,
};
