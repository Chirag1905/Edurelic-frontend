import { createSlice, PayloadAction, CaseReducer } from "@reduxjs/toolkit";

// ----------- Types -----------

export interface AcademicYear {
  id?: string | number;
  name?: string;
  startDate?: string;
  endDate?: string;
  isActive?: boolean;
  [key: string]: unknown; // dynamic properties
}

export interface AcademicYearState {
  academicYearData: AcademicYear[] | null;
  academicYearDataPagination: AcademicYear[] | null;
  academicYearDataFetch: AcademicYear | null;
  academicYearPostData: AcademicYear | null;
  academicYearPutData: AcademicYear | null;
  selectedAcademicYear: AcademicYear | null;
  loading: boolean;
  error: string | null;
}

export interface ApiError {
  message: string;
  status?: number;
  [key: string]: unknown;
}

// ----------- Helper Function -----------
// Dynamically creates async reducers with proper typing for each action type
const createAsyncReducers = <T, K extends keyof AcademicYearState>(
  prefix: string,
  stateKey: K
): Record<string, CaseReducer<AcademicYearState>> => {
  return {
    [`${prefix}Request`]: (state: AcademicYearState) => {
      state.loading = true;
      state.error = null;
      state[stateKey] = null as AcademicYearState[K];
    },
    [`${prefix}Success`]: (state: AcademicYearState, action: PayloadAction<T>) => {
      state[stateKey] = action.payload as AcademicYearState[K];
      state.loading = false;
    },
    [`${prefix}Failure`]: (state: AcademicYearState, action: PayloadAction<ApiError | string>) => {
      state.error =
        typeof action.payload === "string" ? action.payload : action.payload.message;
      state.loading = false;
      state[stateKey] = null as AcademicYearState[K];
    },
  };
};

// ----------- Initial State -----------
const initialState: AcademicYearState = {
  academicYearData: null,
  academicYearDataPagination: null,
  academicYearDataFetch: null,
  academicYearPostData: null,
  academicYearPutData: null,
  selectedAcademicYear: null,
  loading: false,
  error: null,
};

// ----------- Reducers Object -----------
const reducers = {
  ...createAsyncReducers<AcademicYear[]>("getAcademicYear", "academicYearData"),
  ...createAsyncReducers<AcademicYear[]>("getAcademicYearPagination", "academicYearDataPagination"),
  ...createAsyncReducers<AcademicYear>("getAcademicYearFetch", "academicYearDataFetch"),
  ...createAsyncReducers<AcademicYear>("postAcademicYear", "academicYearPostData"),
  ...createAsyncReducers<AcademicYear>("putAcademicYear", "academicYearPutData"),

  // Setter for selected academic year
  setSelectedAcademicYear: (
    state: AcademicYearState,
    action: PayloadAction<AcademicYear | null>
  ) => {
    state.selectedAcademicYear = action.payload;
  },
};

// ----------- Slice -----------
const academicYearSlice = createSlice({
  name: "academicYear",
  initialState,
  reducers,
});

// ----------- Export Actions -----------
export const {
  getAcademicYearRequest,
  getAcademicYearSuccess,
  getAcademicYearFailure,

  getAcademicYearPaginationRequest,
  getAcademicYearPaginationSuccess,
  getAcademicYearPaginationFailure,

  getAcademicYearFetchRequest,
  getAcademicYearFetchSuccess,
  getAcademicYearFetchFailure,

  postAcademicYearRequest,
  postAcademicYearSuccess,
  postAcademicYearFailure,

  putAcademicYearRequest,
  putAcademicYearSuccess,
  putAcademicYearFailure,

  setSelectedAcademicYear,
} = academicYearSlice.actions;

// ----------- Export Reducer -----------
export default academicYearSlice.reducer;
