import React, { createContext, useContext, useState, useEffect } from 'react';

const AppContext = createContext();

// Seed Data
const initialStudents = [
  { id: '1', name: 'Alex Johnson', regNo: 'REG001', course: 'B.Tech CS', semester: '3', email: 'alex@example.com', phone: '1234567890', status: 'Active' },
  { id: '2', name: 'Sarah Williams', regNo: 'REG002', course: 'B.Tech IT', semester: '3', email: 'sarah@example.com', phone: '0987654321', status: 'Active' },
  { id: '3', name: 'Michael Brown', regNo: 'REG003', course: 'B.Sc Physics', semester: '1', email: 'michael@example.com', phone: '1122334455', status: 'Inactive' },
  { id: '4', name: 'Emily Davis', regNo: 'REG004', course: 'B.Tech CS', semester: '5', email: 'emily@example.com', phone: '5566778899', status: 'Active' },
  { id: '5', name: 'David Miller', regNo: 'REG005', course: 'B.Tech ECE', semester: '3', email: 'david@example.com', phone: '9988776655', status: 'Active' },
];

const initialSubjects = [
  { id: '1', name: 'Data Structures', code: 'CS201', type: 'Theory', credits: '4', semester: '3' },
  { id: '2', name: 'Algorithms Lab', code: 'CS202L', type: 'Lab', credits: '2', semester: '3' },
  { id: '3', name: 'Web Development', code: 'CS301', type: 'Elective', credits: '3', semester: '5' },
  { id: '4', name: 'Quantum Mechanics', code: 'PH101', type: 'Theory', credits: '4', semester: '1' },
  { id: '5', name: 'Digital Electronics', code: 'EC201', type: 'Theory', credits: '4', semester: '3' },
  { id: '6', name: 'Database Systems', code: 'CS203', type: 'Theory', credits: '3', semester: '3' },
];

const initialTimetable = [
  { id: '1', day: 'Monday', time: '09:00 AM', subject: 'CS201', faculty: 'Dr. Smith', room: '101' },
  { id: '2', day: 'Monday', time: '11:00 AM', subject: 'CS202L', faculty: 'Prof. Jones', room: 'Lab 2' },
  { id: '3', day: 'Tuesday', time: '10:00 AM', subject: 'CS203', faculty: 'Dr. Lee', room: '102' },
];

const initialAssignments = [
  { id: '1', title: 'React Basics', description: 'Build a counter app', course: 'B.Tech CS', subject: 'CS301', startDate: '2023-10-01', dueDate: '2023-10-10', totalMarks: '100' },
  { id: '2', title: 'Binary Trees', description: 'Implement AVL trees', course: 'B.Tech CS', subject: 'CS201', startDate: '2023-10-05', dueDate: '2023-10-15', totalMarks: '50' },
  { id: '3', title: 'SQL Queries', description: 'Write complex joins', course: 'B.Tech IT', subject: 'CS203', startDate: '2023-10-10', dueDate: '2023-10-20', totalMarks: '75' },
];

const initialMarks = [
  { id: '1', studentId: '1', subjectId: '1', examType: 'Midterm', marksObtained: '85', totalMarks: '100' },
  { id: '2', studentId: '1', subjectId: '2', examType: 'Midterm', marksObtained: '45', totalMarks: '50' },
  { id: '3', studentId: '2', subjectId: '1', examType: 'Midterm', marksObtained: '92', totalMarks: '100' },
];

const initialAttendance = [
  { id: '1', studentId: '1', date: new Date().toISOString().split('T')[0], status: 'Present' },
  { id: '2', studentId: '2', date: new Date().toISOString().split('T')[0], status: 'Present' },
  { id: '3', studentId: '3', date: new Date().toISOString().split('T')[0], status: 'Absent' },
];

