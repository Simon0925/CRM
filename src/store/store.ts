import { configureStore } from '@reduxjs/toolkit';
import { usersDataReducer } from './usersData.slice';
import authReduser from './auth.slice'
import {expensesReducer} from './expenses.slice'

const store = configureStore({
    reducer: {
        data: usersDataReducer,
        auth:authReduser,
        expenses:expensesReducer

    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;