import { configureStore } from '@reduxjs/toolkit';
import userReducer from './userSlice'; // Importa el reducer del userSlice

const store = configureStore({
  reducer: {
    user: userReducer, // Agrega el slice de user al store
  },
});

export default store;
