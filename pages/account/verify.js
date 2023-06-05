import Loading from '@/components/Loading';
import { useAuth } from '@/hooks/useAuth';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

const AccountVerify = () => {
    const router = useRouter();
    const { resendEmailVerification, verifyEmail, logout } = useAuth();

    const resend = async () => {
        await resendEmailVerification();
    };

    useEffect(() => {
        if (router.query.token) {
            verifyEmail();
        }
    }, [router.query.token, verifyEmail]);

    return (
        <div className="min-h-screen">
            <div className="flex min-h-[calc(100vh-77px)] flex-col items-center justify-center p-4">
                <div className="py-6 text-center">
                    <Link href="/" className="inline-flex">
                        <img src="/assets/images/logo.png" alt="logo" />
                    </Link>
                </div>
                <div className="mx-auto w-full max-w-[600px] space-y-[25px] rounded border border-white-light bg-white p-10">
                    {router?.query?.token ? (
                        <Loading message="Verifying..." />
                    ) : (
                        <div className="mx-auto max-w-lg">
                            <div className="text-center">
                                <h1 className="text-center text-xl font-semibold">Confirm your email</h1>
                                <p className="pt-4">
                                    We&apos;ve sent an email to your inbox - please click that link to activate your
                                    account. Didn&apos;t receive it?{' '}
                                    <button type="button" className="text-primary hover:underline" onClick={resend}>
                                        Click here
                                    </button>{' '}
                                    to resend!
                                </p>
                            </div>
                            <div className="mt-8 text-center">
                                <button type="button" className="btn" onClick={logout}>
                                    Log out
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default AccountVerify;

AccountVerify.middleware = {
    auth: true,
    verify: false,
};

AccountVerify.layout = 'nosidebar';
