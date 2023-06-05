import Link from 'next/link';

const Error = ({ statusCode }) => {
    return (
        <div className="flex min-h-screen flex-col items-center justify-center">
            <div>
                <div className="text-primary">
                    <img src="/assets/images/logo.png" alt="logo" />
                </div>
                <div className="mt-10 text-center">
                    <p className="text-3xl font-bold text-black">Oops, the content no longer exists!</p>{' '}
                    <p className="text-secondary mt-4 text-xl">
                        Nevermind - use the button below to start someone fresh.
                    </p>{' '}
                    <p className="mt-10">
                        <Link href="/" className="btn">
                            Send me home
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Error;

Error.layout = 'nosidebar';
