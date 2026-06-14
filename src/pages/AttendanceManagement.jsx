import React, { useState, useEffect } from 'react';
import { Calendar as CalendarIcon, Save, CheckCircle, XCircle, Clock } from 'lucide-react';

import { useAppContext } from '../context/AppContext';
import GlassInput from '../components/erp/GlassInput';
import NeonButton from '../components/erp/NeonButton';

const AttendanceManagement = () => {
  const { students, attendance, markAttendanceBulk } = useAppContext();

  const today = new Date().toISOString().split('T')[0];
  const [selectedDate, setSelectedDate] = useState(today);
  const [selectedCourse, setSelectedCourse] = useState('');
  const [attendanceState, setAttendanceState] = useState({});

  const courses = [...new Set(students.map(s => s.course))];

  const filteredStudents = students.filter(student =>
    selectedCourse ? student.course === selectedCourse : true
  );

  // Load existing attendance for selected date when date or course changes
  useEffect(() => {
    const existingRecords = attendance.filter(a => a.date === selectedDate);
    const newState = {};

    // Initialize with existing records or default to 'Present'
    filteredStudents.forEach(student => {
      const record = existingRecords.find(r => r.studentId === student.id);
      newState[student.id] = record ? record.status : 'Present';
    });

    setAttendanceState(newState);
  }, [selectedDate, selectedCourse, students, attendance]);

  const handleStatusChange = (studentId, status) => {
    setAttendanceState(prev => ({ ...prev, [studentId]: status }));
  };

  const handleSaveAttendance = () => {
    const records = Object.keys(attendanceState).map(studentId => ({
      studentId,
      date: selectedDate,
      status: attendanceState[studentId]
    }));

    markAttendanceBulk(records);
    alert('Attendance saved successfully!');
  };

  // Course-wise attendance summary data
  const courseSummaryData = courses.map(course => {
    const courseStudents = students.filter(s => s.course === course).map(s => s.id);
    const courseRecords = attendance.filter(a => courseStudents.includes(a.studentId));
    
    const present = courseRecords.filter(a => a.status === 'Present').length;
    const absent = courseRecords.filter(a => a.status === 'Absent').length;
    const late = courseRecords.filter(a => a.status === 'Late').length;
    const total = courseRecords.length;
    const percentage = total > 0 ? Math.round((present / total) * 100) : 0;
    
    return { course, present, absent, late, percentage };
  });

  return (
    <div className="space-y-6"
    >
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-orbitron font-bold text-white mb-2">Attendance</h1>
          <p className="text-gray-400 font-inter">Track daily student attendance and analytics</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: Entry Form */}
        <div className="lg:col-span-2 space-y-6">
          <div className="glass-card p-6 border border-white/10">
            <div className="flex flex-col md:flex-row gap-4 mb-6 pb-6 border-b border-white/10">
              <div className="flex-1">
                <GlassInput
                  label="Select Date"
                  type="date"
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                />
              </div>
              <div className="flex-1">
                <GlassInput
                  label="Filter Course"
                  type="select"
                  options={courses}
                  value={selectedCourse}
                  onChange={(e) => setSelectedCourse(e.target.value)}
                />
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="text-gray-400 font-inter text-sm uppercase tracking-wider border-b border-white/10">
                    <th className="pb-4 font-medium">Student</th>
                    <th className="pb-4 font-medium">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredStudents.length > 0 ? (
                    filteredStudents.map((student) => (
                      <tr key={student.id} className="border-b border-white/5 last:border-0">
                        <td className="py-4">
                          <div className="flex flex-col">
                            <span className="text-white font-medium">{student.name}</span>
                            <span className="text-xs text-gray-500">{student.regNo}</span>
                          </div>
                        </td>
                        <td className="py-4">
                          <div className="flex gap-2">
                            <button onClick={() => handleStatusChange(student.id, 'Present')}
                              className={`px-3 py-1.5 rounded-lg flex items-center gap-1 text-sm transition-all ${attendanceState[student.id] === 'Present'
                                ? 'bg-neon-green/20 text-neon-green border border-neon-green/50 shadow-[0_0_10px_rgba(52,211,153,0.3)]'
                                : 'bg-white/5 text-gray-400 border border-white/10 hover:bg-white/10'
                                }`}
                            >
                              <CheckCircle size={14} /> Present
                            </button>
                            <button onClick={() => handleStatusChange(student.id, 'Absent')}
                              className={`px-3 py-1.5 rounded-lg flex items-center gap-1 text-sm transition-all ${attendanceState[student.id] === 'Absent'
                                ? 'bg-neon-pink/20 text-neon-pink border border-neon-pink/50 shadow-[0_0_10px_rgba(236,72,153,0.3)]'
                                : 'bg-white/5 text-gray-400 border border-white/10 hover:bg-white/10'
                                }`}
                            >
                              <XCircle size={14} /> Absent
                            </button>
                            <button onClick={() => handleStatusChange(student.id, 'Late')}
                              className={`px-3 py-1.5 rounded-lg flex items-center gap-1 text-sm transition-all ${attendanceState[student.id] === 'Late'
                                ? 'bg-neon-amber/20 text-neon-amber border border-neon-amber/50 shadow-[0_0_10px_rgba(251,191,36,0.3)]'
                                : 'bg-white/5 text-gray-400 border border-white/10 hover:bg-white/10'
                                }`}
                            >
                              <Clock size={14} /> Late
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="2" className="py-8 text-center text-gray-500">
                        No students found for this selection.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            <div className="mt-6 flex justify-end">
              <NeonButton onClick={handleSaveAttendance} variant="primary">
                <Save size={18} /> Save Attendance
              </NeonButton>
            </div>
          </div>
        </div>

        {/* Right Column: Analytics Table */}
        <div className="space-y-6">
          <div className="glass-card border border-white/5 rounded-2xl p-6 flex flex-col h-full"
          >
            <h3 className="text-lg font-orbitron text-white mb-6">Course Attendance Summary</h3>
            <div className="flex-1 overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="text-xs font-medium text-muted-foreground uppercase tracking-wider border-b border-white/10">
                    <th className="pb-4">Course</th>
                    <th className="pb-4 text-center">Present</th>
                    <th className="pb-4 text-center">Absent</th>
                    <th className="pb-4 text-center">Late</th>
                    <th className="pb-4 text-right">Attendance %</th>
                  </tr>
                </thead>
                <tbody>
                  {courseSummaryData.map((data, index) => (
                    <tr key={index}
                      className="border-b border-white/5 last:border-0 hover:bg-white/5 transition-colors"
                    >
                      <td className="py-4 text-white font-medium whitespace-nowrap">{data.course}</td>
                      <td className="py-4 text-neon-green text-center">{data.present}</td>
                      <td className="py-4 text-neon-pink text-center">{data.absent}</td>
                      <td className="py-4 text-neon-amber text-center">{data.late}</td>
                      <td className="py-4 text-right">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          data.percentage >= 75 ? 'bg-neon-green/20 text-neon-green' : 
                          data.percentage >= 50 ? 'bg-neon-amber/20 text-neon-amber' : 'bg-neon-pink/20 text-neon-pink'
                        }`}>
                          {data.percentage}%
                        </span>
                      </td>
                    </tr>
                  ))}
                  {courseSummaryData.length === 0 && (
                    <tr>
                      <td colSpan="5" className="py-8 text-center text-gray-500">No courses found.</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AttendanceManagement;
