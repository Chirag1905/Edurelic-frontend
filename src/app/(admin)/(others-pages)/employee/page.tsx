'use client';
import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import React, { useState } from "react";
import CustomTable from "@/components/tables/CustomTable";
import { useModal } from "@/hooks/useModal";
import EmpoyeeModal from "./_components/EmployeeModal";

type initialDataType = {
  srNo: number;
  address: string;
  created_ts: string;   // you used "NOW()", so keeping it string
  date_of_birth: string;
  db_user: string;
  department: string;
  designation: string;
  email: string;
  emergency_contact: string;
  employee_id: string;
  employee_type: "TEACHER" | "ADMIN" | "SUPPORT"; // union type from your data
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
};

const initialData: initialDataType[] = [
  {
    srNo: 1,
    address: "123 MG Road, Bangalore, Karnataka",
    created_ts: "NOW()",
    date_of_birth: "1980-05-15",
    db_user: "admin",
    department: "Academic",
    designation: "Principal",
    email: "rekha.sharma@school1.edu.in",
    emergency_contact: "9876543210",
    employee_id: "EMP001",
    employee_type: "TEACHER",
    experience_years: 15,
    first_name: "Rekha",
    hire_date: "2010-06-01",
    is_active: false,
    last_name: "Sharma",
    phone: "9876543210",
    qualification: "M.Ed",
    salary: 75000.0,
    updated_ts: "NOW()",
    school_id: 1,
  },
  {
    srNo: 2,
    address: "45 Park Street, Kolkata, West Bengal",
    created_ts: "NOW()",
    date_of_birth: "1985-08-22",
    db_user: "admin",
    department: "Administrative",
    designation: "Administrator",
    email: "rajiv.das@school2.edu.in",
    emergency_contact: "9876512340",
    employee_id: "EMP002",
    employee_type: "ADMIN",
    experience_years: 12,
    first_name: "Rajiv",
    hire_date: "2012-01-15",
    is_active: true,
    last_name: "Das",
    phone: "9876512340",
    qualification: "MBA",
    salary: 60000.0,
    updated_ts: "NOW()",
    school_id: 2,
  },
  {
    srNo: 3,
    address: "89 Sector 15, Chandigarh, Punjab",
    created_ts: "NOW()",
    date_of_birth: "1990-11-10",
    db_user: "admin",
    department: "Support",
    designation: "Lab Assistant",
    email: "anita.singh@school3.edu.in",
    emergency_contact: "9876523450",
    employee_id: "EMP003",
    employee_type: "SUPPORT",
    experience_years: 7,
    first_name: "Anita",
    hire_date: "2017-04-23",
    is_active: true,
    last_name: "Singh",
    phone: "9876523450",
    qualification: "B.Sc",
    salary: 35000.0,
    updated_ts: "NOW()",
    school_id: 3,
  },
  {
    srNo: 4,
    address: "22 MG Road, Pune, Maharashtra",
    created_ts: "NOW()",
    date_of_birth: "1982-03-05",
    db_user: "admin",
    department: "Academic",
    designation: "Math Teacher",
    email: "vivek.patel@school4.edu.in",
    emergency_contact: "9876534560",
    employee_id: "EMP004",
    employee_type: "TEACHER",
    experience_years: 13,
    first_name: "Vivek",
    hire_date: "2011-09-01",
    is_active: false,
    last_name: "Patel",
    phone: "9876534560",
    qualification: "M.Sc",
    salary: 55000.0,
    updated_ts: "NOW()",
    school_id: 4,
  },
  {
    srNo: 5,
    address: "67 MG Road, Chennai, Tamil Nadu",
    created_ts: "NOW()",
    date_of_birth: "1978-12-19",
    db_user: "admin",
    department: "Academic",
    designation: "English Teacher",
    email: "sarita.ram@school5.edu.in",
    emergency_contact: "9876545670",
    employee_id: "EMP005",
    employee_type: "TEACHER",
    experience_years: 18,
    first_name: "Sarita",
    hire_date: "2008-02-14",
    is_active: true,
    last_name: "Ram",
    phone: "9876545670",
    qualification: "M.A",
    salary: 58000.0,
    updated_ts: "NOW()",
    school_id: 5,
  },
  {
    srNo: 6,
    address: "12 Hill Road, Mumbai, Maharashtra",
    created_ts: "NOW()",
    date_of_birth: "1988-07-30",
    db_user: "admin",
    department: "Support",
    designation: "Librarian",
    email: "deepak.joshi@school1.edu.in",
    emergency_contact: "9876556780",
    employee_id: "EMP006",
    employee_type: "SUPPORT",
    experience_years: 9,
    first_name: "Deepak",
    hire_date: "2014-05-20",
    is_active: true,
    last_name: "Joshi",
    phone: "9876556780",
    qualification: "MLIS",
    salary: 42000.0,
    updated_ts: "NOW()",
    school_id: 1,
  },
  {
    srNo: 7,
    address: "3 Park Avenue, Kolkata, West Bengal",
    created_ts: "NOW()",
    date_of_birth: "1992-02-28",
    db_user: "admin",
    department: "Academic",
    designation: "Science Teacher",
    email: "neha.bose@school2.edu.in",
    emergency_contact: "9876567890",
    employee_id: "EMP007",
    employee_type: "TEACHER",
    experience_years: 5,
    first_name: "Neha",
    hire_date: "2018-08-01",
    is_active: true,
    last_name: "Bose",
    phone: "9876567890",
    qualification: "M.Sc",
    salary: 48000.0,
    updated_ts: "NOW()",
    school_id: 2,
  },
  {
    srNo: 8,
    address: "45 Sector 10, Chandigarh, Punjab",
    created_ts: "NOW()",
    date_of_birth: "1985-09-15",
    db_user: "admin",
    department: "Support",
    designation: "Counselor",
    email: "manish.kumar@school3.edu.in",
    emergency_contact: "9876578901",
    employee_id: "EMP008",
    employee_type: "SUPPORT",
    experience_years: 10,
    first_name: "Manish",
    hire_date: "2013-11-10",
    is_active: true,
    last_name: "Kumar",
    phone: "9876578901",
    qualification: "MA Psychology",
    salary: 40000.0,
    updated_ts: "NOW()",
    school_id: 3,
  },
  {
    srNo: 9,
    address: "99 MG Road, Pune, Maharashtra",
    created_ts: "NOW()",
    date_of_birth: "1979-04-02",
    db_user: "admin",
    department: "Academic",
    designation: "History Teacher",
    email: "priya.desai@school4.edu.in",
    emergency_contact: "9876589012",
    employee_id: "EMP009",
    employee_type: "TEACHER",
    experience_years: 17,
    first_name: "Priya",
    hire_date: "2009-07-15",
    is_active: true,
    last_name: "Desai",
    phone: "9876589012",
    qualification: "M.A History",
    salary: 56000.0,
    updated_ts: "NOW()",
    school_id: 4,
  },
  {
    srNo: 10,
    address: "21 Anna Salai, Chennai, Tamil Nadu",
    created_ts: "NOW()",
    date_of_birth: "1983-06-25",
    db_user: "admin",
    department: "Administrative",
    designation: "HR Manager",
    email: "rajesh.nair@school5.edu.in",
    emergency_contact: "9876590123",
    employee_id: "EMP010",
    employee_type: "ADMIN",
    experience_years: 14,
    first_name: "Rajesh",
    hire_date: "2011-03-22",
    is_active: true,
    last_name: "Nair",
    phone: "9876590123",
    qualification: "MBA HR",
    salary: 65000.0,
    updated_ts: "NOW()",
    school_id: 5,
  }
];

