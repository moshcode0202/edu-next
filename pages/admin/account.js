import { useRef, useEffect, useState } from 'react';
import Header from '@/components/Layout/Header';
import AccountEdit from '@/components/Account/AccountEdit';
import axios from '@/libs/axios';

const Account = () => {
    const editModal = useRef();
    return (
        <>
            <Header title={<li className="font-semibold text-primary">Account</li>}></Header>

            <div className="p-4 lg:p-10 lg:pt-[45px]">
                <button type="button" className="btn" onClick={() => editModal.current.open()}>
                    Edit Account
                </button>


                <AccountEdit ref={editModal}></AccountEdit>
            </div>
        </>
    );
};

export default Account;

Account.middleware = {
    auth: true,
    verify: true,
};
