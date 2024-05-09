import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { createAsyncThunk } from '@reduxjs/toolkit';

import {host} from '../config/config'

interface Expense {
    _id: string;
    name: string;
    quantity: number;
    date: string;
    description: string;
}

interface ExpenseState {
    expensesData: Expense[];
}

const initialState: ExpenseState = {
    expensesData: [],
};

export const fetchExpensesData = createAsyncThunk(
    'expenses/fetchData',
    async (_, { rejectWithValue }) => {
        try {
            const response = await fetch(`${host}/api/expenses`);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            return data;
        } catch (error) {
            return rejectWithValue('An unexpected error occurred');
        }
    }
);

export const expensesSlice = createSlice({
    name: 'expenses',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchExpensesData.fulfilled, (state, action: PayloadAction<Expense[]>) => {
            state.expensesData = action.payload;
        });
    },
});

export const expensesReducer = expensesSlice.reducer;
