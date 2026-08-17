import { Student } from "../models/students";

// GET all students
export async function getStudents() {
    return await Student.find();
}

// GET student by ID
export async function getStudentByIdService(id: string) {
    return await Student.findById(id);
}

// CREATE student
export async function createStudentService(data: any) {
    return await Student.create(data);
}

// UPDATE entire student (PUT)
export async function updateStudentService(id: string, data: any) {
    return await Student.findByIdAndUpdate(
        id,
        data,
        { new: true, runValidators: true }
    );
}

// UPDATE partial student (PATCH)
export async function patchStudentService(id: string, data: any) {
    return await Student.findByIdAndUpdate(
        id,
        data,
        { new: true, runValidators: true }
    );
}

// DELETE student
export async function deleteStudentService(id: string) {
    return await Student.findByIdAndDelete(id);
}