'use client';
import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import React, { useState } from "react";
import CustomTable from "@/components/tables/CustomTable";
import { useModal } from "@/hooks/useModal";
import EmpoyeeModal from "./_components/ClassModal";
import { BatchType } from "./_components/BatchType";

const initialData: BatchType[] = [
  {
    id: 1,
    schoolId: 1,
    classId: 1,
    batchName: "Batch A",
    capacity: 40,
    classTeacherId: 101,
    isActive: true,
    createdTs: "2025-01-01T10:00:00Z",
    updatedTs: "2025-01-10T10:00:00Z",
    dbUser: "system",
  },
  {
    id: 2,
    schoolId: 1,
    classId: 2,
    batchName: "Batch B",
    capacity: 35,
    classTeacherId: 102,
    isActive: true,
    createdTs: "2025-01-02T10:00:00Z",
    updatedTs: "2025-01-11T10:00:00Z",
    dbUser: "system",
  },
  {
    id: 3,
    schoolId: 1,
    classId: 3,
    batchName: "Batch C",
    capacity: 50,
    classTeacherId: 103,
    isActive: false,
    createdTs: "2025-01-03T10:00:00Z",
    updatedTs: "2025-01-12T10:00:00Z",
    dbUser: "system",
  },
  {
    id: 4,
    schoolId: 2,
    classId: 4,
    batchName: "Batch D",
    capacity: 45,
    classTeacherId: 104,
    isActive: true,
    createdTs: "2025-01-04T10:00:00Z",
    updatedTs: "2025-01-13T10:00:00Z",
    dbUser: "system",
  },
  {
    id: 5,
    schoolId: 2,
    classId: 5,
    batchName: "Batch E",
    capacity: 38,
    classTeacherId: 105,
    isActive: true,
    createdTs: "2025-01-05T10:00:00Z",
    updatedTs: "2025-01-14T10:00:00Z",
    dbUser: "system",
  },
  {
    id: 6,
    schoolId: 2,
    classId: 6,
    batchName: "Batch F",
    capacity: 42,
    classTeacherId: 106,
    isActive: false,
    createdTs: "2025-01-06T10:00:00Z",
    updatedTs: "2025-01-15T10:00:00Z",
    dbUser: "system",
  },
  {
    id: 7,
    schoolId: 3,
    classId: 7,
    batchName: "Batch G",
    capacity: 55,
    classTeacherId: 107,
    isActive: true,
    createdTs: "2025-01-07T10:00:00Z",
    updatedTs: "2025-01-16T10:00:00Z",
    dbUser: "system",
  },
  {
    id: 8,
    schoolId: 3,
    classId: 8,
    batchName: "Batch H",
    capacity: 60,
    classTeacherId: 108,
    isActive: true,
    createdTs: "2025-01-08T10:00:00Z",
    updatedTs: "2025-01-17T10:00:00Z",
    dbUser: "system",
  },
  {
    id: 9,
    schoolId: 3,
    classId: 9,
    batchName: "Batch I",
    capacity: 48,
    classTeacherId: 109,
    isActive: false,
    createdTs: "2025-01-09T10:00:00Z",
    updatedTs: "2025-01-18T10:00:00Z",
    dbUser: "system",
  },
  {
    id: 10,
    schoolId: 4,
    classId: 10,
    batchName: "Batch J",
    capacity: 65,
    classTeacherId: 110,
    isActive: true,
    createdTs: "2025-01-10T10:00:00Z",
    updatedTs: "2025-01-19T10:00:00Z",
    dbUser: "system",
  },
];


const columns: { key: keyof BatchType; label: string }[] = [
  { key: "id", label: "ID" },
  { key: "batchName", label: "Batch Name" },
  { key: "schoolId", label: "School ID" },
  { key: "classId", label: "Class ID" },
  { key: "capacity", label: "Capacity" },
  { key: "classTeacherId", label: "Class Teacher ID" },
  { key: "isActive", label: "Status" },
];

export default function Class() {
  const [data, setData] = useState(initialData);

  const [editData, setEditData] = useState<BatchType | null>(null);
  const { isOpen, openModal, closeModal } = useModal();

  const handleCreate = () => {
    setEditData(null); // clear edit data
    openModal();
  };

  const handleEdit = (row: BatchType) => {
    setEditData(row); // pass data to modal
    openModal();
  };

  const handleDelete = (row: BatchType) => {
    setData((prev) => prev.filter((item) => item.srNo !== row.srNo));
  };

  const handleModalSubmit = (formValues: Omit<BatchType, "srNo">) => {
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
                <label className="block text-sm font-medium text-gray-700 mb-1">Select School</label>
                <select className="border border-gray-300 rounded-md p-2">
                  <option value="">All Schools</option>
                  <option value="2024">Green Valley Public School</option>
                  <option value="2025">Bluebird International School</option>
                  <option value="2026">Lotus Valley School</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Select Class</label>
                <select className="border border-gray-300 rounded-md p-2">
                  <option value="">All Class</option>
                  <option value="1">Class 1</option>
                  <option value="2">Class 2</option>
                  <option value="3">Class 3</option>
                  <option value="4">Class 4</option>
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
