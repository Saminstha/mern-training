import { Router } from "express";
import {
    listStudents,
    getStudentById,
    createStudent,
    updateStudent,
    patchStudent,
    deleteStudent,
} from "../controllers/studentController";

import { validate } from "../middleware/validate";
import {createStudentSchema, patchStudentSchema, studentIdSchema} from "../validation/studentSchema";

const router = Router();

router.get("/", listStudents);

router.get("/:id", validate({params: studentIdSchema}), getStudentById);

router.post("/", validate({body: createStudentSchema}), createStudent);

router.put("/:id", validate({params: studentIdSchema, body: createStudentSchema}), updateStudent);

router.patch("/:id", validate({params: studentIdSchema, body: patchStudentSchema}), patchStudent);

router.delete("/:id", validate({params: studentIdSchema}), deleteStudent);

export default router;