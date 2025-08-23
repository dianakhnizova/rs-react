import type { FullUserForm } from '@/sources/interfaces';
import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';

interface UserState {
  userData: FullUserForm[];
}

const initialState: UserState = {
  userData: [],
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    addUserData: (state, action: PayloadAction<FullUserForm>) => {
      state.userData.push(action.payload);
    },
    clearUserData: state => {
      state.userData = [];
    },
  },
});

export const userReducer = userSlice.reducer;
export const userActions = userSlice.actions;
