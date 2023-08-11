import { combineReducers } from '@reduxjs/toolkit';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import userReducer from '../features/userSlice';
import eventReducer from '../features/eventSlice';

const persistConfig = {
	key: 'root',
	storage,
};

const rootReducer = combineReducers({
	user: userReducer,
	event: eventReducer,
});

export const persistedReducer = persistReducer(persistConfig, rootReducer);
