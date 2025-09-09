"use client";
import React, { useEffect, useState } from "react";
import Label from "@/components/form/Label";
import Input from "@/components/form/input/InputField";
import Button from "@/components/ui/button/Button";
import Switch from "@/components/form/switch/Switch";
import DatePicker from "@/components/form/date-picker";

interface AcademicYear {
  srNo?: number;
  academicYearName: string;
  startDate: string;
  endDate: string;
  status: string;
}

interface AcademicYearModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: AcademicYear) => void;
  initialData?: AcademicYear | null;
}

const AcademicYearModal: React.FC<AcademicYearModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  initialData,
}) => {
  const [formData, setFormData] = useState<AcademicYear>({
    academicYearName: "",
    startDate: "",
    endDate: "",
    status: ""
  });

  // Populate form when editing
  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
    } else {
      setFormData({
        academicYearName: "",
        startDate: "",
        endDate: "",
        status: ""
      });
    }
  }, [initialData, isOpen]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    onSubmit(formData);
    onClose();
  };

  return (
    <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white pt-4 dark:border-white/[0.05] dark:bg-white/[0.03]">
      <h4 className="px-6 mb-6 text-lg font-medium text-gray-800 dark:text-white/90">
        {initialData ? "Edit Academic Year" : "Create Academic Year"}
      </h4>

      <div className="px-6 grid grid-cols-1 gap-x-6 gap-y-5 sm:grid-cols-2">
        <div className="col-span-2">
          <Label>Academic Year Name</Label>
          <Input
            type="text"
            name="academicYearName"
            placeholder="2024-2025"
            value={formData.academicYearName}
            onChange={handleChange}
          />
        </div>

        <div className="col-span-1">
          <DatePicker
            id="date-picker"
            label="Start Date"
            placeholder="Select a start date"
            onChange={(dates, currentDateString) => {
              // Handle your logic
              console.log({ dates, currentDateString });
            }}
          />
        </div>

        <div className="col-span-1">
          <DatePicker
            id="date-picker"
            label="End Date"
            placeholder="Select a end date"
            onChange={(dates, currentDateString) => {
              // Handle your logic
              console.log({ dates, currentDateString });
            }}
          />
        </div>
        <div className="col-span-1">
          <Label>Status</Label>
          <Switch
            label="Checked"
            defaultChecked={true}
          // onChange={handleSwitchChange}
          />
        </div>
      </div>

      <div className="px-6 flex items-center justify-end w-full gap-3 my-6">
        <Button size="sm" variant="outline" onClick={onClose}>
          Cancel
        </Button>
        <Button size="sm" onClick={handleSave}>
          {initialData ? "Update" : "Create"}
        </Button>
      </div>
    </div>
  );
};

export default AcademicYearModal;
