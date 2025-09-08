'use client';
import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import React from "react";
import CustomTable from "@/components/tables/CustomTable";
import Badge from "@/components/ui/badge/Badge";
import Image from "next/image";


const columns = [
  { key: "employee_id", label: "Employee ID" },
  { key: "first_name", label: "First Name" },
  { key: "", label: "Active", render: (value: boolean) => value ? "Yes" : "No" },
  {
    key: "is_active",
    label: "Status",
    render: (value: boolean) => (
      <Badge
        size="sm"
        color={value === true ? "success" : value === false ? "warning" : "error"}
      >
        {value === true ? "active" : "inactive"}
      </Badge>
    ),
  },
  { key: "phone", label: "Phone" },
];

const data = [
  {
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
    salary: 75000.00,
    updated_ts: "NOW()",
    school_id: 1,
  },
  {
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
    salary: 60000.00,
    updated_ts: "NOW()",
    school_id: 2,
  },
  {
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
    salary: 35000.00,
    updated_ts: "NOW()",
    school_id: 3,
  },
  {
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
    salary: 55000.00,
    updated_ts: "NOW()",
    school_id: 4,
  },
  {
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
    salary: 58000.00,
    updated_ts: "NOW()",
    school_id: 5,
  },
  {
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
    salary: 42000.00,
    updated_ts: "NOW()",
    school_id: 1,
  },
  {
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
    salary: 48000.00,
    updated_ts: "NOW()",
    school_id: 2,
  },
  {
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
    salary: 40000.00,
    updated_ts: "NOW()",
    school_id: 3,
  },
  {
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
    salary: 56000.00,
    updated_ts: "NOW()",
    school_id: 4,
  },
  {
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
    salary: 65000.00,
    updated_ts: "NOW()",
    school_id: 5,
  },
];

export default function Employee() {
  const handleEdit = (row: number) => {
    console.log("Edit clicked", row);
  };

  const handleDelete = (row: number) => {
    console.log("Delete clicked", row);
  };

  return (
    <div>
      <PageBreadcrumb pageTitle="Employee" />
      <div className="space-y-6">
        <CustomTable
          title="Employee"
          columns={columns}
          data={data}
          onEdit={handleEdit}
          onDelete={handleDelete}
          enableSearch
        />
      </div>
    </div>
  );
}
