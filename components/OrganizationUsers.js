import axios from '@/libs/axios';
import helper from '@/libs/helper';
import { forwardRef, useEffect, useImperativeHandle, useRef, useState } from 'react';
import CommonSideModal from './Common/CommonSideModal';
import OrganizationAddUser from './OrganizationAddUser';
import OrganizationEditUser from './OrganizationEditUser';

const OrganizationUsers = (props, forwardedRef) => {
    const modal = useRef();
    const addUSer = useRef();
    const editUser = useRef();
    const [isOpen, setIsOpen] = useState(false);
    const [users, setUsers] = useState([]);

    useImperativeHandle(forwardedRef, () => ({
        open() {
            modal?.current?.open();
            setIsOpen(true);
        },
        close() {
            modal?.current?.close();
        },
    }));

    useEffect(() => {
        if (isOpen) {
            getUsersByOrg(props.organizationId);
        }
    }, [props.organizationId]);

    const getUsersByOrg = async (id) => {
        const { data } = await axios.get(`admin/organizations/${id}/users`);
        setUsers(data);
    };

    const refresh = async () => {
        await getUsersByOrg(props.organizationId);
        addUSer.current.close();
        editUser.current.close();
    };

    return (
        <>
            <CommonSideModal ref={modal}>
                <div className="flex flex-col justify-between md:h-full">
                    <div className="space-y-4 xl:space-y-[30px]">
                        <div className="flex items-center justify-between ">
                            <h2 className="text-xl font-semibold">Users</h2>
                            <button
                                type="button"
                                className="btn"
                                onClick={() => {
                                    addUSer.current.open();
                                }}
                            >
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
                                    {users.length ? (
                                        users.map((user) => {
                                            return (
                                                <tr key={user.id}>
                                                    <td
                                                        className="cursor-pointer font-semibold text-primary"
                                                        onClick={() => editUser.current.open(user.id)}
                                                    >
                                                        {!(user.first_name && user.last_name)
                                                            ? '-'
                                                            : user.first_name + ' ' + user.last_name}
                                                    </td>
                                                    <td>Full Access</td>
                                                    <td
                                                        className={`font-semibold
                                                            ${
                                                                user.status === 1
                                                                    ? 'text-warning'
                                                                    : user.status === 2
                                                                    ? 'text-success'
                                                                    : user.status === 3
                                                                    ? 'text-danger'
                                                                    : ''
                                                            }`}
                                                    >
                                                        {helper.status.find((d) => d.id === user.status).name}
                                                    </td>
                                                </tr>
                                            );
                                        })
                                    ) : (
                                        <tr className="text-center">
                                            <td colSpan={3} className="py-4">
                                                No User Found
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </CommonSideModal>

            <OrganizationAddUser
                ref={addUSer}
                organizationId={props.organizationId}
                refresh={refresh}
            ></OrganizationAddUser>
            <OrganizationEditUser
                ref={editUser}
                refresh={refresh}
                organizationId={props.organizationId}
            ></OrganizationEditUser>
        </>
    );
};

export default forwardRef(OrganizationUsers);
