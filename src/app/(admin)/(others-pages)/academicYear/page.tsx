'use client';
import PageBreadcrumb from "@/components/common/PageBreadCrumb";
<<<<<<< HEAD
import React from "react";
=======
import React, { useState } from "react";
>>>>>>> main
import CustomTable from "@/components/tables/CustomTable";
import AcademicYearModal from "./_components/AcademicYearModal";
import { useModal } from "@/hooks/useModal";

type AcademicYearData = {
  srNo: number;
  academicYearName: string;
  startDate: string;
  endDate: string;
  status: string;
};

const initialData: AcademicYearData[] = [
  {
    srNo: 1,
    academicYearName: "2023-2024",
    startDate: "2023-06-01",
    endDate: "2024-05-31",
    status: "inactive",
  },
  {
    srNo: 2,
    academicYearName: "2024-2025",
    startDate: "2024-06-01",
    endDate: "2025-05-31",
    status: "active",
  },
];

const columns: { key: keyof AcademicYearData; label: string }[] = [
  { key: "srNo", label: "Sr No" },
  { key: "academicYearName", label: "Academic Year Name" },
  { key: "startDate", label: "Start Date" },
  { key: "endDate", label: "End Date" },
];

export default function AcademicYear() {
  const [data, setData] = useState(initialData);

  const [editData, setEditData] = useState<AcademicYearData | null>(null);
  const { isOpen, openModal, closeModal } = useModal();

  const handleCreate = () => {
    setEditData(null); // clear edit data
    openModal();
  };

  const handleEdit = (row: AcademicYearData) => {
    setEditData(row); // pass data to modal
    openModal();
  };

  const handleDelete = (row: AcademicYearData) => {
    setData((prev) => prev.filter((item) => item.srNo !== row.srNo));
  };

  const handleModalSubmit = (formValues: Omit<AcademicYearData, "srNo">) => {
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
      <PageBreadcrumb pageTitle="Academic Year Management" />
      <div className="space-y-6">
        {isOpen === true ? (
          <AcademicYearModal
            isOpen={isOpen}
            onClose={closeModal}
            onSubmit={handleModalSubmit}
            initialData={editData}
          />
        ) : (
          <CustomTable
            title="Academic Years"
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
