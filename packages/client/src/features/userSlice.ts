import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';

interface UserState {
    id: string;
    name: string;
    email: string;
    isAuth: boolean;
    accountType: 'customer' | 'creator' | '';
    avatarUrl: string;
}

const initialState: UserState = {
    id: '',
    name: '',
    email: '',
    isAuth: false,
    accountType: '',
    avatarUrl: '',
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
            state.avatarUrl = action.payload.avatarUrl;
        },
        removeUserData: (state) => {
            state.name = '';
            state.isAuth = false;
            state.id = '';
            state.email = '';
            state.accountType = '';
            state.avatarUrl = '';
        },
        setUserAvatar: (state, action: PayloadAction<string>) => {
            state.avatarUrl = action.payload;
        },
        setUserId: (state, action: PayloadAction<string>) => {
            state.id = action.payload;
            state.isAuth = true;
        },
    },
    selectors: {
        selectUser: (state) => state,
    },
});

export const { setUserData, removeUserData, setUserAvatar, setUserId } = userSlice.actions;
export const { selectUser } = userSlice.selectors;
export default userSlice.reducer;
