export interface EmployeeType {
    srNo: number;
    address: string;
    created_ts: string;
    date_of_birth: string;
    db_user: string;
    department: string;
    designation: string;
    email: string;
    emergency_contact: string;
    employee_id: string;
    employee_type: "TEACHER" | "ADMIN" | "SUPPORT";
    experience_years: number;
    first_name: string;
    hire_date: string;
    is_active: boolean;
    last_name: string;
    phone: string;
    qualification: string;
    salary: number;
    updated_ts: string;
    school_id: number;
}