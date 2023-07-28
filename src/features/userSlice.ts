import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store/store';

interface UserState {
	name: string | null;
	email: string | null;
	id: string | null;
	userType: string | null;
}

const initialState: UserState = {
	name: null,
	email: null,
	id: null,
	userType: null,
};

export const userSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {
		setUser: (state, action: PayloadAction<UserState>) => {
			state.name = action.payload.name;
			state.email = action.payload.email;
			state.id = action.payload.id;
			state.userType = action.payload.userType;
			localStorage.setItem('user', JSON.stringify(state));
		},
		removeUser: (state) => {
			state.name = null;
			state.email = null;
			state.id = null;
			state.userType = null;
			localStorage.removeItem('user');
			localStorage.setItem('events', JSON.stringify([]));
		},
	},
});

export const { setUser, removeUser } = userSlice.actions;
export default userSlice.reducer;
export const selectUser = (state: RootState) => state.user;
