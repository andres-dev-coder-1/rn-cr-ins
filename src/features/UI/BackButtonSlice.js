import { createSlice } from '@reduxjs/toolkit';

export const backButtonSlice = createSlice({
  name: 'backButton',
  initialState: {
    value: {
      showBackButton: false,
    }
  },
  reducers: {
    showBack: state => {
      state.value.showBackButton = true;
    },
    hideBack: state => {
      state.value.showBackButton = false;
    },
  },
});

export const { showBack, hideBack } = backButtonSlice.actions;

export default backButtonSlice.reducer;