export const AppProvider = ({ children }) => {
  // State initialization with LocalStorage fallback
  const loadState = (key, initialData) => {
    const saved = localStorage.getItem(key);
    return saved ? JSON.parse(saved) : initialData;
  };

  const [students, setStudents] = useState(() => loadState('smartclass_students', initialStudents));
  const [subjects, setSubjects] = useState(() => loadState('smartclass_subjects', initialSubjects));
  const [timetable, setTimetable] = useState(() => loadState('smartclass_timetable', initialTimetable));
  const [assignments, setAssignments] = useState(() => loadState('smartclass_assignments', initialAssignments));
  const [marks, setMarks] = useState(() => loadState('smartclass_marks', initialMarks));
  const [attendance, setAttendance] = useState(() => loadState('smartclass_attendance', initialAttendance));
  
  const [auth, setAuth] = useState(() => {
    const saved = localStorage.getItem('smartclass_auth');
    return saved ? JSON.parse(saved) : null;
  });

  // Persist to LocalStorage on change
  useEffect(() => { localStorage.setItem('smartclass_students', JSON.stringify(students)); }, [students]);
  useEffect(() => { localStorage.setItem('smartclass_subjects', JSON.stringify(subjects)); }, [subjects]);
  useEffect(() => { localStorage.setItem('smartclass_timetable', JSON.stringify(timetable)); }, [timetable]);
  useEffect(() => { localStorage.setItem('smartclass_assignments', JSON.stringify(assignments)); }, [assignments]);
  useEffect(() => { localStorage.setItem('smartclass_marks', JSON.stringify(marks)); }, [marks]);
  useEffect(() => { localStorage.setItem('smartclass_attendance', JSON.stringify(attendance)); }, [attendance]);
  useEffect(() => {
    if (auth) {
      localStorage.setItem('smartclass_auth', JSON.stringify(auth));
    } else {
      localStorage.removeItem('smartclass_auth');
    }
  }, [auth]);

  // Auth Functions
  const login = (email, password) => {
    if (email === 'admin@smartclass.edu' && password === 'admin123') {
      setAuth({ email, role: 'admin', loginTime: new Date().toISOString() });
      return true;
    }
    return false;
  };

  const logout = () => {
    setAuth(null);
  };

  // Helper Functions (CRUD)
  const addStudent = (student) => setStudents(prev => [...prev, { ...student, id: Date.now().toString() }]);
  const updateStudent = (id, data) => setStudents(prev => prev.map(s => s.id === id ? { ...s, ...data } : s));
  const deleteStudent = (id) => setStudents(prev => prev.filter(s => s.id !== id));

  const addSubject = (subject) => setSubjects(prev => [...prev, { ...subject, id: Date.now().toString() }]);
  const updateSubject = (id, data) => setSubjects(prev => prev.map(s => s.id === id ? { ...s, ...data } : s));
  const deleteSubject = (id) => setSubjects(prev => prev.filter(s => s.id !== id));

  const addTimetableSlot = (slot) => setTimetable(prev => [...prev, { ...slot, id: Date.now().toString() }]);
  const deleteTimetableSlot = (id) => setTimetable(prev => prev.filter(s => s.id !== id));

  const addAssignment = (assignment) => setAssignments(prev => [...prev, { ...assignment, id: Date.now().toString() }]);
  const deleteAssignment = (id) => setAssignments(prev => prev.filter(s => s.id !== id));

  const addMark = (mark) => setMarks(prev => [...prev, { ...mark, id: Date.now().toString() }]);
  const deleteMark = (id) => setMarks(prev => prev.filter(s => s.id !== id));

  const markAttendanceBulk = (records) => {
    setAttendance(prev => {
      // Remove old records for these students on this date and append new ones
      const date = records[0]?.date;
      if (!date) return prev;
      const studentIds = records.map(r => r.studentId);
      const filtered = prev.filter(a => !(a.date === date && studentIds.includes(a.studentId)));
      return [...filtered, ...records.map(r => ({ ...r, id: Date.now().toString() + Math.random() }))];
    });
  };

  const getGrade = (percentage) => {
    if (percentage >= 90) return "A+";
    if (percentage >= 80) return "A";
    if (percentage >= 70) return "B";
    if (percentage >= 60) return "C";
    if (percentage >= 50) return "D";
    return "F";
  };

  const value = {
    students, addStudent, updateStudent, deleteStudent,
    subjects, addSubject, updateSubject, deleteSubject,
    timetable, addTimetableSlot, deleteTimetableSlot,
    assignments, addAssignment, deleteAssignment,
    marks, addMark, deleteMark,
    attendance, markAttendanceBulk,
    auth, login, logout,
    getGrade
  };

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useAppContext = () => {
  return useContext(AppContext);
};
