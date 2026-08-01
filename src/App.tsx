import { BrowserRouter, Route, Routes } from "react-router-dom";
import CardGrid from "./components/CardGrid";
import Layout from "./routes/Layout";
import LoginPage from "./routes/LoginPage";
import ProtectedRoute from "./routes/ProtectedRoute";
import useMockAuth from "./hooks/useMockAuth";
import useStudents from "./hooks/useStudents";
import AddStudentPage from "./routes/AddStudentPage";
import StudentProfilePage from "./routes/StudentProfilePage";
import EditStudentPage from "./routes/EditStudentPage";
import NotFoundPage from "./routes/NotFoundPage";
import "./App.css";

function App() {
  const { isAuthenticated, login, logout } = useMockAuth();

  const {
    students,
    loading,
    error,
    addStudent,
    deleteStudent,
    updateStudent,
  } = useStudents();

  return (
    <BrowserRouter>
      <Routes>
        <Route 
          element={
            <Layout
              isAuthenticated={isAuthenticated}
              onLogout={logout}
            />
          }
        >
          {/* Home */}
          <Route
            index
            element={
              <CardGrid
                students={students}
                loading={loading}
                error={error}
                deleteStudent={deleteStudent}
                isAuthenticated={isAuthenticated}
              />
            }
          />

          {/* Login */}
          <Route
            path="login"
            element={<LoginPage onLogin={login} />}
          />

          {/* Student Profile (Everyone can view) */}
          <Route
            path="students/:id"
            element={
              <StudentProfilePage
                students={students}
                isAuthenticated={isAuthenticated}
                deleteStudent={deleteStudent}
              />
            }
          />

          {/* Protected Routes */}
          <Route
            element={
              <ProtectedRoute
                isAuthenticated={isAuthenticated}
              />
            }
          >
            <Route
              path="students/new"
              element={
                <AddStudentPage
                  addStudent={addStudent}
                />
              }
            />

            <Route
              path="students/:id/edit"
              element={
                <EditStudentPage
                  students={students}
                  updateStudent={updateStudent}
                />
              }
            />
          </Route>

          {/* 404 */}
          <Route
            path="*"
            element={<NotFoundPage />}
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;