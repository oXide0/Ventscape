import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from 'store/store';

interface EventState {
	favoriteEvents: string[];
}

const initialState: EventState = {
	favoriteEvents: [],
};

export const eventSlice = createSlice({
	name: 'event',
	initialState,
	reducers: {
		setFavorites: (state, action: PayloadAction<string[]>) => {
			state.favoriteEvents = action.payload;
		},
		removeAllFavorites: (state) => {
			state.favoriteEvents = [];
		},
		addFavorite: (state, action: PayloadAction<string>) => {
			state.favoriteEvents.push(action.payload);
		},
		removeFavorite: (state, action: PayloadAction<string>) => {
			state.favoriteEvents = state.favoriteEvents.filter((favorite) => favorite !== action.payload);
		},
	},
});

export const { addFavorite, removeAllFavorites, removeFavorite, setFavorites } = eventSlice.actions;
export default eventSlice.reducer;
export const selectFavoriteEvents = (state: RootState) => state.event.favoriteEvents;
