import mongoose, { Schema } from "mongoose";

interface iTeacher {
    name: string;
    age: number;
    email: string;
    phone: number;
}

const teacherSchema = new Schema<iTeacher> ({
    name: { type: String, required: true },
    age: { type: Number, required: true },
    email: { type: String, required: true },
    phone: { type: Number, required: true },
});

export const Teacher = mongoose.model<iTeacher>('Teacher', teacherSchema);