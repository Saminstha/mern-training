import type { Student } from "../hooks/useStudents";

interface StudentCardProps {
  student: Student;
  onEdit: (student: Student) => void;
  onDelete: (id: number) => void;
}

function StudentCard({
  student,
  onEdit,
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
        <button
          className="btn edit-btn"
          onClick={() => onEdit(student)}
        >
          Edit
        </button>

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