import { Request, Response, NextFunction } from "express";

import {
    getStudents,
    getStudentByIdService,
    createStudentService,
    updateStudentService,
    patchStudentService,
    deleteStudentService,
} from "../services/studentServices";
import { NotFound } from "../types/httpError";

// GET all students
export async function listStudents(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
        const students = await getStudents();

        res.status(200).json({
            message: "Students retrieved successfully",
            students,
        });
    } catch (error) {
        next(error);
    }
}

// GET student by ID
export async function getStudentById(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
        const { id } = req.params;
        const student = await getStudentByIdService(String(id));

        if (!student) {
            throw new NotFound("Student not found");

        }

        res.status(200).json({
            message: "Student retrieved successfully",
            student,
        });
    } catch (error) {
        next(error);
    }
}

// POST
export async function createStudent(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
        const newStudent = await createStudentService(req.body);

        res.status(201).json({
            message: "Student created successfully",
            student: newStudent,
        });
    } catch (error) {
        next(error);
    }
}

// PUT
export async function updateStudent(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
        const { id } = req.params;

        const updatedStudent = await updateStudentService(
            String(id),
            req.body
        );

        if (!updatedStudent) {
            throw new NotFound(
                "Student not found"
            );
        }

        res.status(200).json({
            message: "Student updated successfully",
            student: updatedStudent,
        });
    } catch (error) {
        next(error);
    }
}

// PATCH
export async function patchStudent( req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
        const { id } = req.params;

        const updatedStudent = await patchStudentService(
            String(id),
            req.body
        );

        if (!updatedStudent) {
            throw new NotFound(
                "Student not found"
            );
        }

        res.status(200).json({
            message: "Student updated successfully",
            student: updatedStudent,
        });
    } catch (error) {
        next(error);
    }
}

// DELETE
export async function deleteStudent(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
        const { id } = req.params;

        const deletedStudent =
            await deleteStudentService(String(id));

        if (!deletedStudent) {
            throw new NotFound(
                "Student not found"
            );
        }

        res.status(200).json({
            message: "Student deleted successfully",
            student: deletedStudent,
        });
    } catch (error) {
        next(error);
    }
}
