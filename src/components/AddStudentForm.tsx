import { useEffect, useRef, useState } from "react";
import type { ChangeEvent, FormEvent } from "react";
import type { Student } from "../hooks/useStudents";

const AVATAR_OPTIONS = [
  "https://i.pravatar.cc/300?img=1",
  "https://i.pravatar.cc/300?img=5",
  "https://i.pravatar.cc/300?img=12",
  "https://i.pravatar.cc/300?img=20",
  "https://i.pravatar.cc/300?img=32",
];

interface AddStudentFormProps {
  onAddStudent: (student: Omit<Student, "id">) => Promise<void>;
  onUpdateStudent: (student: Student) => Promise<void>;
  editingStudent: Student | null;
  clearEditing: () => void;
}

function AddStudentForm({
  onAddStudent,
  onUpdateStudent,
  editingStudent,
  clearEditing,
}: AddStudentFormProps) {
  const [name, setName] = useState("");
  const [role, setRole] = useState("");
  const [avatar, setAvatar] = useState(AVATAR_OPTIONS[0]);

  const nameInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    nameInputRef.current?.focus();
  }, []);

  useEffect(() => {
    if (editingStudent) {
      setName(editingStudent.name);
      setRole(editingStudent.role);
      setAvatar(editingStudent.avatar);
      nameInputRef.current?.focus();
    }
  }, [editingStudent]);

  function handleNameChange(event: ChangeEvent<HTMLInputElement>): void {
    setName(event.target.value);
  }

  function handleRoleChange(event: ChangeEvent<HTMLInputElement>): void {
    setRole(event.target.value);
  }

  async function handleSubmit(
    event: FormEvent<HTMLFormElement>
  ): Promise<void> {
    event.preventDefault();

    if (!name.trim()) return;

    if (editingStudent) {
      await onUpdateStudent({
        id: editingStudent.id,
        name: name.trim(),
        role: role.trim() || "Unassigned",
        avatar,
      });

      clearEditing();
    } else {
      await onAddStudent({
        name: name.trim(),
        role: role.trim() || "Unassigned",
        avatar,
      });
    }

    setName("");
    setRole("");
    setAvatar(AVATAR_OPTIONS[0]);

    nameInputRef.current?.focus();
  }

  function handleCancel(): void {
    clearEditing();
    setName("");
    setRole("");
    setAvatar(AVATAR_OPTIONS[0]);
    nameInputRef.current?.focus();
  }

  return (
    <form className="add-student-form" onSubmit={handleSubmit}>
      <div className="form-row">
        <input
          ref={nameInputRef}
          type="text"
          placeholder="Name"
          value={name}
          onChange={handleNameChange}
          required
        />

        <input
          type="text"
          placeholder="Role"
          value={role}
          onChange={handleRoleChange}
        />
      </div>

      <fieldset className="avatar-picker">
        <legend>Choose an avatar</legend>

        <div className="avatar-options">
          {AVATAR_OPTIONS.map((url) => (
            <label className="avatar-option" key={url}>
              <input
                type="radio"
                name="avatar"
                value={url}
                checked={avatar === url}
                onChange={() => setAvatar(url)}
              />

              <img src={url} alt="Avatar option" />
            </label>
          ))}
        </div>
      </fieldset>

      <div className="form-buttons">
        <button type="submit" className="btn btn--submit">
          {editingStudent ? "Update Student" : "Add Student"}
        </button>

        {editingStudent && (
          <button
            type="button"
            className="btn btn--cancel"
            onClick={handleCancel}
          >
            Cancel
          </button>
        )}
      </div>
    </form>
  );
}

export default AddStudentForm;