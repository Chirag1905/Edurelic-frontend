'use client';
import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import React, { useState } from "react";
import CustomTable from "@/components/tables/CustomTable";
import { useModal } from "@/hooks/useModal";
import EmpoyeeModal from "./_components/ClassModal";
import { ClassType } from "./_components/ClassType";

const initialData: ClassType[] = [
  {
    id: 1,
    schoolId: 1,
    academicYearId: 2025,
    name: "Class 1",
    capacity: 40,
    isActive: true,
    createdTs: "2025-01-01T10:00:00Z",
    updatedTs: "2025-01-10T10:00:00Z",
    dbUser: "system",
  },
  {
    id: 2,
    schoolId: 1,
    academicYearId: 2025,
    name: "Class 2",
    capacity: 45,
    isActive: true,
    createdTs: "2025-01-02T10:00:00Z",
    updatedTs: "2025-01-11T10:00:00Z",
    dbUser: "system",
  },
  {
    id: 3,
    schoolId: 1,
    academicYearId: 2025,
    name: "Class 3",
    capacity: 50,
    isActive: true,
    createdTs: "2025-01-03T10:00:00Z",
    updatedTs: "2025-01-12T10:00:00Z",
    dbUser: "system",
  },
  {
    id: 4,
    schoolId: 2,
    academicYearId: 2025,
    name: "Class 4",
    capacity: 35,
    isActive: false,
    createdTs: "2025-01-04T10:00:00Z",
    updatedTs: "2025-01-13T10:00:00Z",
    dbUser: "system",
  },
  {
    id: 5,
    schoolId: 2,
    academicYearId: 2025,
    name: "Class 5",
    capacity: 42,
    isActive: true,
    createdTs: "2025-01-05T10:00:00Z",
    updatedTs: "2025-01-14T10:00:00Z",
    dbUser: "system",
  },
  {
    id: 6,
    schoolId: 2,
    academicYearId: 2025,
    name: "Class 6",
    capacity: 48,
    isActive: true,
    createdTs: "2025-01-06T10:00:00Z",
    updatedTs: "2025-01-15T10:00:00Z",
    dbUser: "system",
  },
  {
    id: 7,
    schoolId: 3,
    academicYearId: 2025,
    name: "Class 7",
    capacity: 55,
    isActive: true,
    createdTs: "2025-01-07T10:00:00Z",
    updatedTs: "2025-01-16T10:00:00Z",
    dbUser: "system",
  },
  {
    id: 8,
    schoolId: 3,
    academicYearId: 2025,
    name: "Class 8",
    capacity: 60,
    isActive: true,
    createdTs: "2025-01-08T10:00:00Z",
    updatedTs: "2025-01-17T10:00:00Z",
    dbUser: "system",
  },
  {
    id: 9,
    schoolId: 3,
    academicYearId: 2025,
    name: "Class 9",
    capacity: 65,
    isActive: true,
    createdTs: "2025-01-09T10:00:00Z",
    updatedTs: "2025-01-18T10:00:00Z",
    dbUser: "system",
  },
  {
    id: 10,
    schoolId: 4,
    academicYearId: 2025,
    name: "Class 10",
    capacity: 70,
    isActive: false,
    createdTs: "2025-01-10T10:00:00Z",
    updatedTs: "2025-01-19T10:00:00Z",
    dbUser: "system",
  },
];


const columns: { key: keyof ClassType; label: string }[] = [
  { key: "id", label: "ID" },
  { key: "name", label: "Class Name" },
  { key: "schoolId", label: "School ID" },
  { key: "academicYearId", label: "Academic Year" },
  { key: "capacity", label: "Capacity" },
  { key: "isActive", label: "Status" },
];

export default function Class() {
  const [data, setData] = useState(initialData);

  const [editData, setEditData] = useState<ClassType | null>(null);
  const { isOpen, openModal, closeModal } = useModal();

  const handleCreate = () => {
    setEditData(null); // clear edit data
    openModal();
  };

  const handleEdit = (row: ClassType) => {
    setEditData(row); // pass data to modal
    openModal();
  };

  const handleDelete = (row: ClassType) => {
    setData((prev) => prev.filter((item) => item.srNo !== row.srNo));
  };

  const handleModalSubmit = (formValues: Omit<ClassType, "srNo">) => {
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
      <PageBreadcrumb pageTitle="Class" />
      <div className="space-y-6">
        {isOpen === true ? (
          <EmpoyeeModal
            isOpen={isOpen}
            onClose={closeModal}
            onSubmit={handleModalSubmit}
            initialData={editData}
          />
        ) : (
          <>
            <div className="flex gap-4 items-center">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Select Academic Year</label>
                <select className="border border-gray-300 rounded-md p-2">
                  <option value="">All Years</option>
                  <option value="2024">2024</option>
                  <option value="2025">2025</option>
                  <option value="2026">2026</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Select School</label>
                <select className="border border-gray-300 rounded-md p-2">
                  <option value="">All Schools</option>
                  <option value="1">School 1</option>
                  <option value="2">School 2</option>
                  <option value="3">School 3</option>
                  <option value="4">School 4</option>
                </select>
              </div>
            </div>
            <CustomTable
              title="Class"
              columns={columns}
              data={data}
              onAdd={handleCreate}
              onEdit={handleEdit}
              onDelete={handleDelete}
              sorting
              enableSearch
            />
          </>
        )}
      </div>
    </div>
  );
}