const columns: { key: keyof initialDataType; label: string }[] = [
  { key: "srNo", label: "Sr No" },
  { key: "employee_id", label: "Employee ID" },
  { key: "first_name", label: "First Name" },
  { key: "phone", label: "Phone" },
  { key: "is_active", label: "Status" }
];

export default function Employee() {
  const [data, setData] = useState(initialData);

  const [editData, setEditData] = useState<initialDataType | null>(null);
  const { isOpen, openModal, closeModal } = useModal();

  const handleCreate = () => {
    setEditData(null); // clear edit data
    openModal();
  };

  const handleEdit = (row: initialDataType) => {
    setEditData(row); // pass data to modal
    openModal();
  };

  const handleDelete = (row: initialDataType) => {
    setData((prev) => prev.filter((item) => item.srNo !== row.srNo));
  };

  const handleModalSubmit = (formValues: Omit<initialDataType, "srNo">) => {
    if (editData) {
      // Update record
      setData((prev) =>
        prev.map((item) =>
          item.srNo === editData.srNo ? { ...item, ...formValues } : item
        )
      );
    } else {
      // Create new record
      setData((prev) => [
        ...prev,
        { srNo: prev.length + 1, ...formValues },
      ]);
    }
  };

  return (
    <div>
      <PageBreadcrumb pageTitle="Employee" />
      <div className="space-y-6">
        {isOpen === true ? (
          <EmpoyeeModal
            isOpen={isOpen}
            onClose={closeModal}
            onSubmit={handleModalSubmit}
            initialData={editData}
          />
        ) : (
          <CustomTable
            title="Employee"
            columns={columns}
            data={data}
            onAdd={handleCreate}
            onEdit={handleEdit}
            onDelete={handleDelete}
            sorting
            enableSearch
          />
        )}
      </div>
    </div>
  );
}
