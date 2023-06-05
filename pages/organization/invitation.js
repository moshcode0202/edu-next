import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';

const OrganizationInvitation = () => {
    const { status } = useSelector((state) => state.auth);
    const router = useRouter();
    useEffect(() => {
        if (status === 'unauthenticated') {
            router.push('/login');
        } else if (status === 'authenticated') {
            router.push('/');
        }
    }, []);
    return;
};

export default OrganizationInvitation;

OrganizationInvitation.middleware = {
    auth: true,
    verify: true,
};
