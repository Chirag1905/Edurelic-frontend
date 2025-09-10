"use client";
import React, { useEffect, useRef, useState } from "react";
import Label from "@/components/form/Label";
import Input from "@/components/form/input/InputField";
import Button from "@/components/ui/button/Button";
import Switch from "@/components/form/switch/Switch";
// import DatePicker from "@/components/form/date-picker";

import { DatePicker } from "antd";
import dayjs from "dayjs";
import CustomDropdown from "@/components/dropdown/CustomDropdown";
const { RangePicker } = DatePicker;

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
    status: "Inactive",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [dropdownLabel, setDropdownLabel] = useState("Select Academic Year");

  // Refs for scrolling to error fields
  const fieldRefs = useRef({
    academicYearName: React.createRef<HTMLDivElement>(),
    dateRange: React.createRef<HTMLDivElement>(),
    status: React.createRef<HTMLDivElement>(),
  });

  /** Populate form when editing */
  useEffect(() => {
    if (initialData) {
      setFormData({
        ...initialData,
      });
      setDropdownLabel(initialData.academicYearName || "Select Academic Year");
    } else {
      setFormData({
        academicYearName: "",
        startDate: "",
        endDate: "",
        status: "Inactive",
      });
      setDropdownLabel("Select Academic Year");
    }
    setErrors({});
  }, [initialData, isOpen]);

  /** Handle text input changes */
  const handleChange = (name: keyof AcademicYear, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  /** Handle date range selection */
  const handleDateRangeChange = (dates: any, dateStrings: string[]) => {
    if (dates && dates.length === 2) {
      setFormData((prev) => ({
        ...prev,
        startDate: dates[0].format("DD-MM-YYYY"),
        endDate: dates[1].format("DD-MM-YYYY"),
      }));
      setErrors((prev) => ({ ...prev, startDate: "", endDate: "" }));
    } else {
      setFormData((prev) => ({
        ...prev,
        startDate: "",
        endDate: "",
      }));
    }
  };

  /** Convert stored dates to dayjs objects for RangePicker */
  const rangePickerValue =
    formData.startDate && formData.endDate
      ? [dayjs(formData.startDate, "DD-MM-YYYY"), dayjs(formData.endDate, "DD-MM-YYYY")]
      : null;

  /** Generate next 5 academic years */
  const currentYear = dayjs().year();
  const academicYearOptions = Array.from({ length: 5 }, (_, i) => {
    const startYear = currentYear + i + 1; // start from next year
    const endYear = startYear + 1;
    return `${startYear}-${endYear}`;
  });

  const dropdownItems = academicYearOptions.map((year) => ({
    label: year,
    onClick: () => {
      handleChange("academicYearName", year);
      setDropdownLabel(year);
    },
  }));

  /** Validate form fields */
  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.academicYearName.trim()) {
      newErrors.academicYearName = "Academic year name is required";
    }
    if (!formData.startDate || !formData.endDate) {
      newErrors.startDate = "Start and end dates are required";
    }
    if (!formData.status) {
      newErrors.status = "Status is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  /** Scroll to the first field with an error */
  const scrollToFirstError = () => {
    const firstErrorField = Object.keys(errors)[0];
    if (!firstErrorField) return;

    const refMap: Record<string, React.RefObject<HTMLDivElement>> = {
      academicYearName: fieldRefs.current.academicYearName,
      startDate: fieldRefs.current.dateRange,
      endDate: fieldRefs.current.dateRange,
      status: fieldRefs.current.status,
    };

    const refToScroll = refMap[firstErrorField];
    if (refToScroll?.current) {
      refToScroll.current.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }
  };

  /** Submit handler */
  const handleSave = () => {
    if (!validateForm()) {
      setTimeout(scrollToFirstError, 100);
      // toast.error("Please fix the errors before submitting", {
      //   position: "top-right",
      //   duration: 2000,
      // });
      return;
    }

    onSubmit(formData);
    console.log("🚀 ~ handleSave ~ formData:", formData)
    onClose();
  };


  return (
    <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white pt-4 dark:border-white/[0.05] dark:bg-white/[0.03]">
      <h4 className="px-6 mb-6 text-lg font-medium text-gray-800 dark:text-white/90">
        {initialData ? "Edit Academic Year" : "Create Academic Year"}
      </h4>

      <div className="px-6 grid grid-cols-1 gap-x-6 gap-y-5 sm:grid-cols-2">
        <div className="col-span-2" ref={fieldRefs.current.academicYearName}>
          <Label>
            Academic Year <span className="text-red-500">*</span>
          </Label>
          <CustomDropdown
            buttonLabel={dropdownLabel}
            menuItems={dropdownItems}
            className={`w-full ${errors.academicYearName ? "border-red-500" : ""}`}
          />
          {errors.academicYearName && <p className="mt-1 text-sm text-red-600">{errors.academicYearName}</p>}
        </div>

        {/* Date Range */}
        <div className="col-span-1" ref={fieldRefs.current.dateRange}>
          <Label>
            Academic Year Date <span className="text-red-500">*</span>
          </Label>
          <RangePicker
            placeholder={["Start Date", "End Date"]}
            className={`w-full rounded-xl px-3 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-brand-500
              ${errors.startDate ? "border border-red-500" : "border border-gray-300"}
              hover:border-brand-500 transition-all duration-200`}
            onChange={handleDateRangeChange}
            value={rangePickerValue}
            format="DD-MM-YYYY"
          />

          {errors.startDate && <p className="mt-1 text-sm text-red-600">{errors.startDate}</p>}
        </div>

        <div className="col-span-1" ref={fieldRefs.current.status}>
          <Label>
            Status <span className="text-red-500">*</span>
          </Label>
          <div className="mt-2">
            <Switch
              label={formData.status === "Active" ? "Active" : "Inactive"}
              defaultChecked={formData.status === "Active"}
              onChange={(checked) => handleChange("status", checked ? "Active" : "Inactive")}
            />
          </div>
          {errors.status && <p className="mt-1 text-sm text-red-600">{errors.status}</p>}
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
