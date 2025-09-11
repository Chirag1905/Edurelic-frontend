"use client";
import React, { useEffect, useState } from "react";
import Label from "@/components/form/Label";
import Input from "@/components/form/input/InputField";
import Button from "@/components/ui/button/Button";
import Switch from "@/components/form/switch/Switch";
import { ClassType } from "./ClassType";

let classDefaultValues: ClassType = {
    id: 0,
    schoolId: 0,
    academicYearId: 0,
    name: "",
    capacity: 0,
    isActive: true,
    createdTs: "",
    updatedTs: "",
    dbUser: "system",
};

interface ClassModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (data: ClassType) => void;
    initialData?: ClassType | null;
}

const ClassModal: React.FC<ClassModalProps> = ({
    isOpen,
    onClose,
    onSubmit,
    initialData,
}) => {
    const [formData, setFormData] = useState<ClassType>(classDefaultValues);

    // Populate form when editing
    useEffect(() => {
        if (initialData) {
            setFormData(initialData);
        } else {
            setFormData(classDefaultValues);
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
                {initialData ? "Edit Class" : "Create Class"}
            </h4>

            <div className="px-6 grid grid-cols-1 gap-x-6 gap-y-5 sm:grid-cols-2">
                <div className="col-span-1">
                    <Label>Class Name</Label>
                    <Input
                        type="text"
                        name="name"
                        placeholder="Class Name"
                        value={formData.name}
                        onChange={handleChange}
                    />
                </div>
                <div className="col-span-1">
                    <Label>School ID</Label>
                    <Input
                        type="number"
                        name="schoolId"
                        placeholder="School ID"
                        value={formData.schoolId}
                        onChange={handleChange}
                    />
                </div>
                <div className="col-span-1">
                    <Label>Academic Year ID</Label>
                    <Input
                        type="number"
                        name="academicYearId"
                        placeholder="Academic Year ID"
                        value={formData.academicYearId}
                        onChange={handleChange}
                    />
                </div>
                <div className="col-span-1">
                    <Label>Capacity</Label>
                    <Input
                        type="number"
                        name="capacity"
                        placeholder="Capacity"
                        value={formData.capacity}
                        onChange={handleChange}
                    />
                </div>
                <div className="col-span-1 flex items-center">
                    <Label>Status</Label>
                    <Switch
                        label="Active"
                        checked={formData.isActive}
                        onChange={(_event, checked) => {
                            setFormData((prev) => ({ ...prev, isActive: checked }));
                        }}
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

export default ClassModal;
