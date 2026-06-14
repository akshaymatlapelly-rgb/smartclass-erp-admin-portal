import React, { useState } from 'react';
import { Search, Plus, Edit2, Trash2, UserPlus } from 'lucide-react';
import { useAppContext } from '../context/AppContext';
import GlassModal from '../components/erp/GlassModal';
import GlassInput from '../components/erp/GlassInput';
import NeonButton from '../components/erp/NeonButton';

const StudentManagement = () => {
  const { students, addStudent, updateStudent, deleteStudent } = useAppContext();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCourse, setFilterCourse] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingStudent, setEditingStudent] = useState(null);

  const [formData, setFormData] = useState({
    name: '', regNo: '', course: '', semester: '', email: '', phone: '', status: 'Active'
  });

  const courses = [...new Set(students.map(s => s.course))];

  const filteredStudents = students.filter(student => {
    const matchesSearch = student.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          student.regNo.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCourse = filterCourse ? student.course === filterCourse : true;
    return matchesSearch && matchesCourse;
  });

  const handleOpenModal = (student = null) => {
    if (student) {
      setEditingStudent(student);
      setFormData(student);
    } else {
      setEditingStudent(null);
      setFormData({ name: '', regNo: '', course: '', semester: '', email: '', phone: '', status: 'Active' });
    }
    setIsModalOpen(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingStudent) {
      updateStudent(editingStudent.id, formData);
    } else {
      addStudent(formData);
    }
    setIsModalOpen(false);
  };

  const getInitials = (name) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase().substring(0, 2);
  };

  return (
    <div className="space-y-6"
    >
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-orbitron font-bold text-white mb-2">Student Management</h1>
          <p className="text-gray-400 font-inter">Manage student records and enrollments</p>
        </div>
        <NeonButton onClick={() => handleOpenModal()} variant="primary">
          <Plus size={18} /> Add Student
        </NeonButton>
      </div>

      <div className="glass-card p-4 flex flex-col md:flex-row gap-4 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-2.5 text-gray-400" size={18} />
          <input
            type="text"
            placeholder="Search by name or registration number..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-white/5 border border-white/10 rounded-lg pl-10 pr-4 py-2 text-white focus:outline-none focus:border-neon-purple transition-colors"
          />
        </div>
        <div className="w-full md:w-64">
          <select
            value={filterCourse}
            onChange={(e) => setFilterCourse(e.target.value)}
            className="w-full bg-navy-purple border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-neon-purple appearance-none"
          >
            <option value="">All Courses</option>
            {courses.map(course => (
              <option key={course} value={course}>{course}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="glass-card overflow-x-auto p-0 border border-white/10">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-white/5 border-b border-white/10 text-gray-300 font-inter text-sm uppercase tracking-wider">
              <th className="px-6 py-4 font-medium">Student</th>
              <th className="px-6 py-4 font-medium">Reg No</th>
              <th className="px-6 py-4 font-medium">Course</th>
              <th className="px-6 py-4 font-medium">Status</th>
              <th className="px-6 py-4 font-medium text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            
              {filteredStudents.length > 0 ? (
                filteredStudents.map((student) => (
                  <tr key={student.id}
                    className="border-b border-white/5 hover:bg-white/5 transition-colors"
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-neon-purple to-neon-blue flex items-center justify-center text-white font-bold shadow-[0_0_10px_rgba(139,92,246,0.3)]">
                          {getInitials(student.name)}
                        </div>
                        <div>
                          <p className="text-white font-medium">{student.name}</p>
                          <p className="text-xs text-gray-400">{student.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-gray-300 font-inter">{student.regNo}</td>
                    <td className="px-6 py-4 text-gray-300 font-inter">
                      {student.course} <span className="text-xs text-gray-500">(Sem {student.semester})</span>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium border ${
                        student.status === 'Active' 
                          ? 'bg-neon-green/10 text-neon-green border-neon-green/30' 
                          : 'bg-neon-pink/10 text-neon-pink border-neon-pink/30'
                      }`}>
                        {student.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex justify-end gap-2">
                        <button onClick={() => handleOpenModal(student)}
                          className="p-2 text-neon-blue hover:bg-neon-blue/10 rounded-lg transition-colors"
                        >
                          <Edit2 size={16} />
                        </button>
                        <button onClick={() => deleteStudent(student.id)}
                          className="p-2 text-neon-pink hover:bg-neon-pink/10 rounded-lg transition-colors"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="px-6 py-8 text-center text-gray-500">
                    <UserPlus className="mx-auto mb-2 opacity-50" size={32} />
                    <p>No students found matching your search.</p>
                  </td>
                </tr>
              )}
            
          </tbody>
        </table>
      </div>

      <GlassModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)}
        title={editingStudent ? "Edit Student" : "Add New Student"}
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <GlassInput 
            label="Full Name" 
            value={formData.name} 
            onChange={(e) => setFormData({...formData, name: e.target.value})} 
            required 
          />
          <div className="grid grid-cols-2 gap-4">
            <GlassInput 
              label="Registration No." 
              value={formData.regNo} 
              onChange={(e) => setFormData({...formData, regNo: e.target.value})} 
              required 
            />
            <GlassInput 
              label="Course" 
              value={formData.course} 
              onChange={(e) => setFormData({...formData, course: e.target.value})} 
              required 
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <GlassInput 
              label="Semester" 
              type="number"
              value={formData.semester} 
              onChange={(e) => setFormData({...formData, semester: e.target.value})} 
              required 
            />
            <GlassInput 
              label="Status" 
              type="select"
              options={['Active', 'Inactive', 'Graduated']}
              value={formData.status} 
              onChange={(e) => setFormData({...formData, status: e.target.value})} 
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <GlassInput 
              label="Email" 
              type="email"
              value={formData.email} 
              onChange={(e) => setFormData({...formData, email: e.target.value})} 
              required 
            />
            <GlassInput 
              label="Phone" 
              value={formData.phone} 
              onChange={(e) => setFormData({...formData, phone: e.target.value})} 
              required 
            />
          </div>
          
          <div className="flex justify-end gap-3 mt-6 pt-4 border-t border-white/10">
            <NeonButton variant="ghost" onClick={() => setIsModalOpen(false)}>
              Cancel
            </NeonButton>
            <NeonButton type="submit" variant="primary">
              {editingStudent ? 'Save Changes' : 'Add Student'}
            </NeonButton>
          </div>
        </form>
      </GlassModal>
    </div>
  );
};

export default StudentManagement;
