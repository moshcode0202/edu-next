import Link from 'next/link';
import IconMenubar from '../Icon/IconMenubar';
import { useDispatch } from 'react-redux';
import { toggleSidebar } from '@/store/globalSlice';

const Header = (props) => {
    const dispatch = useDispatch();
    return (
        <div className="sticky top-0 z-[9] border-b border-white-light bg-white">
            <div className="flex min-h-[50px] items-center justify-between p-4 lg:py-[5px] lg:px-10">
                <div className="flex items-center gap-4">
                    <div className="block lg:hidden">
                        <Link href="/" className="inline-flex">
                            <img src="/assets/images/logo.png" alt="logo" />
                        </Link>
                    </div>

                    <ul className="hidden items-center gap-1 lg:flex">{props.title}</ul>
                </div>

                <div className="flex items-center gap-3">
                    {props.action}
                    <button
                        type="button"
                        className="btn block h-10 w-10 p-2 duration-300 lg:hidden"
                        onClick={() => {
                            dispatch(toggleSidebar());
                        }}
                    >
                        <IconMenubar />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Header;
