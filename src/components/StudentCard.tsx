interface Student {
  id: number;
  name: string;
  role: string;
  avatar: string;
}

interface StudentCardProps {
  student: Student;
}

function StudentCard({ student }: StudentCardProps) {
  return (
    <div className="student-card">
      <img
        src={student.avatar}
        alt={student.name}
        className="card_image"
      />

      <div className="card_body">
        <h3 className="card_title">{student.name}</h3>
        <p className="card_role">{student.role}</p>
      </div>
    </div>
  );
}

export default StudentCard;