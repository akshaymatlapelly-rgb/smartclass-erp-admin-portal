import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AppProvider } from './context/AppContext';

// Layouts
import DashboardLayout from './components/layout/DashboardLayout';
import ProtectedRoute from './components/layout/ProtectedRoute';

// Pages
import SmartLogin from './pages/SmartLogin';
import Dashboard from './pages/Dashboard';
import StudentManagement from './pages/StudentManagement';
import SubjectManagement from './pages/SubjectManagement';
import TimetableManagement from './pages/TimetableManagement';
import AttendanceManagement from './pages/AttendanceManagement';
import AssignmentManagement from './pages/AssignmentManagement';
import MarksManagement from './pages/MarksManagement';

const App = () => {
  return (
    <AppProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<SmartLogin />} />
          
          <Route element={<ProtectedRoute />}>
            <Route element={<DashboardLayout />}>
              <Route path="/" element={<Dashboard />} />
              <Route path="/students" element={<StudentManagement />} />
              <Route path="/subjects" element={<SubjectManagement />} />
              <Route path="/timetable" element={<TimetableManagement />} />
              <Route path="/attendance" element={<AttendanceManagement />} />
              <Route path="/assignments" element={<AssignmentManagement />} />
              <Route path="/marks" element={<MarksManagement />} />
            </Route>
          </Route>
          
          {/* Fallback route */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </AppProvider>
  );
};

export default App;
