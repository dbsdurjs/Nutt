import { combineReducers } from "redux";
import { DetectedFoodsReducer } from "./reducers/DetectedFoodsReducer";
import { DetectingImageReducer } from "./reducers/DetectingImage";
import { UserProfileReducer } from "./reducers/UserProfileReducer";

export const rootReducer = combineReducers({
  userProfile: UserProfileReducer,
  detectedFoods: DetectedFoodsReducer,
  detectingImage: DetectingImageReducer,
});

export type AppState = ReturnType<typeof rootReducer>;
