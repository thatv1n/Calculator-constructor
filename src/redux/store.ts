import { configureStore } from '@reduxjs/toolkit';

import calculatorSlice from './slices/slices';

const data = configureStore({
  reducer: {
    calculator: calculatorSlice,
  },    
});

export type RootState = ReturnType<typeof data.getState>
export type AppDispatch = typeof data.dispatch
export default data;
