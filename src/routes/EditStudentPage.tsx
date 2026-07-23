import { useNavigate, useParams } from "react-router-dom";
import AddStudentForm from "../components/AddStudentForm";
import type { Student } from "../hooks/useStudents";

interface EditStudentPageProps {
  students: Student[];
  updateStudent: (student: Student) => Promise<void>;
}

function EditStudentPage({
  students,
  updateStudent,
}: EditStudentPageProps) {
  const { id } = useParams();
  const navigate = useNavigate();

  const student = students.find(
    (student) => student.id === id
  );

  if (!student) {
    return <h2>Student not found.</h2>;
  }

  const studentId = student.id;

  async function handleUpdateStudent(
    updatedStudent: Student
  ): Promise<void> {
    await updateStudent(updatedStudent);
    navigate(`/students/${studentId}`);
  }

  return (
    <div>
      <h2>Edit Student</h2>

      <AddStudentForm
        onAddStudent={async () => {}}
        onUpdateStudent={handleUpdateStudent}
        editingStudent={student}
        clearEditing={() =>
          navigate(`/students/${studentId}`)
        }
      />
    </div>
  );
}

export default EditStudentPage;