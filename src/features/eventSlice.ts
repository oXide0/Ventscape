import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store/store';

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
		setFavorite: (state, action: PayloadAction<string[]>) => {
			state.favoriteEvents = action.payload;
		},
		addFavorite: (state, action: PayloadAction<string>) => {
			state.favoriteEvents.push(action.payload);
			localStorage.setItem('events', JSON.stringify(state.favoriteEvents));
		},
		removeFavorite: (state, action: PayloadAction<string>) => {
			state.favoriteEvents = state.favoriteEvents.filter((favorite) => favorite !== action.payload);
			localStorage.setItem('events', JSON.stringify(state.favoriteEvents));
		},
	},
});

export const { addFavorite, removeFavorite, setFavorite } = eventSlice.actions;
export default eventSlice.reducer;
export const selectFavoriteEvents = (state: RootState) => state.event.favoriteEvents;
