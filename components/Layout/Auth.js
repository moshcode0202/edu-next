import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import Loading from '@/components/Loading';

const Auth = ({ children, verify: verificationRequired }) => {
    const router = useRouter();
    const { status, user } = useSelector((state) => state.auth);
    const isVerified = user?.email_verified_at;

    useEffect(() => {
        if (status === 'unauthenticated') {
            router.push('/login');
        } else if (status === 'authenticated' && verificationRequired === true && !isVerified) {
            router.push('/account/verify');
        } else if (status === 'authenticated' && verificationRequired === false && isVerified) {
            if (user.is_admin) {
                router.push('/admin');
            } else if (user.organizations) {
                router.push('/organization');
            } else {
                router.push('/account');
            }
        } else if (status === 'authenticated' && verificationRequired === true && isVerified) {
            if (!user.is_admin && router.pathname.startsWith('/admin')) {
                router.push('/account');
            }
            if (!user.organizations && router.pathname.startsWith('/organization')) {
                router.push('/account');
            }
        }
    }, [status, router, verificationRequired, isVerified]);

    if (status !== 'authenticated' || (verificationRequired === true && !isVerified)) {
        return <Loading />;
    }

    return children;
};

export default Auth;
