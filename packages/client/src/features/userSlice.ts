import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';

interface UserState {
    id: string | null;
    name: string | null;
    email: string | null;
    isAuth: boolean;
    accountType: 'customer' | 'creator' | null;
    avatarUrl: string | null;
}

const initialState: UserState = {
    id: null,
    name: null,
    email: null,
    isAuth: false,
    accountType: null,
    avatarUrl: null
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
            state.name = null;
            state.isAuth = false;
            state.id = null;
            state.email = null;
            state.accountType = null;
            state.avatarUrl = null;
        },
        setUserId: (state, action: PayloadAction<string>) => {
            state.id = action.payload;
            state.isAuth = true;
        },
        setUserAvatar: (state, action: PayloadAction<string | null>) => {
            state.avatarUrl = action.payload;
        },
        setUserAccountType: (state, action: PayloadAction<'customer' | 'creator'>) => {
            state.accountType = action.payload;
        }
    },
    selectors: {
        selectUser: (state) => state
    }
});

export const { setUserData, removeUserData, setUserId, setUserAvatar, setUserAccountType } =
    userSlice.actions;
export const { selectUser } = userSlice.selectors;
export default userSlice.reducer;
