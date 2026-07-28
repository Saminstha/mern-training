import { useEffect } from "react";
import { useForm } from "react-hook-form";
import type { Student } from "../hooks/useStudents";

interface AddStudentFormProps {
  onAddStudent: (
    student: Omit<Student, "id">
  ) => Promise<void>;

  onUpdateStudent: (
    student: Student
  ) => Promise<void>;

  editingStudent: Student | null;

  clearEditing: () => void;
}

const AVATAR_OPTIONS = [
  "https://i.pravatar.cc/300?img=1",
  "https://i.pravatar.cc/300?img=5",
  "https://i.pravatar.cc/300?img=12",
  "https://i.pravatar.cc/300?img=20",
  "https://i.pravatar.cc/300?img=32",
];

function AddStudentForm({
  onAddStudent,
  onUpdateStudent,
  editingStudent,
  clearEditing,
}: AddStudentFormProps) {
  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm<Omit<Student, "id">>({
    defaultValues: {
      name: "",
      role: "",
      avatar: AVATAR_OPTIONS[0],
    },
  });

  useEffect(() => {
    if (editingStudent) {
      reset({
        name: editingStudent.name,
        role: editingStudent.role,
        avatar: editingStudent.avatar,
      });
    } else {
      reset({
        name: "",
        role: "",
        avatar: AVATAR_OPTIONS[0],
      });
    }
  }, [editingStudent, reset]);

  const selectedAvatar = watch("avatar");

  async function onSubmit(
    data: Omit<Student, "id">
  ): Promise<void> {
    if (editingStudent) {
      await onUpdateStudent({
        ...editingStudent,
        ...data,
      });

      clearEditing();
    } else {
      await onAddStudent(data);

      reset({
        name: "",
        role: "",
        avatar: AVATAR_OPTIONS[0],
      });
    }
  }

  return (
    <form
      className="add-student-form"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="form-row">
        <div style={{ flex: 1 }}>
          <input
            type="text"
            placeholder="Student Name"
            {...register("name", {
              required: "Name is required",
            })}
          />

          {errors.name && (
            <p className="form-error">
              {errors.name.message}
            </p>
          )}
        </div>

        <div style={{ flex: 1 }}>
          <input
            type="text"
            placeholder="Role"
            {...register("role", {
              required: "Role is required",
            })}
          />

          {errors.role && (
            <p className="form-error">
              {errors.role.message}
            </p>
          )}
        </div>
      </div>

      <fieldset className="avatar-picker">
        <legend>Choose an avatar</legend>

        <div className="avatar-options">
          {AVATAR_OPTIONS.map((avatar) => (
            <label
              key={avatar}
              className="avatar-option"
            >
              <input
                type="radio"
                value={avatar}
                {...register("avatar")}
              />

              <img
                src={avatar}
                alt="Avatar"
                style={{
                  border:
                    selectedAvatar === avatar
                      ? "3px solid #635bff"
                      : "3px solid transparent",
                }}
              />
            </label>
          ))}
        </div>
      </fieldset>

      <div className="form-buttons">
        <button
          type="submit"
          className="btn--submit"
        >
          {editingStudent
            ? "Update Student"
            : "Add Student"}
        </button>

        

        {editingStudent && (
          <button
            type="button"
            className="btn--cancel"
            onClick={clearEditing}
          >
            Cancel
          </button>
        )}
      </div>
    </form>
  );
}

export default AddStudentForm;