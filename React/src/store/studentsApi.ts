import type { Student } from "./studentsSlice";

const URL = "http://localhost:3000/students";

export async function fetchStudents(): Promise<Student[]> {
  const response = await fetch(URL);

  if (!response.ok) {
    throw new Error("Failed to fetch students");
  }

  const data: Student[] = await response.json();

  return data;
}

export async function createStudent(
  student: Omit<Student, "id">
): Promise<Student> {
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

  return newStudent;
}

export async function removeStudent(
  id: string
): Promise<void> {
  const response = await fetch(`${URL}/${id}`, {
    method: "DELETE",
  });

  if (!response.ok) {
    throw new Error("Failed to delete student");
  }
}

export async function editStudent(
  student: Student
): Promise<Student> {
  const response = await fetch(
    `${URL}/${student.id}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(student),
    }
  );

  if (!response.ok) {
    throw new Error("Failed to update student");
  }

  const updatedStudent: Student =
    await response.json();

  return updatedStudent;
}