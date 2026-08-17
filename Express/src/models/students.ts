import mongoose, { Schema } from "mongoose";

interface iStudent {
    name: string;
    age: number;
    email: string;
    phone: number;
}

const studentSchema = new Schema<iStudent> ({
    name: { type: String, required: true },
    age: { type: Number, required: true },
    email: { type: String, required: true },
    phone: { type: Number, required: true },
    // courses: [{ type: Schema.Types.ObjectId, ref: "Course" }],
});

export const Student = mongoose.model<iStudent>('Student', studentSchema);