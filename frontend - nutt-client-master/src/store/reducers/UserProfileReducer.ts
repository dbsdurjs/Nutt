import { UserProfile } from "../../interfaces/User";

export const USER_PROFILE_TYPE = "USER_PROFILE_TYPE";

export interface UserProfileAction {
  type: string;
  payload: UserProfile | null;
}

export const UserProfileReducer = (
  state: UserProfile | null = null,
  action: UserProfileAction
) => {
  switch (action.type) {
    case USER_PROFILE_TYPE:
      return action.payload;
    default:
      return state;
  }
};
