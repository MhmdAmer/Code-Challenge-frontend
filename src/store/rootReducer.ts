import { combineReducers, Reducer } from "redux";

import { loginReducer } from "&features/login/login.slice";
import { registerReducer } from "&features/register/register.slice";
import { adminReducer } from "&features/admin/admin.slice";

/**
 * Combines reducers of all slices and router into one root reducer
 *
 * @param routerReducer router reducer for redux first history
 */
const createRootReducer = (routerReducer: Reducer) =>
  combineReducers({
    router: routerReducer,
    login: loginReducer,
    register: registerReducer,
    admin: adminReducer,

  });
export default createRootReducer;
