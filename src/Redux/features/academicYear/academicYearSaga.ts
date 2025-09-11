import { call, put, takeLatest } from "redux-saga/effects";
import {
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
} from "./academicYearSlice";

import {
  getAcademicYear,
  getAcademicYearPagination,
  getAcademicYearFetch,
  postAcademicYear,
  putAcademicYear,
} from "./academicYearApi";
import { PayloadAction } from "@reduxjs/toolkit";
import { AxiosResponse } from "axios";

// ---------- Types ----------
interface AcademicYear {
  id?: string | number;
  name?: string;
  startDate?: string;
  endDate?: string;
  isActive?: boolean;
  [key: string]: string | number | boolean | undefined;
}

interface PaginationParams {
  page: number;
  size: number;
  sortBy: string;
  ascending: boolean;
}

interface ApiResponse<T = unknown> {
  statusCode: number;
  message: string;
  data: T;
  errors?: unknown[];
}

interface AcademicYearPayload {
  token?: string;
  id?: string | number;
  data?: AcademicYear;
}

// ---------- Saga Workers ----------

function* getAcademicYearSaga(action: PayloadAction<AcademicYearPayload>) {
  try {
    const response: AxiosResponse<ApiResponse<AcademicYear[]>> = yield call(getAcademicYear, action.payload);
    yield put(getAcademicYearSuccess(response.data));
  } catch (error: unknown) {
    let message = "Failed to fetch academic years";
    if (error instanceof Error) {
      message = error.message;
    }
    yield put(getAcademicYearFailure(message));
  }
}

function* getAcademicYearPaginationSaga(action: PayloadAction<AcademicYearPayload>) {
  try {
    const response: AxiosResponse<ApiResponse<AcademicYear[]>> = yield call(getAcademicYearPagination, action.payload);
    yield put(getAcademicYearPaginationSuccess(response.data));
  } catch (error: unknown) {
    let message = "Failed to fetch paginated academic years";
    if (error instanceof Error) {
      message = error.message;
    }
    yield put(getAcademicYearPaginationFailure(message));
  }
}

function* getAcademicYearFetchSaga(action: PayloadAction<AcademicYearPayload>) {
  try {
    const response: AxiosResponse<ApiResponse<AcademicYear>> = yield call(getAcademicYearFetch, action.payload);
    yield put(getAcademicYearFetchSuccess(response.data));
  } catch (error: unknown) {
    let message = "Failed to fetch academic year";
    if (error instanceof Error) {
      message = error.message;
    }
    yield put(getAcademicYearFetchFailure(message));
  }
}

function* postAcademicYearSaga(action: PayloadAction<AcademicYearPayload>) {
  try {
    const response: AxiosResponse<ApiResponse<AcademicYear>> = yield call(postAcademicYear, action.payload);

    if (response.data.statusCode === 200 || response.data.statusCode === 201) {
      yield put(postAcademicYearSuccess(response.data));
      // Refresh pagination after successful create
      yield put(
        getAcademicYearPaginationRequest({
          data: { page: 0, size: 10, sortBy: "id", ascending: true } as PaginationParams,
        })
      );
    } else {
      // Handle validation errors or API errors
      yield put(
        postAcademicYearFailure({
          message: response.data.message,
          error: response.data.errors || [],
        })
      );
    }
  } catch (error: unknown) {
    // Handle unexpected errors
    const err = error as { response?: { data?: { message?: string; errors?: unknown[] } } };
    yield put(
      postAcademicYearFailure({
        message: err.response?.data?.message || "An unexpected error occurred",
        error: err.response?.data?.errors || [],
      })
    );
  }
}

function* putAcademicYearSaga(action: PayloadAction<AcademicYearPayload>) {
  try {
    const response: AxiosResponse<ApiResponse<AcademicYear>> = yield call(putAcademicYear, action.payload);

    if (response.data.statusCode === 200 || response.data.statusCode === 201) {
      yield put(putAcademicYearSuccess(response.data));
      // Refresh pagination after successful update
      yield put(
        getAcademicYearPaginationRequest({
          data: { page: 0, size: 10, sortBy: "id", ascending: true } as PaginationParams,
        })
      );
    } else {
      yield put(
        putAcademicYearFailure({
          message: response.data.message,
          error: response.data.errors || [],
        })
      );
    }
  } catch (error: unknown) {
    // Handle unexpected errors
    const err = error as { response?: { data?: { message?: string; errors?: unknown[] } } };
    yield put(
      postAcademicYearFailure({
        message: err.response?.data?.message || "An unexpected error occurred",
        error: err.response?.data?.errors || [],
      })
    );
  }
}

// ---------- Root Saga ----------
export default function* academicYearSaga() {
  yield takeLatest(getAcademicYearRequest.type, getAcademicYearSaga);
  yield takeLatest(getAcademicYearPaginationRequest.type, getAcademicYearPaginationSaga);
  yield takeLatest(getAcademicYearFetchRequest.type, getAcademicYearFetchSaga);
  yield takeLatest(postAcademicYearRequest.type, postAcademicYearSaga);
  yield takeLatest(putAcademicYearRequest.type, putAcademicYearSaga);
}
