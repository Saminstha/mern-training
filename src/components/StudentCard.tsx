import { Link } from "react-router-dom";
import type { Student } from "../hooks/useStudents";

interface StudentCardProps {
  student: Student;
  onDelete: (id: string) => void;
}

function StudentCard({
  student,
  onDelete,
}: StudentCardProps) {
  return (
    <div className="card">
      <img
        src={student.avatar}
        alt={student.name}
        className="card__image"
      />

      <div className="card__body">
        <h3 className="card__name">{student.name}</h3>

        <p className="card__role">{student.role}</p>
      </div>

      <div className="card__footer">
        <Link
          to={`/students/${student.id}`}
          className="btn edit-btn"
        >
          View Profile
        </Link>

        <button
          className="btn delete-btn"
          onClick={() => onDelete(student.id)}
        >
          Delete
        </button>
      </div>
    </div>
  );
}

export default StudentCard;