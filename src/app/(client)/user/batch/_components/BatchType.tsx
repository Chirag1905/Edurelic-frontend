export interface BatchType {
    id: number;
    schoolId: number;
    classId: number;
    batchName: string;
    capacity: number;
    classTeacherId?: number;
    isActive: boolean;
    createdTs: string;
    updatedTs: string;
    dbUser: string;
}
