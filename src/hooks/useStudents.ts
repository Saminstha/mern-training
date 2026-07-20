import { useEffect, useState } from "react";

export interface Student {
  id: number;
  name: string;
  role: string;
  avatar: string;
}

const URL = "http://localhost:3000/students";

function useStudents() {
  const [students, setStudents] = useState<Student[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const response = await fetch(URL);

        if (!response.ok) {
          throw new Error("Failed to fetch students");
        }

        const data: Student[] = await response.json();
        setStudents(data);
      } catch (err) {
        if (err instanceof Error) {
          setError(err.message);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchStudents();
  }, []);

  const addStudent = async (student: Omit<Student, "id">) => {
    try {
      const response = await fetch(URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(student),
      });

      if (!response.ok) {
        throw new Error("Failed to add student");
      }

      const newStudent: Student = await response.json();

      setStudents((prev) => [...prev, newStudent]);
    } catch (error) {
      console.log(error);
    }
  };

  const deleteStudent = async (id: number) => {
    try {
      const response = await fetch(`${URL}/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Failed to delete student");
      }

      setStudents((prev) =>
        prev.filter((student) => student.id !== id)
      );
    } catch (error) {
      console.log(error);
    }
  };

  const updateStudent = async (updatedStudent: Student) => {
    try {
      const response = await fetch(`${URL}/${updatedStudent.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedStudent),
      });

      if (!response.ok) {
        throw new Error("Failed to update student");
      }

      const student: Student = await response.json();

      setStudents((prev) =>
        prev.map((s) =>
          s.id === student.id ? student : s
        )
      );
    } catch (error) {
      console.log(error);
    }
  };

  return {
    students,
    loading,
    error,
    addStudent,
    deleteStudent,
    updateStudent,
  };
}

export default useStudents;