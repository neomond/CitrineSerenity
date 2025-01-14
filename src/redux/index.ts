import {configureStore} from '@reduxjs/toolkit';
import AuthSlice from './slices/AuthSlice';
import categoriesReducer from './slices/CategoriesSlice';
import likedItemsSliceReducer from './slices/LikedItemsSlice';
import sessionReducer from './slices/SessionSlice';
import onboardingReducer from './slices/OnboardingSlice';
import meditationsReducer from './slices/MeditationSlice';
import meditationSessionsReducer from './slices/MeditationSessions';
import yogaSlice from './slices/YogaSlice';

// const middleware = getDefaultMiddleware({
//   serializableCheck: false, // Disable serializable state check
// });

const store = configureStore({
  reducer: {
    authSlice: AuthSlice,
    categories: categoriesReducer,
    likedItems: likedItemsSliceReducer,
    sessions: sessionReducer,
    onboarding: onboardingReducer,
    meditations: meditationsReducer,
    meditationSessions: meditationSessionsReducer,
    yoga: yogaSlice,
  },
  // middleware,
});

export default store;
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
