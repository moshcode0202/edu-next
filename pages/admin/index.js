import { useEffect } from 'react';
import { useRouter } from 'next/router';

const Admin = () => {
    const router = useRouter();
    useEffect(() => {
        router.push('/admin/products');
    });
    return;
};

export default Admin;

Admin.middleware = {
    auth: true,
    verify: true,
};
