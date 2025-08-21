import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';

interface ImageState {
  fileBase64: string | null;
}

const initialState: ImageState = {
  fileBase64: null,
};

export const imageSlice = createSlice({
  name: 'image',
  initialState,
  reducers: {
    setImage: (state, action: PayloadAction<string>) => {
      state.fileBase64 = action.payload;
    },
    clearImage: state => {
      state.fileBase64 = null;
    },
  },
});

export const imageReducer = imageSlice.reducer;
export const imageActions = imageSlice.actions;
