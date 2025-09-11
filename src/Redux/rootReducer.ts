import { combineReducers, Reducer, AnyAction } from "@reduxjs/toolkit";
import authReducer from "./features/auth/authSlice";
import modalReducer from "./features/utils/modalSlice";
import academicYearReducer from "./features/academicYear/academicYearSlice";
import courseReducer from "./features/course/courseSlice";
import batchReducer from "./features/batch/batchSlice";
import courseRegisterReducer from "./features/courseRegister/courseRegisterSlice";

const appReducer = combineReducers({
  auth: authReducer,
  modal: modalReducer,
  academicYear: academicYearReducer,
  course: courseReducer,
  batch: batchReducer,
  courseRegister: courseRegisterReducer,
});

// Extract the RootState type
export type RootState = ReturnType<typeof appReducer>;

// Root reducer with logout handling
interface LogoutAction {
  type: "LOGOUT";
  [key: string]: unknown;
}

type RootReducerAction = AnyAction | LogoutAction;

const rootReducer: Reducer<RootState, RootReducerAction> = (state: RootState | undefined, action: RootReducerAction) => {
  if (action.type === "LOGOUT") {
    return appReducer(undefined, action);
  }
  return appReducer(state, action);
};
export default rootReducer;