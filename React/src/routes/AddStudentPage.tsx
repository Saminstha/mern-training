import { useNavigate } from "react-router-dom";
import AddStudentForm from "../components/AddStudentForm";
import type { Student } from "../hooks/useStudents";

interface AddStudentPageProps {
  addStudent: (student: Omit<Student, "id">) => Promise<void>;
}

function AddStudentPage({
  addStudent,
}: AddStudentPageProps) {
  const navigate = useNavigate();

  async function handleAddStudent(
    student: Omit<Student, "id">
  ): Promise<void> {
    await addStudent(student);
    navigate("/");
  }

  return (
    <AddStudentForm
      onAddStudent={handleAddStudent}
      onUpdateStudent={async () => {}}
      editingStudent={null}
      clearEditing={() => {}}
    />
  );
}

export default AddStudentPage;