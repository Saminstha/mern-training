import mongoose, { Schema } from "mongoose";

interface iCourse {
    name: string;
    code: string;
    teacher: mongoose.Types.ObjectId;
}

const courseSchema = new Schema<iCourse>({
    name: {type: String, required: true},
    code: {type: String, required: true, unique: true},
    teacher: {type: Schema.Types.ObjectId, ref: "Teacher", required: true},
});

export const Course = mongoose.model<iCourse>("Course", courseSchema);