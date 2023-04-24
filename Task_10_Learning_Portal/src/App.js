import React from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import CoursePlayer from "./pages/Student/CoursePlayer";
import CourseQuiz from "./pages/Student/CourseQuiz";
import LeaderBoard from "./pages/Student/LeaderBoard";
import StudentLogin from "./pages/Student/StudentLogin";
import StudentRegistration from "./pages/Student/StudentRegistration";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AdminLogin from "./pages/Admin/AdminLogin";
import ProtectedRoute from "./components/RoutesCheck/ProtectedRoute";
import PublicRoute from "./components/RoutesCheck/PublicRoute";
import AdminDashboard from "./pages/Admin/AdminDashboard";
import AdminProtected from "./components/RoutesCheck/AdminProtected";
import AdminVideos from "./pages/Admin/AdminVideos";
import AdminAddVideo from "./pages/Admin/AdminAddVideo";
import AdminEditVideo from "./pages/Admin/AdminEditVideo";
import AdminAssignment from "./pages/Admin/AdminAssignment";
import AdminAddAssignment from "./pages/Admin/AdminAddAssignment";
import AdminEditAssignment from "./pages/Admin/AdminEditAssignment";
import AdminQuizzes from "./pages/Admin/AdminQuizzes";
import AdminAddQuiz from "./pages/Admin/AdminAddQuiz";
import AdminEditQuiz from "./pages/Admin/AdminEditQuiz";
import AdminAssignmentMarks from "./pages/Admin/AdminAssignmentMarks";
import PageNotFound from "./pages/PageNotFound";

function App() {
  return (
    <>
      <Routes>
        <Route
          path="/"
          element={
            <PublicRoute>
              <StudentLogin></StudentLogin>
            </PublicRoute>
          }
        ></Route>
        <Route
          path="/student/registration"
          element={
            <PublicRoute>
              <StudentRegistration></StudentRegistration>
            </PublicRoute>
          }
        ></Route>
        <Route
          path="/student/coursePlayer/:id"
          element={
            <ProtectedRoute>
              <CoursePlayer></CoursePlayer>
            </ProtectedRoute>
          }
        ></Route>
        <Route
          path="/student/leaderBoard"
          element={
            <ProtectedRoute>
              <LeaderBoard></LeaderBoard>
            </ProtectedRoute>
          }
        ></Route>
        <Route
          path="/student/quiz/:videoId"
          element={
            <ProtectedRoute>
              <CourseQuiz></CourseQuiz>
            </ProtectedRoute>
          }
        ></Route>
        <Route
          path="/admin"
          element={
            <PublicRoute>
              <AdminLogin></AdminLogin>
            </PublicRoute>
          }
        ></Route>
        <Route
          path="/admin/dashboard"
          element={
            <AdminProtected>
              <AdminDashboard></AdminDashboard>
            </AdminProtected>
          }
        ></Route>
        <Route
          path="/admin/videos"
          element={
            <AdminProtected>
              <AdminVideos></AdminVideos>
            </AdminProtected>
          }
        ></Route>
        <Route
          path="/admin/addVideo"
          element={
            <AdminProtected>
              <AdminAddVideo></AdminAddVideo>
            </AdminProtected>
          }
        ></Route>
        <Route
          path="/admin/editVideo/:id"
          element={
            <AdminProtected>
              <AdminEditVideo></AdminEditVideo>
            </AdminProtected>
          }
        ></Route>
        <Route
          path="/admin/assignments"
          element={
            <AdminProtected>
              <AdminAssignment></AdminAssignment>
            </AdminProtected>
          }
        ></Route>
        <Route
          path="/admin/addAssignment"
          element={
            <AdminProtected>
              <AdminAddAssignment></AdminAddAssignment>
            </AdminProtected>
          }
        ></Route>
        <Route
          path="/admin/editAssignment/:id"
          element={
            <AdminProtected>
              <AdminEditAssignment></AdminEditAssignment>
            </AdminProtected>
          }
        ></Route>
        <Route
          path="/admin/quizzes"
          element={
            <AdminProtected>
              <AdminQuizzes></AdminQuizzes>
            </AdminProtected>
          }
        ></Route>
        <Route
          path="/admin/addQuiz"
          element={
            <AdminProtected>
              <AdminAddQuiz></AdminAddQuiz>
            </AdminProtected>
          }
        ></Route>
        <Route
          path="/admin/editQuiz/:id"
          element={
            <AdminProtected>
              <AdminEditQuiz></AdminEditQuiz>
            </AdminProtected>
          }
        ></Route>
        <Route
          path="/admin/assignmentMarks"
          element={
            <AdminProtected>
              <AdminAssignmentMarks></AdminAssignmentMarks>
            </AdminProtected>
          }
        ></Route>
        <Route path="*" element={<PageNotFound></PageNotFound>}></Route>
      </Routes>

      <ToastContainer autoClose={3000} position="top-right" pauseOnHover />
    </>
  );
}

export default App;
