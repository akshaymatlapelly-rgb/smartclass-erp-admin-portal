import React, { useState } from 'react';
import { Award, Plus, Trash2, TrendingUp, User } from 'lucide-react';
import { useAppContext } from '../context/AppContext';
import GlassInput from '../components/erp/GlassInput';
import NeonButton from '../components/erp/NeonButton';

const MarksManagement = () => {
  const { marks, addMark, deleteMark, students, subjects, getGrade } = useAppContext();
  
  const [formData, setFormData] = useState({
    studentId: '', subjectId: '', examType: 'Midterm', marksObtained: '', totalMarks: '100'
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    addMark(formData);
    setFormData({ studentId: '', subjectId: '', examType: 'Midterm', marksObtained: '', totalMarks: '100' });
  };

  const calculatePercentage = (obtained, total) => {
    if (!total || total == 0) return 0;
    return Math.round((obtained / total) * 100);
  };

  const previewPercentage = calculatePercentage(formData.marksObtained, formData.totalMarks);
  const previewGrade = getGrade(previewPercentage);

  // Analytics Data
  const getTopPerformers = () => {
    const studentPerformance = {};
    
    marks.forEach(mark => {
      if (!studentPerformance[mark.studentId]) {
        studentPerformance[mark.studentId] = { totalObtained: 0, totalMax: 0 };
      }
      studentPerformance[mark.studentId].totalObtained += parseFloat(mark.marksObtained);
      studentPerformance[mark.studentId].totalMax += parseFloat(mark.totalMarks);
    });

    const ranked = Object.entries(studentPerformance).map(([studentId, data]) => {
      const student = students.find(s => s.id === studentId);
      const percentage = calculatePercentage(data.totalObtained, data.totalMax);
      return {
        id: studentId,
        name: student?.name || 'Unknown',
        course: student?.course || '',
        percentage,
        grade: getGrade(percentage)
      };
    }).sort((a, b) => b.percentage - a.percentage).slice(0, 5);

    return ranked;
  };

  const topPerformers = getTopPerformers();

  // Grade Distribution Data
  const gradeCounts = { 'A+': 0, 'A': 0, 'B': 0, 'C': 0, 'D': 0, 'F': 0 };
  marks.forEach(mark => {
    const percentage = calculatePercentage(mark.marksObtained, mark.totalMarks);
    gradeCounts[getGrade(percentage)]++;
  });
  
  const gradeDistributionData = Object.entries(gradeCounts)
    .filter(([_, count]) => count > 0)
    .map(([grade, count]) => {
      const percentageOfTotal = marks.length > 0 ? Math.round((count / marks.length) * 100) : 0;
      return { grade, count, percentage: percentageOfTotal };
    });

  // Subject Average Data
  const subjectAveragesData = subjects.map(subject => {
    const subjectMarks = marks.filter(m => m.subjectId === subject.id);
    if (subjectMarks.length === 0) return { name: subject.name, code: subject.code, avgMarks: '0/0', avgPercentage: 0, topGrade: '-' };
    
    let totalObtained = 0;
    let totalMax = 0;
    let highestPercentage = 0;

    subjectMarks.forEach(m => {
      totalObtained += parseFloat(m.marksObtained);
      totalMax += parseFloat(m.totalMarks);
      const pct = calculatePercentage(m.marksObtained, m.totalMarks);
      if (pct > highestPercentage) highestPercentage = pct;
    });

    const avgObtained = Math.round(totalObtained / subjectMarks.length);
    const avgMax = Math.round(totalMax / subjectMarks.length);
    const avgPercentage = totalMax > 0 ? Math.round((totalObtained / totalMax) * 100) : 0;
    const topGrade = getGrade(highestPercentage);

    return {
      name: subject.name,
      code: subject.code,
      avgMarks: `${avgObtained}/${avgMax}`,
      avgPercentage,
      topGrade
    };
  });

  return (
    <div className="space-y-6"
    >
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-orbitron font-bold text-white mb-2">Marks & Grading</h1>
          <p className="text-gray-400 font-inter">Manage student evaluations and analytics</p>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Left Column: Form & Recent Entries */}
        <div className="xl:col-span-2 space-y-6">
          <div className="glass-card border border-white/10">
            <h3 className="text-xl font-orbitron text-white mb-6 flex items-center gap-2">
              <Plus className="text-neon-purple" size={20} /> Add Marks Entry
            </h3>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <GlassInput 
                  label="Student" 
                  type="select"
                  options={students.map(s => ({ value: s.id, label: `${s.name} (${s.regNo})` }))}
                  value={formData.studentId} 
                  onChange={(e) => setFormData({...formData, studentId: e.target.value})} 
                  required 
                />
                <GlassInput 
                  label="Subject" 
                  type="select"
                  options={subjects.map(s => ({ value: s.id, label: `${s.code} - ${s.name}` }))}
                  value={formData.subjectId} 
                  onChange={(e) => setFormData({...formData, subjectId: e.target.value})} 
                  required 
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <GlassInput 
                  label="Exam Type" 
                  type="select"
                  options={['Midterm', 'Final', 'Assignment', 'Project']}
                  value={formData.examType} 
                  onChange={(e) => setFormData({...formData, examType: e.target.value})} 
                  required 
                />
                <GlassInput 
                  label="Marks Obtained" 
                  type="number"
                  value={formData.marksObtained} 
                  onChange={(e) => setFormData({...formData, marksObtained: e.target.value})} 
                  required 
                />
                <GlassInput 
                  label="Total Marks" 
                  type="number"
                  value={formData.totalMarks} 
                  onChange={(e) => setFormData({...formData, totalMarks: e.target.value})} 
                  required 
                />
              </div>

              <div className="bg-white/5 border border-white/10 rounded-lg p-4 flex justify-between items-center">
                <div>
                  <p className="text-sm text-gray-400 mb-1">Preview Calculation</p>
                  <p className="text-xl font-orbitron text-white">{previewPercentage}%</p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-400 mb-1">Predicted Grade</p>
                  <p className={`text-2xl font-orbitron font-bold ${
                    previewGrade.includes('A') ? 'text-neon-green' :
                    previewGrade === 'B' ? 'text-neon-blue' :
                    previewGrade === 'C' ? 'text-neon-purple' :
                    previewGrade === 'D' ? 'text-neon-amber' : 'text-neon-pink'
                  }`}>{previewGrade}</p>
                </div>
                <NeonButton type="submit" variant="primary">
                  Save Marks
                </NeonButton>
              </div>
            </form>
          </div>

          <div className="glass-card border border-white/10">
            <h3 className="text-lg font-orbitron text-white mb-4">Recent Entries</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="text-gray-400 font-inter text-sm uppercase tracking-wider border-b border-white/10">
                    <th className="pb-3 font-medium">Student</th>
                    <th className="pb-3 font-medium">Subject</th>
                    <th className="pb-3 font-medium">Exam</th>
                    <th className="pb-3 font-medium text-right">Marks</th>
                    <th className="pb-3 font-medium text-right">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {marks.slice().reverse().map(mark => {
                    const student = students.find(s => s.id === mark.studentId);
                    const subject = subjects.find(s => s.id === mark.subjectId);
                    const percentage = calculatePercentage(mark.marksObtained, mark.totalMarks);
                    
                    return (
                      <tr key={mark.id} className="border-b border-white/5 last:border-0">
                        <td className="py-3 text-white">{student?.name}</td>
                        <td className="py-3 text-gray-300">{subject?.code}</td>
                        <td className="py-3 text-gray-300">{mark.examType}</td>
                        <td className="py-3 text-right">
                          <span className="text-white font-medium">{mark.marksObtained}</span>
                          <span className="text-gray-500 text-xs">/{mark.totalMarks}</span>
                          <span className="ml-2 text-xs font-bold text-neon-blue">({percentage}%)</span>
                        </td>
                        <td className="py-3 text-right">
                          <button onClick={() => deleteMark(mark.id)}
                            className="p-1.5 text-gray-400 hover:text-neon-pink transition-colors"
                          >
                            <Trash2 size={16} />
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                  {marks.length === 0 && (
                    <tr>
                      <td colSpan="5" className="py-6 text-center text-gray-500">No marks entered yet.</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Right Column: Analytics & Leaderboard */}
        <div className="space-y-6">
          <div className="glass-card border border-white/10">
            <h3 className="text-lg font-orbitron text-white mb-4 flex items-center gap-2">
              <Award className="text-neon-amber" size={20} /> Top Performers
            </h3>
            <div className="space-y-4">
              {topPerformers.map((student, index) => (
                <div key={student.id} className="flex items-center gap-3 p-3 bg-white/5 rounded-lg border border-white/5">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center font-orbitron font-bold text-sm ${
                    index === 0 ? 'bg-gradient-to-br from-yellow-300 to-yellow-600 text-white shadow-[0_0_10px_rgba(251,191,36,0.5)]' :
                    index === 1 ? 'bg-gradient-to-br from-gray-300 to-gray-500 text-white shadow-[0_0_10px_rgba(156,163,175,0.5)]' :
                    index === 2 ? 'bg-gradient-to-br from-orange-400 to-orange-700 text-white shadow-[0_0_10px_rgba(234,88,12,0.5)]' :
                    'bg-white/10 text-gray-400'
                  }`}>
                    #{index + 1}
                  </div>
                  <div className="flex-1">
                    <p className="text-white text-sm font-medium">{student.name}</p>
                    <p className="text-xs text-gray-400">{student.course}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-neon-blue font-bold text-sm">{student.percentage}%</p>
                    <p className="text-xs text-gray-400">Grade {student.grade}</p>
                  </div>
                </div>
              ))}
              {topPerformers.length === 0 && (
                <p className="text-center text-gray-500 py-4">No data available.</p>
              )}
            </div>
          </div>

          <div className="glass-card border border-white/5 rounded-2xl p-6"
          >
            <h3 className="text-lg font-orbitron text-white mb-4">Grade Distribution</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="text-xs font-medium text-muted-foreground uppercase tracking-wider border-b border-white/10">
                    <th className="pb-3">Grade</th>
                    <th className="pb-3 text-center">Count</th>
                    <th className="pb-3 text-right">% of Total</th>
                  </tr>
                </thead>
                <tbody>
                  {gradeDistributionData.map((data, index) => (
                    <tr key={data.grade}
                      className="border-b border-white/5 last:border-0 hover:bg-white/5 transition-colors"
                    >
                      <td className={`py-3 font-orbitron font-bold ${
                        data.grade.includes('A') ? 'text-neon-green' :
                        data.grade === 'B' ? 'text-neon-blue' :
                        data.grade === 'C' ? 'text-neon-purple' :
                        data.grade === 'D' ? 'text-neon-amber' : 'text-neon-pink'
                      }`}>
                        {data.grade}
                      </td>
                      <td className="py-3 text-gray-300 text-center">{data.count}</td>
                      <td className="py-3 text-gray-400 text-right">{data.percentage}%</td>
                    </tr>
                  ))}
                  {gradeDistributionData.length === 0 && (
                    <tr>
                      <td colSpan="3" className="py-6 text-center text-gray-500">No grades assigned yet.</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>

          <div className="glass-card border border-white/5 rounded-2xl p-6"
          >
            <h3 className="text-lg font-orbitron text-white mb-4 flex items-center gap-2">
              <TrendingUp className="text-neon-green" size={18} /> Subject Averages
            </h3>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="text-xs font-medium text-muted-foreground uppercase tracking-wider border-b border-white/10">
                    <th className="pb-3">Subject Name</th>
                    <th className="pb-3 text-center">Avg Marks</th>
                    <th className="pb-3 text-center">Avg %</th>
                    <th className="pb-3 text-right">Top Grade</th>
                  </tr>
                </thead>
                <tbody>
                  {subjectAveragesData.map((data, index) => (
                    <tr key={data.code}
                      className="border-b border-white/5 last:border-0 hover:bg-white/5 transition-colors"
                    >
                      <td className="py-3">
                        <div className="flex flex-col">
                          <span className="text-white font-medium text-sm whitespace-nowrap">{data.name}</span>
                          <span className="text-xs text-gray-500">{data.code}</span>
                        </div>
                      </td>
                      <td className="py-3 text-gray-300 text-center text-sm">{data.avgMarks}</td>
                      <td className="py-3 text-center">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          data.avgPercentage >= 75 ? 'bg-neon-green/20 text-neon-green' : 
                          data.avgPercentage >= 50 ? 'bg-neon-amber/20 text-neon-amber' : 'bg-neon-pink/20 text-neon-pink'
                        }`}>
                          {data.avgPercentage}%
                        </span>
                      </td>
                      <td className={`py-3 text-right font-orbitron font-bold text-sm ${
                        data.topGrade.includes('A') ? 'text-neon-green' :
                        data.topGrade === 'B' ? 'text-neon-blue' :
                        data.topGrade === 'C' ? 'text-neon-purple' :
                        data.topGrade === 'D' ? 'text-neon-amber' : 
                        data.topGrade === '-' ? 'text-gray-500' : 'text-neon-pink'
                      }`}>
                        {data.topGrade}
                      </td>
                    </tr>
                  ))}
                  {subjectAveragesData.length === 0 && (
                    <tr>
                      <td colSpan="4" className="py-6 text-center text-gray-500">No subjects available.</td>
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

export default MarksManagement;
