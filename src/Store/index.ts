import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import forestReducer from "../Reducers/index";

export const store = configureStore({
  reducer: {
    forest: forestReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
