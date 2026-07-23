import { Link } from "react-router-dom";
import { useCallback, useMemo } from "react";
import StudentCard from "./StudentCard";
import type { Student } from "../hooks/useStudents";

interface CardGridProps {
  students: Student[];
  loading: boolean;
  error: string;
  deleteStudent: (id: string) => Promise<void>;
}

function CardGrid({
  students,
  loading,
  error,
  deleteStudent,
}: CardGridProps) {
  const handleDelete = useCallback(
    (id: string): void => {
      deleteStudent(id);
    },
    [deleteStudent]
  );

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
      <div className="page-actions">
        <Link to="/students/new" className="btn btn--submit">
          Add Student
        </Link>
      </div>

      <div className="card-grid">
        {sortedStudents.map((student) => (
          <StudentCard
            key={student.id}
            student={student}
            onDelete={handleDelete}
          />
        ))}
      </div>
    </div>
  );
}

export default CardGrid;