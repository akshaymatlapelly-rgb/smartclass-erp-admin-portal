import React from 'react';
import { Users, BookOpen, CheckCircle, FileText } from 'lucide-react';
import { useAppContext } from '../context/AppContext';
import StatCard from '../components/erp/StatCard';

const Dashboard = () => {
  const { students, subjects, attendance, assignments, marks, getGrade } = useAppContext();

  const totalStudents = students.length;
  const totalSubjects = subjects.length;
  
  // Calculate attendance %
  const totalAttendanceRecords = attendance.length;
  const presentCount = attendance.filter(a => a.status === 'Present').length;
  const attendancePercentage = totalAttendanceRecords > 0 
    ? Math.round((presentCount / totalAttendanceRecords) * 100) 
    : 0;

  // Compute Summary Stats Data
  const courses = [...new Set(students.map(s => s.course))];
  const summaryStatsData = courses.map(course => {
    const courseStudents = students.filter(s => s.course === course);
    const totalStudentsInCourse = courseStudents.length;

    // Avg Attendance
    const courseStudentIds = courseStudents.map(s => s.id);
    const courseAttendance = attendance.filter(a => courseStudentIds.includes(a.studentId));
    const presentCount = courseAttendance.filter(a => a.status === 'Present').length;
    const avgAttendance = courseAttendance.length > 0 ? Math.round((presentCount / courseAttendance.length) * 100) : 0;

    // Avg Grade
    const courseMarks = marks ? marks.filter(m => courseStudentIds.includes(m.studentId)) : [];
    let avgGrade = '-';
    if (courseMarks.length > 0 && getGrade) {
      const totalObtained = courseMarks.reduce((acc, m) => acc + parseFloat(m.marksObtained), 0);
      const totalMax = courseMarks.reduce((acc, m) => acc + parseFloat(m.totalMarks), 0);
      const avgPercentage = totalMax > 0 ? Math.round((totalObtained / totalMax) * 100) : 0;
      avgGrade = getGrade(avgPercentage);
    }

    return { course, totalStudents: totalStudentsInCourse, avgAttendance, avgGrade };
  });

  // Mock data for Recent Activity
  const recentActivityData = [
    { id: 1, action: 'Attendance Marked', details: 'B.Tech CS - Year 3', time: '10 mins ago' },
    { id: 2, action: 'Marks Updated', details: 'Data Structures Midterm', time: '1 hour ago' },
    { id: 3, action: 'New Student Enrolled', details: 'John Doe (B.Tech ECE)', time: '3 hours ago' },
    { id: 4, action: 'Assignment Created', details: 'Operating Systems - Lab 4', time: '5 hours ago' },
  ];

  
  
  return (
    <div className="space-y-6"
    >
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-orbitron font-bold text-white mb-2">Dashboard Overview</h1>
          <p className="text-gray-400 font-inter">Welcome back, Administrator</p>
        </div>
        <div className="hidden md:block px-4 py-2 bg-white/5 border border-neon-purple/30 rounded-lg text-neon-purple font-inter text-sm shadow-[0_0_10px_rgba(139,92,246,0.2)]">
          {new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
        </div>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div>
          <StatCard title="Total Students" value={totalStudents} icon={Users} glowColor="neon-blue" />
        </div>
        <div>
          <StatCard title="Active Subjects" value={totalSubjects} icon={BookOpen} glowColor="neon-purple" />
        </div>
        <div>
          <StatCard title="Avg Attendance" value={`${attendancePercentage}%`} icon={CheckCircle} glowColor="neon-green" />
        </div>
        <div>
          <StatCard title="Total Assignments" value={assignments.length} icon={FileText} glowColor="neon-amber" />
        </div>
      </div>

      {/* Data Tables Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">
        
        {/* Summary Stats Table */}
        <div className="glass-card border border-white/5 rounded-2xl p-6 flex flex-col">
          <h3 className="text-lg font-orbitron text-white mb-6">Course Summary Statistics</h3>
          <div className="flex-1 overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="text-xs font-medium text-muted-foreground uppercase tracking-wider border-b border-white/10">
                  <th className="pb-4">Course Name</th>
                  <th className="pb-4 text-center">Total Students</th>
                  <th className="pb-4 text-center">Avg Attendance %</th>
                  <th className="pb-4 text-center">Avg Grade</th>
                </tr>
              </thead>
              <tbody>
                {summaryStatsData.map((data, index) => (
                  <tr key={index}
                    className="border-b border-white/5 last:border-0 hover:bg-white/5 transition-colors"
                  >
                    <td className="py-4 text-white font-medium">{data.course}</td>
                    <td className="py-4 text-gray-300 text-center">{data.totalStudents}</td>
                    <td className="py-4 text-center">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        data.avgAttendance >= 75 ? 'bg-neon-green/20 text-neon-green' : 
                        data.avgAttendance >= 50 ? 'bg-neon-amber/20 text-neon-amber' : 'bg-neon-pink/20 text-neon-pink'
                      }`}>
                        {data.avgAttendance}%
                      </span>
                    </td>
                    <td className="py-4 text-center">
                      <span className={`font-orbitron font-bold ${
                        data.avgGrade.includes('A') ? 'text-neon-green' :
                        data.avgGrade === 'B' ? 'text-neon-blue' :
                        data.avgGrade === 'C' ? 'text-neon-purple' :
                        data.avgGrade === 'D' ? 'text-neon-amber' : 'text-neon-pink'
                      }`}>
                        {data.avgGrade}
                      </span>
                    </td>
                  </tr>
                ))}
                {summaryStatsData.length === 0 && (
                  <tr>
                    <td colSpan="4" className="py-8 text-center text-gray-500">No courses found.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Recent Activity Table */}
        <div className="glass-card border border-white/5 rounded-2xl p-6 flex flex-col">
          <h3 className="text-lg font-orbitron text-white mb-6">Recent Activity</h3>
          <div className="flex-1 overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="text-xs font-medium text-muted-foreground uppercase tracking-wider border-b border-white/10">
                  <th className="pb-4">Action</th>
                  <th className="pb-4">Details</th>
                  <th className="pb-4 text-right">Time</th>
                </tr>
              </thead>
              <tbody>
                {recentActivityData.map((activity, index) => (
                  <tr key={activity.id}
                    className="border-b border-white/5 last:border-0 hover:bg-white/5 transition-colors"
                  >
                    <td className="py-4 text-white font-medium">{activity.action}</td>
                    <td className="py-4 text-gray-400 text-sm">{activity.details}</td>
                    <td className="py-4 text-gray-500 text-xs text-right whitespace-nowrap">{activity.time}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
