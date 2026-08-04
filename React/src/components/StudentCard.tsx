import Button from "@mui/material/Button";
import { Link } from "react-router-dom";
import type { Student } from "../hooks/useStudents";

interface StudentCardProps {
  student: Student;
  onDelete: (id: string) => void;
  isAuthenticated: boolean;
}

function StudentCard({
  student,
  onDelete,
  isAuthenticated,
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

       <div
        className={`card__footer ${
          isAuthenticated
            ? "card__footer--logged-in"
            : "card__footer--logged-out"
        }`}
      >
        
        <Button
          variant="contained"
          component={Link}
          to={`/students/${student.id}`}
          size="small"
        >
          View Profile
        </Button>
        {isAuthenticated && (
        <Button
          variant="contained"
          color="error"
          size="small"
          onClick={() => onDelete(student.id)}
        >
          Delete
        </Button>
        )}
      </div>
    </div>
  );
}

export default StudentCard;