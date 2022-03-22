import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  name: '',
  favorite: [],
  formLogin: { email: '', password: '' },
  isLogin: false,
};

const userSlice = createSlice({
  name: 'userSlice',
  initialState,
  reducers: {
    setName(state, action) {
      state.name = action.payload;
    },
    addFavorite(state, action) {
      state.favorite.push(action.payload);
    },
    setLoginForm(state, action) {
      state.formLogin = action.payload;
    },
    setIsLogin(state, action) {
      state.isLogin = action.payload;
    },
  },
});

export const { setName, addFavorite, setLoginForm, setIsLogin } =
  userSlice.actions;
export default userSlice.reducer;
