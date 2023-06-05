import { useEffect } from 'react';
import { useRouter } from 'next/router';

const Admin = () => {
    const router = useRouter();
    useEffect(() => {
        router.push('/account/transactions');
    });
    return;
};

export default Admin;

Admin.middleware = {
    auth: true,
    verify: true,
};
