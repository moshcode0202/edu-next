import { forwardRef, useImperativeHandle, useRef } from 'react';
import CommonSideModal from '../Common/CommonSideModal';

const AdminDonation = (props, forwardedRef) => {
    const modal = useRef();

    useImperativeHandle(forwardedRef, () => ({
        open() {
            modal?.current?.open();
        },
        close() {
            modal?.current?.close();
        },
    }));
    return (
        <CommonSideModal ref={modal}>
            <form className="flex flex-col justify-between md:h-full">
                <div className="space-y-4 xl:space-y-[30px]">
                    <h2 className="flex items-center justify-between gap-5 text-xl font-semibold">
                        Donation #eRD-10224 <span className="status bg-success/10 text-success">Complete</span>
                    </h2>

                    <h3 className="text-lg font-semibold text-black-dark">Information</h3>

                    <div className="grid grid-cols-2 gap-4 xl:gap-[30px]">
                        <div>
                            <label className="form-label">Customer</label>
                            <p className="leading-5 text-primary">Rob Blunt</p>
                        </div>

                        <div>
                            <label className="form-label">Zip Code</label>
                            <p className="leading-5">94502</p>
                        </div>
                    </div>

                    <h3 className="text-lg font-semibold text-black-dark">Transaction Information</h3>

                    <div className="grid grid-cols-2 gap-4 xl:gap-[30px]">
                        <div>
                            <label className="form-label">Organization</label>
                            <p className="leading-5 text-primary">School A</p>
                        </div>

                        <div>
                            <label className="form-label">Donation Amount</label>
                            <p className="leading-5">$25.00</p>
                        </div>

                        <div>
                            <label className="form-label">Payment Gateway</label>
                            <p className="leading-5">Stripe Connect</p>
                        </div>

                        <div>
                            <label className="form-label">Transaction ID</label>
                            <p className="leading-5 text-primary">pi_12345678</p>
                        </div>

                        <div>
                            <label className="form-label">Date</label>
                            <p className="leading-5">07 June 2023 at 13:00</p>
                        </div>

                        <div className="col-span-2">
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
    );
};

export default forwardRef(AdminDonation);
