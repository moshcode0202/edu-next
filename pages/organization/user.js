import { useRef } from 'react';
import Header from '@/components/Layout/Header';
import OrganizationAddUser from '@/components/OrganizationAddUser';
import OrganizationUsers from '@/components/OrganizationUsers';

const User = () => {
    const userModal = useRef();
    const addModal = useRef();
    return (
        <>
            <Header title={<li className="font-semibold text-primary">User</li>}></Header>

            <div className="p-4 lg:p-10 lg:pt-[45px]">
                <button type="button" className="btn" onClick={() => userModal.current.open()}>
                    Edit User
                </button>

                <OrganizationUsers ref={userModal} />
                <OrganizationAddUser ref={addModal}></OrganizationAddUser>
            </div>
        </>
    );
};

export default User;

User.middleware = {
    auth: true,
    verify: true,
};
