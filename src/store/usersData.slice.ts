import { createSlice } from '@reduxjs/toolkit';
import { createAsyncThunk } from '@reduxjs/toolkit';

export interface UserData {
    note: string;
    status: string;
    asking_experience: string;
    asking_source: string;
    accepted: boolean;
    profit: number; 
    userName: string;
    name: string;
    created: string;
    id: number;
}

export const fetchData = createAsyncThunk(
    'data/fetchData',
    async (_, { rejectWithValue }) => {
        try {
            const response = await fetch(`http://localhost:8001/api/users`);

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

export interface acceptedProps {
    accepted: boolean;
    id: number;
}

export const accept = createAsyncThunk(
    'post/acceptedStatus',
    async (acceptedData: acceptedProps, { rejectWithValue }) => {
        try {
            const response = await fetch(`http://localhost:8001/api/accepted/${acceptedData.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ accepted: acceptedData.accepted }), 
            });
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

export interface editUserDataProps {
    status: string;
    id: number;
    note:string;
    profit:number;
}

export const editUserData = createAsyncThunk(
    'put/editUserData',
    async (editUser: editUserDataProps, { rejectWithValue }) => {
        try {
            const response = await fetch(`http://localhost:8001/api/edit-user/${editUser.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(editUser)
            });
            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || 'Failed to update user data');
            }

            if(response.status === 200) console.log(data.message)

            return data;
        } catch (error) {
            return rejectWithValue('An unexpected error occurred');
        }
    }
);

export interface DataState {
    data: UserData[];
}

const initialState: DataState = {
    data: [],
};

export const usersDataSlice = createSlice({
    name: 'data',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchData.fulfilled, (state, action) => {
                state.data = action.payload;
            })
            .addCase(accept.fulfilled, (state, action) => { 
                const { id, accepted } = action.meta.arg; 
                const userIndex = state.data.findIndex(user => user.id === id);
                if (userIndex !== -1) {
                    state.data[userIndex].accepted = accepted; 
                }
            }).addCase(editUserData.fulfilled, (state, action) => {
                const { id, status, note, profit } = action.meta.arg;
                const userIndex = state.data.findIndex(user => user.id === id);
                if (userIndex !== -1) {
                    state.data[userIndex].status = status;
                    state.data[userIndex].note = note;
                    state.data[userIndex].profit = profit;
                    
                }
            });
    },
});

export const usersDataReducer = usersDataSlice.reducer;
