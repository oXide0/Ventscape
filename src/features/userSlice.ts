import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';
import type { RootState } from 'store/store';

interface UserState {
    id: string;
    name: string;
    email: string;
    isAuth: boolean;
    accountType: 'customer' | 'creator' | '';
}

const initialState: UserState = {
    id: '',
    name: '',
    email: '',
    isAuth: false,
    accountType: '',
};

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUserData: (state, action: PayloadAction<UserState>) => {
            state.name = action.payload.name;
            state.isAuth = action.payload.isAuth;
            state.id = action.payload.id;
            state.email = action.payload.email;
            state.accountType = action.payload.accountType;
        },
        removeUserData: (state) => {
            state.name = '';
            state.isAuth = false;
            state.id = '';
            state.email = '';
            state.accountType = '';
        },
    },
});

export const { setUserData } = userSlice.actions;
export const selectUser = (state: RootState) => state.user;
export default userSlice.reducer;
