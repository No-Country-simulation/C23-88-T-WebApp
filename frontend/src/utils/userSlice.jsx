import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  accountId: null, // Estado inicial del accountId
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setAccountId: (state, action) => {
      state.accountId = action.payload; // Establece el accountId
    },
    clearAccountId: (state) => {
      state.accountId = null; // Limpia el accountId
    },
  },
});

// Exporta las acciones para que puedas usarlas
export const { setAccountId, clearAccountId } = userSlice.actions;

// Exporta el reducer para agregarlo al store
export default userSlice.reducer;
