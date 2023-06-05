import { useDispatch } from 'react-redux';
import axios from '@/libs/axios';
import { useRouter } from 'next/router';
import { getCookie, setCookie } from '@/libs/cookie';
import { fetchUser as getUser, setLogout } from '@/store/authSlice';
import { useCallback } from 'react';

export const useUser = () => {
    const router = useRouter();
    const dispatch = useDispatch();

    const fetchUser = useCallback(() => {
        try {
            const token = getCookie('auth.__token');
            if (token) {
                dispatch(getUser());
            } else {
                dispatch(setLogout());
            }
        } catch {}
    }, [dispatch]);

    const setBasicDetails = async (args) => {
        try {
            const { data } = await axios.post('/user/profile/update', args);
        } catch {}
    };

    const resetPassword = async (args) => {
        try {
            const { data } = await axios.post('/user/password/reset', args);
            return data;
        } catch {}
    };

    return {
        fetchUser,
        setBasicDetails,
        resetPassword,
    };
};
