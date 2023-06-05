import { combineReducers, configureStore } from '@reduxjs/toolkit';

import authReducer from '@/store/authSlice';
import globalReducer from '@/store/globalSlice';

const rootReducer = combineReducers({
    auth: authReducer,
    global: globalReducer,
});

export default configureStore({
    reducer: rootReducer,
});
