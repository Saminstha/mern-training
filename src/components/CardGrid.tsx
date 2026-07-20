import { useCallback, useMemo, useState } from "react";
import StudentCard from "./StudentCard";
import AddStudentForm from "./AddStudentForm";
import useStudents, { type Student } from "../hooks/useStudents";

function CardGrid() {
  const {
    students,
    loading,
    error,
    addStudent,
    deleteStudent,
    updateStudent,
  } = useStudents();

  const [editingStudent, setEditingStudent] = useState<Student | null>(null);

  const handleEdit = useCallback((student: Student): void => {
    setEditingStudent(student);
  }, []);

  const handleDelete = useCallback(
    (id: number): void => {
      deleteStudent(id);
    },
    [deleteStudent]
  );

  const clearEditing = useCallback((): void => {
    setEditingStudent(null);
  }, []);

  const sortedStudents = useMemo(() => {
    return [...students].sort((a, b) => a.name.localeCompare(b.name));
  }, [students]);

  if (loading) {
    return <p className="status-message">Loading students...</p>;
  }

  if (error) {
    return (
      <p className="status-message status-message--error">
        {error}
      </p>
    );
  }

  return (
    <div>
      <AddStudentForm
        onAddStudent={addStudent}
        onUpdateStudent={updateStudent}
        editingStudent={editingStudent}
        clearEditing={clearEditing}
      />

      <div className="card-grid">
        {sortedStudents.map((student) => (
          <StudentCard
            key={student.id}
            student={student}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        ))}
      </div>
    </div>
  );
}

export default CardGrid;