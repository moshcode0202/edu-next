import axios from '@/libs/axios';
import { useSelector } from 'react-redux';

export const useWorkspace = () => {
    const { user } = useSelector((state) => state.auth);
    const ROLE_ADMIN = 1;

    const current = () => {
        if (user?.organization_id) {
            return user.organizations.find((d) => d.id === user.organization_id);
        }
        if (user?.organizations?.length) {
            return user.organizations[0];
        }

        return null;
    };

    const list = () => {
        return user?.organizations || [];
    };

    const toggle = async (id) => {
        try {
            await axios.post(`admin/organizations/change-organization`, {
                user_id: user.id,
                organization_id: id,
            });
            window.location.reload();
        } catch {}
    };

    const isAdmin = () => {
        return user.role === ROLE_ADMIN;
    };

    return { toggle, current, list };
};
