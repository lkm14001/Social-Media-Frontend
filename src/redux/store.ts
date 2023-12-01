import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import userReducer from "./slices/userSlice/userSlice";
// import storage from "redux-persist/lib/storage";

import {
  // persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
// import { combineReducers } from "@reduxjs/toolkit";

// const persistConfig = {
//   key: "root",
//   version: 1,
//   storage,
//   blacklist:['']
// };

// const getUpdatedUserDetailsMiddleWare: Middleware =
//   (store) => (next) => async (action) => {
//     if (action.type === "socialMedia/getLoggedInUserAsync") {
//       store.dispatch(getFriendsPosts());
//     }
//     return next(action);
//   };

// const reducer = combineReducers({
//   user: userReducer,
// });

// const persistedReducer = persistReducer(persistConfig, reducer);

export const store = configureStore({
  reducer: {
    user: userReducer,
  },
  // middleware: (getDefaultMiddleware) =>
  //   getDefaultMiddleware().concat(getUpdatedUserDetailsMiddleWare),
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
