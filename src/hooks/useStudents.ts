import { useEffect } from "react";
import {
  addStudent as addStudentAction,
  deleteStudent as deleteStudentAction,
  setError,
  setLoading,
  setStudents,
  updateStudent as updateStudentAction,
} from "../store/studentsSlice";
import { useAppDispatch } from "../store/hooks";

export interface Student {
  id: string;
  name: string;
  role: string;
  avatar: string;
}

const URL = "http://localhost:3000/students";

function useStudents() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const fetchStudents = async () => {
      dispatch(setLoading(true));

      try {
        const response = await fetch(URL);

        if (!response.ok) {
          throw new Error("Failed to fetch students");
        }

        const data: Student[] = await response.json();

        dispatch(setStudents(data));
      } catch (err) {
        if (err instanceof Error) {
          dispatch(setError(err.message));
        }
      } finally {
        dispatch(setLoading(false));
      }
    };

    fetchStudents();
  }, [dispatch]);

  const addStudent = async (
    student: Omit<Student, "id">
  ) => {
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

      const newStudent: Student =
        await response.json();

      dispatch(addStudentAction(newStudent));
    } catch (error) {
      console.log(error);
    }
  };

  const deleteStudent = async (id: string) => {
    try {
      const response = await fetch(`${URL}/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Failed to delete student");
      }

      dispatch(deleteStudentAction(id));
    } catch (error) {
      console.log(error);
    }
  };

  const updateStudent = async (
    updatedStudent: Student
  ) => {
    try {
      const response = await fetch(
        `${URL}/${updatedStudent.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedStudent),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to update student");
      }

      const student: Student =
        await response.json();

      dispatch(updateStudentAction(student));
    } catch (error) {
      console.log(error);
    }
  };

  return {
    addStudent,
    deleteStudent,
    updateStudent,
  };
}

export default useStudents;