import { useRef } from 'react';
import Header from '@/components/Layout/Header';
import CommonSideModal from '@/components/Common/CommonSideModal';
import CommonAddress from '@/components/Common/CommonAddress';

const Addresses = () => {
    const modal = useRef();
    return (
        <>
            <Header title={<li className="font-semibold text-primary">Addresses</li>}></Header>

            <div className="p-4 lg:p-10 lg:pt-[45px]">
                <button type="button" className="btn" onClick={() => modal.current.open()}>
                    Edit Addresses
                </button>

                <CommonSideModal ref={modal}>
                    <h2 className="mb-5 text-xl font-semibold">Edit Addresses</h2>
                    <div className="space-y-4 xl:space-y-[30px]">
                        <CommonAddress title="Shipping"></CommonAddress>
                        <CommonAddress title="Billing"></CommonAddress>
                    </div>
                </CommonSideModal>
            </div>
        </>
    );
};

export default Addresses;

Addresses.middleware = {
    auth: true,
    verify: true,
};
