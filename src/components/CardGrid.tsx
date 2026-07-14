import { useEffect, useState } from "react";
import StudentCard from "./StudentCard";

interface Student {
  id: number;
  name: string;
  role: string;
  avatar: string;
}

const URL = "http://10.10.100.81:3000/students";

function CardGrid() {
  const [students, setStudents] = useState<Student[]>([]);

  useEffect(() => {
    (async () => {
      try {
        const response = await fetch(URL);
        const data: Student[] = await response.json();
        setStudents(data);
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

  return (
    <div className="card-grid">
      {students.map((student) => {
        return (
          <StudentCard
            key={student.id}
            student={student}
          />
        );
      })}
    </div>
  );
}

export default CardGrid;