import { useAuth } from '@/hooks/useAuth';
import toast from '@/libs/toast';

const Home = () => {
    const { logout } = useAuth();

    return (
        <div className="mx-auto mt-20 max-w-sm space-y-4">
            <button
                type="button"
                className="btn"
                onClick={() => toast.success('Lorem ipsum dolor sit amet, debet altera malorum ex duo.')}
            >
                Success
            </button>
            <button
                type="button"
                className="btn"
                onClick={() => toast.error('Lorem ipsum dolor sit amet, debet altera malorum ex duo.')}
            >
                Error
            </button>
            <div>
                <button type="button" className="btn">
                    Home
                </button>
            </div>
        </div>
    );
};

export default Home;

Home.middleware = {
    auth: true,
    verify: true,
};
