import { createSlice } from '@reduxjs/toolkit';

const initialState = { name: '', favorite: [] };

const userSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    setName(state, actions) {
      state.name = actions.payload;
    },
    addFavorite(state, actions) {
      state.favorite.push(actions.payload);
    },
  },
});

export const { setName, addFavorite } = userSlice.actions;
export default userSlice.reducer;
