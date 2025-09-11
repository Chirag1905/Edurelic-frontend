import axios, { AxiosResponse } from "axios";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL as string;
const CAMPUS_API_PATH_URL = process.env.NEXT_PUBLIC_CAMPUS_API_PATH as string;
const ACADEMICS_API_PATH_URL = process.env.NEXT_PUBLIC_ACADEMICS_API_PATH as string;

// ---------- Types ----------

interface AcademicYearParams {
  year?: number;
  name?: string;
  startDate?: string;
  endDate?: string;
  // Add more fields as per your API specification
}

interface AcademicYearRequest {
  token: string;
  data?: AcademicYearParams;
  id?: string | number;
}

interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
}


// Fetch list of academic years
export const getAcademicYear = async (
  obj: AcademicYearRequest
): Promise<AxiosResponse<ApiResponse<unknown>>> => {
  try {
    const response = await axios.get<ApiResponse<unknown>>(
      `${API_BASE_URL}/${ACADEMICS_API_PATH_URL}/academicyears`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${obj.token}`,
        },
        params: obj.data,
      }
    );
    return response;
  } catch (err: unknown) {
    console.error(err, "err");
    if (axios.isAxiosError(err) && err.response) {
      return err.response;
    }
    throw err;
  }
};

// Fetch academic years with pagination
export const getAcademicYearPagination = async (
  obj: AcademicYearRequest
): Promise<AxiosResponse<ApiResponse<unknown>>> => {
  try {
    const response = await axios.get<ApiResponse<unknown>>(
      `${API_BASE_URL}/${ACADEMICS_API_PATH_URL}/academicyearpagination`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${obj.token}`,
        },
        params: obj.data,
      }
    );
    return response;
  } catch (err: unknown) {
    console.error(err, "err");
    if (axios.isAxiosError(err) && err.response) {
      return err.response;
    }
    throw err;
  }
};

// Fetch single academic year by ID
export const getAcademicYearFetch = async (
  obj: AcademicYearRequest
): Promise<AxiosResponse<ApiResponse<unknown>>> => {
  try {
    const response = await axios.get<ApiResponse<unknown>>(
      `${API_BASE_URL}/${ACADEMICS_API_PATH_URL}/fetchacademicyear/${obj.id}`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${obj.token}`,
        },
        params: obj.data,
      }
    );
    return response;
  } catch (err: unknown) {
    console.error(err, "err");
    if (axios.isAxiosError(err) && err.response) {
      return err.response;
    }
    throw err;
  }
};

// Create a new academic year
export const postAcademicYear = async (
  obj: AcademicYearRequest
): Promise<AxiosResponse<ApiResponse<unknown>>> => {
  try {
    const response = await axios.post<ApiResponse<unknown>>(
      `${API_BASE_URL}/${ACADEMICS_API_PATH_URL}/createacademicyear`,
      obj.data,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${obj.token}`,
        },
      }
    );
    return response;
  } catch (err: unknown) {
    console.error(err, "err");
    if (axios.isAxiosError(err) && err.response) {
      return err.response;
    }
    throw err;
  }
};

// Update an existing academic year
export const putAcademicYear = async (
  obj: AcademicYearRequest
): Promise<AxiosResponse<ApiResponse<unknown>>> => {
  try {
    const response = await axios.put<ApiResponse<unknown>>(
      `${API_BASE_URL}/${ACADEMICS_API_PATH_URL}/updateacademicyear/${obj.id}`,
      obj.data,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${obj.token}`,
        },
      }
    );
    return response;
  } catch (err: unknown) {
    console.error(err, "err");
    if (axios.isAxiosError(err) && err.response) {
      return err.response;
    }
    throw err;
  }
};
