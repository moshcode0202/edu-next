import SideBar from '@/components/Layout/Sidebar';
import { useSelector } from 'react-redux';
import Portals from '@/components/Portals';

const DefaultLayout = ({ children }) => {
    const { user } = useSelector((state) => state.auth);

    return (
        <div className="font-Source text-base font-normal leading-5 text-black antialiased">
            <div className="flex flex-nowrap items-start">
                <SideBar />
                <div className="flex flex-1 flex-col overflow-y-auto overflow-x-hidden lg:ml-[214px]">{children}</div>
            </div>
            <Portals />
        </div>
    );
};

export default DefaultLayout;
