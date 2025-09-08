'use client';
import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import { Metadata } from "next";
import React from "react";
import CustomTable from "@/components/tables/CustomTable";
import Badge from "@/components/ui/badge/Badge";
import Image from "next/image";

// export const metadata: Metadata = {
//     title: "Next.js Blank Page | TailAdmin - Next.js Dashboard Template",
//     description: "This is Next.js Blank Page TailAdmin Dashboard Template",
// };

const columns = [
    {
        key: "user",
        label: "User",
        render: (value: any) => (
            <div className="flex items-center gap-3">
                <div className="w-10 h-10 overflow-hidden rounded-full">
                    <Image src={value.image} alt={value.name} width={40} height={40} />
                </div>
                <div>
                    <span className="block font-medium text-gray-800 dark:text-white/90">
                        {value.name}
                    </span>
                    <span className="block text-gray-500 text-xs dark:text-gray-400">
                        {value.role}
                    </span>
                </div>
            </div>
        ),
    },
    {
        key: "projectName",
        label: "Project Name",
    },
    {
        key: "status",
        label: "Status",
        render: (value: string) => (
            <Badge
                size="sm"
                color={value === "Active" ? "success" : value === "Pending" ? "warning" : "error"}
            >
                {value}
            </Badge>
        ),
    },
    {
        key: "budget",
        label: "Budget",
    },
];

const data = [
    {
        user: { image: "/images/user/user-17.jpg", name: "Lindsey Curtis", role: "Web Designer" },
        projectName: "Agency Website",
        status: "Active",
        budget: "3.9K",
    },
    {
        user: { image: "/images/user/user-18.jpg", name: "Kaiya George", role: "Project Manager" },
        projectName: "Technology",
        status: "Pending",
        budget: "24.9K",
    },
];

export default function AcademicYear() {
    const handleEdit = (row: number) => {
        console.log("Edit clicked", row);
    };

    const handleDelete = (row: number) => {
        console.log("Delete clicked", row);
    };

    return (
        <div>
            <PageBreadcrumb pageTitle="Academic Year Managment" />
            <div className="space-y-6">
                <CustomTable
                    title="Academic Years"
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
