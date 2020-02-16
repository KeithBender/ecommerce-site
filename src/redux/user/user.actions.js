import {UserActionTypes} from './user.reducer'
export default const setCurrentUser = (user) => ({
  type: UserActionTypes.SET_CURRENT_USER,
  payload: user,
});
