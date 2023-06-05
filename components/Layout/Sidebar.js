import Link from 'next/link';
import IconBuilding from '../Icon/IconBuilding';
import IconClose from '../Icon/IconClose';
import IconCube from '../Icon/IconCube';
import IconDatabase from '../Icon/IconDatabase';
import IconHome from '../Icon/IconHome';
import IconPackagecheck from '../Icon/IconPackagecheck';
import IconSettings from '../Icon/IconSettings';
import IconUsers from '../Icon/IconUsers';
import { useAuth } from '@/hooks/useAuth';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import { toggleSidebar } from '@/store/globalSlice';
import { useWorkspace } from '@/hooks/useWorkspace';

const Sidebar = () => {
    const { logout } = useAuth();
    const dispatch = useDispatch();
    const workspace = useWorkspace();
    const { user } = useSelector((state) => state.auth);
    const global = useSelector((state) => state.global);
    const router = useRouter();

    const isActive = (links) => {
        return links.includes(router.pathname) || router.pathname.includes(links[0]);
    };

    return (
        <div
            className={`sidebar fixed top-0 left-0 z-10 min-h-screen w-[300px] flex-none border-r border-white-light bg-white duration-300 lg:block lg:w-[215px] ${
                !global.sidebar && 'hidden'
            }`}
        >
            <div className="absolute -right-8 top-2.5 lg:hidden">
                <button
                    type="button"
                    className="inline-flex h-8 w-8 items-center justify-center rounded-r border border-l-0 border-white-light bg-white duration-300 hover:border-primary hover:bg-primary hover:text-white"
                    onClick={() => {
                        dispatch(toggleSidebar());
                    }}
                >
                    <IconClose />
                </button>
            </div>

            <div className="px-4 py-2">
                <Link href="/" className="inline-flex">
                    <img src="/assets/images/logo.png" alt="logo" />
                </Link>
            </div>

            <div className="h-[calc(100vh-57px)] overflow-y-auto">
                {user && user.is_admin && (
                    <>
                        <h3 className="bg-black/5 px-5 py-2 font-semibold">Admin</h3>

                        <ul className="my-3 text-black">
                            <li>
                                <Link
                                    href="/admin/products"
                                    className={`group flex items-center gap-3 px-5 py-2 hover:bg-success/10 hover:font-semibold ${
                                        isActive(['/admin/products', '/admin/categories']) && 'next-active'
                                    }`}
                                >
                                    <span className="h-6 w-6 group-hover:text-success">
                                        <IconDatabase />
                                    </span>
                                    Products
                                </Link>
                                <ul className="sub-menu">
                                    <li>
                                        <Link
                                            href="/admin/products"
                                            className={`flex p-2 pl-14 hover:bg-black-light ${
                                                isActive(['/admin/products']) && 'next-active-sub'
                                            }`}
                                        >
                                            All Products
                                        </Link>
                                    </li>
                                    <li>
                                        <Link
                                            href="/admin/categories"
                                            className={`flex p-2 pl-14 hover:bg-black-light ${
                                                isActive(['/admin/categories']) && 'next-active-sub'
                                            }`}
                                        >
                                            Categories
                                        </Link>
                                    </li>
                                </ul>
                            </li>

                            <li>
                                <Link
                                    href="/admin/orders"
                                    className={`group flex items-center gap-3 px-5 py-2 hover:bg-success/10 hover:font-semibold ${
                                        isActive(['/admin/orders']) && 'next-active'
                                    }`}
                                >
                                    <span className="h-6 w-6 group-hover:text-success">
                                        <IconCube />
                                    </span>
                                    Orders
                                </Link>
                            </li>

                            <li>
                                <Link
                                    href="/admin/donations"
                                    className={`group flex items-center gap-3 px-5 py-2 hover:bg-success/10 hover:font-semibold ${
                                        isActive(['/admin/donations']) && 'next-active'
                                    }`}
                                >
                                    <span className="h-6 w-6 group-hover:text-success">
                                        <IconPackagecheck />
                                    </span>
                                    Donations
                                </Link>
                            </li>

                            <li>
                                <Link
                                    href="/admin/organizations"
                                    className={`group flex items-center gap-3 px-5 py-2 hover:bg-success/10 hover:font-semibold ${
                                        isActive(['/admin/organizations']) && 'next-active'
                                    }`}
                                >
                                    <span className="h-6 w-6 group-hover:text-success">
                                        <IconHome />
                                    </span>
                                    Organizations
                                </Link>
                            </li>

                            <li>
                                <Link
                                    href="/admin/customers"
                                    className={`group flex items-center gap-3 px-5 py-2 hover:bg-success/10 hover:font-semibold ${
                                        isActive(['/admin/customers']) && 'next-active'
                                    }`}
                                >
                                    <span className="h-6 w-6 group-hover:text-success">
                                        <IconUsers />
                                    </span>
                                    Customers
                                </Link>
                            </li>

                            <li>
                                <Link
                                    href="/admin/account"
                                    className={`group flex items-center gap-3 px-5 py-2 hover:bg-success/10 hover:font-semibold ${
                                        isActive(['/admin/account']) && 'next-active'
                                    }`}
                                >
                                    <span className="h-6 w-6 group-hover:text-success">
                                        <IconSettings />
                                    </span>
                                    Account
                                </Link>
                            </li>
                        </ul>
                    </>
                )}

                {workspace.current() && (
                    <>
                        <h3 className="bg-black/5 px-5 py-2 font-semibold">Organization</h3>

                        <ul className="my-3 text-black">
                            <li>
                                <Link
                                    href="/organization/donations"
                                    className={`group flex items-center gap-3 px-5 py-2 hover:bg-success/10 hover:font-semibold ${
                                        isActive(['/organization/donations']) && 'next-active'
                                    }`}
                                >
                                    <span className="h-6 w-6 group-hover:text-success">
                                        <IconPackagecheck />
                                    </span>
                                    Donations
                                </Link>
                            </li>

                            <li>
                                <Link
                                    href="/organization/products"
                                    className={`group flex items-center gap-3 px-5 py-2 hover:bg-success/10 hover:font-semibold ${
                                        isActive(['/organization/products']) && 'next-active'
                                    }`}
                                >
                                    <span className="h-6 w-6 group-hover:text-success">
                                        <IconDatabase />
                                    </span>
                                    Products
                                </Link>
                            </li>

                            <li>
                                <Link
                                    href="/organization/settings"
                                    className={`group flex items-center gap-3 px-5 py-2 hover:bg-success/10 hover:font-semibold ${
                                        isActive(['/settings', '/organization/user']) && 'next-active'
                                    }`}
                                >
                                    <span className="h-6 w-6 group-hover:text-success">
                                        <IconHome />
                                    </span>
                                    Organization
                                </Link>

                                <ul className="sub-menu">
                                    <li>
                                        <Link
                                            href="/organization/settings"
                                            className={`flex p-2 pl-14 hover:bg-black-light ${
                                                isActive(['/organization/settings']) && 'next-active-sub'
                                            }`}
                                        >
                                            Settings
                                        </Link>
                                    </li>
                                    <li>
                                        <Link
                                            href="/organization/user"
                                            className={`flex p-2 pl-14 hover:bg-black-light ${
                                                isActive(['/organization/user']) && 'next-active-sub'
                                            }`}
                                        >
                                            Users
                                        </Link>
                                    </li>
                                </ul>
                            </li>

                            <li>
                                <Link
                                    href="/organization/account"
                                    className={`group flex items-center gap-3 px-5 py-2 hover:bg-success/10 hover:font-semibold ${
                                        isActive(['/organization/account']) && 'next-active'
                                    }`}
                                >
                                    <span className="h-6 w-6 group-hover:text-success">
                                        <IconSettings />
                                    </span>
                                    Account
                                </Link>
                            </li>
                        </ul>
                    </>
                )}
                <div>
                    <h3 className="bg-black/5 px-5 py-2 font-semibold">Customer</h3>

                    <ul className="my-3 text-black">
                        <li>
                            <Link
                                href="/account/transactions"
                                className={`group flex items-center gap-3 px-5 py-2 hover:bg-success/10 hover:font-semibold ${
                                    isActive(['/account/transactions']) && 'next-active'
                                }`}
                            >
                                <span className="h-6 w-6 group-hover:text-success">
                                    <IconPackagecheck />
                                </span>
                                Transactions
                            </Link>
                        </li>

                        <li>
                            <Link
                                href="/account/addresses"
                                className={`group flex items-center gap-3 px-5 py-2 hover:bg-success/10 hover:font-semibold ${
                                    isActive(['/account/addresses']) && 'next-active'
                                }`}
                            >
                                <span className="h-6 w-6 group-hover:text-success">
                                    <IconBuilding />
                                </span>
                                Addresses
                            </Link>
                        </li>

                        <li>
                            <Link
                                href="/account/account"
                                className={`group flex items-center gap-3 px-5 py-2 hover:bg-success/10 hover:font-semibold ${
                                    isActive(['/account/account']) && 'next-active'
                                }`}
                            >
                                <span className="h-6 w-6 group-hover:text-success">
                                    <IconSettings />
                                </span>
                                Account
                            </Link>
                        </li>

                        <li>
                            <Link
                                href="#"
                                className="group flex items-center gap-3 px-5 py-2 text-danger hover:bg-success/10 hover:font-semibold"
                                onClick={logout}
                            >
                                <span className="h-6 w-6"></span>
                                Log Out
                            </Link>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default Sidebar;
