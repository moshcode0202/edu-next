import { useEffect } from 'react';
import { useRouter } from 'next/router';

const Organization = () => {
    const router = useRouter();
    useEffect(() => {
        router.push('/organization/donations');
    });
    return;
};

export default Organization;

Organization.middleware = {
    auth: true,
    verify: true,
};
