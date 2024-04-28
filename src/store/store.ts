import { configureStore } from '@reduxjs/toolkit';
import { usersDataReducer } from './usersData.slice';

const store = configureStore({
    reducer: {
        data: usersDataReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;