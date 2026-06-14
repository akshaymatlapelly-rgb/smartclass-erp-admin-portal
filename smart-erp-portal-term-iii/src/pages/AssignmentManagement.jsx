import React, { useState } from 'react';
import { Plus, Trash2, Calendar, FileText, BookOpen, Clock } from 'lucide-react';
import { useAppContext } from '../context/AppContext';
import GlassModal from '../components/erp/GlassModal';
import GlassInput from '../components/erp/GlassInput';
import NeonButton from '../components/erp/NeonButton';

const AssignmentManagement = () => {
  const { assignments, addAssignment, deleteAssignment, subjects } = useAppContext();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [formData, setFormData] = useState({
    title: '', description: '', course: '', subject: '', startDate: '', dueDate: '', totalMarks: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    addAssignment(formData);
    setIsModalOpen(false);
    setFormData({ title: '', description: '', course: '', subject: '', startDate: '', dueDate: '', totalMarks: '' });
  };

  const getDaysLeft = (dueDate) => {
    const today = new Date();
    const due = new Date(dueDate);
    const diffTime = due - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const getBadgeStyle = (daysLeft) => {
    if (daysLeft < 0) return { bg: 'bg-gray-500/20', text: 'text-gray-400', border: 'border-gray-500/50', label: 'Expired' };
    if (daysLeft <= 2) return { bg: 'bg-neon-pink/20', text: 'text-neon-pink', border: 'border-neon-pink/50', label: `${daysLeft} days left` };
    if (daysLeft <= 7) return { bg: 'bg-neon-amber/20', text: 'text-neon-amber', border: 'border-neon-amber/50', label: `${daysLeft} days left` };
    return { bg: 'bg-neon-green/20', text: 'text-neon-green', border: 'border-neon-green/50', label: `${daysLeft} days left` };
  };

  const subjectOptions = subjects.map(sub => ({ value: sub.code, label: `${sub.code} - ${sub.name}` }));

  return (
    <div className="space-y-6"
    >
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-orbitron font-bold text-white mb-2">Assignments</h1>
          <p className="text-gray-400 font-inter">Manage coursework and deadlines</p>
        </div>
        <NeonButton onClick={() => setIsModalOpen(true)} variant="primary">
          <Plus size={18} /> Add Assignment
        </NeonButton>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        
          {assignments.map((assignment) => {
            const daysLeft = getDaysLeft(assignment.dueDate);
            const badge = getBadgeStyle(daysLeft);
            
            return (
              <div key={assignment.id}
                className="glass-card flex flex-col h-full border border-white/10 group"
              >
                <div className="flex justify-between items-start mb-4">
                  <div className={`px-3 py-1 rounded-full text-xs font-medium flex items-center gap-1.5 border ${badge.bg} ${badge.text} ${badge.border}`}>
                    <Clock size={12} /> {badge.label}
                  </div>
                  <button onClick={() => deleteAssignment(assignment.id)}
                    className="p-1.5 text-gray-400 hover:text-neon-pink hover:bg-white/10 rounded-lg transition-colors opacity-0 group-hover:opacity-100"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
                
                <h3 className="text-xl font-orbitron font-bold text-white mb-2">{assignment.title}</h3>
                <p className="text-gray-400 text-sm mb-4 flex-1 line-clamp-3">{assignment.description}</p>
                
                <div className="space-y-2 mt-auto pt-4 border-t border-white/10">
                  <div className="flex items-center gap-2 text-sm text-gray-300">
                    <BookOpen size={16} className="text-neon-blue" />
                    <span>{assignment.subject}</span>
                    <span className="text-gray-500 mx-1">•</span>
                    <span>{assignment.course}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-300">
                    <Calendar size={16} className="text-neon-purple" />
                    <span>Due: {new Date(assignment.dueDate).toLocaleDateString()}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-300">
                    <FileText size={16} className="text-neon-green" />
                    <span>Total Marks: {assignment.totalMarks}</span>
                  </div>
                </div>
              </div>
            );
          })}
        
      </div>

      {assignments.length === 0 && (
        <div className="text-center py-20 text-gray-500">
          <FileText className="mx-auto mb-4 opacity-50" size={48} />
          <p className="text-lg">No assignments added yet.</p>
        </div>
      )}

      <GlassModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)}
        title="Create New Assignment"
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <GlassInput 
            label="Assignment Title" 
            value={formData.title} 
            onChange={(e) => setFormData({...formData, title: e.target.value})} 
            required 
          />
          <div className="flex flex-col gap-1 w-full">
            <label className="text-sm text-gray-300 font-inter">Description <span className="text-neon-pink">*</span></label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({...formData, description: e.target.value})}
              required
              className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-neon-purple focus:ring-1 focus:ring-neon-purple transition-all min-h-[100px] resize-none"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <GlassInput 
              label="Course" 
              value={formData.course} 
              onChange={(e) => setFormData({...formData, course: e.target.value})} 
              required 
            />
            <GlassInput 
              label="Subject" 
              type="select"
              options={subjectOptions}
              value={formData.subject} 
              onChange={(e) => setFormData({...formData, subject: e.target.value})} 
              required 
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <GlassInput 
              label="Start Date" 
              type="date"
              value={formData.startDate} 
              onChange={(e) => setFormData({...formData, startDate: e.target.value})} 
              required 
            />
            <GlassInput 
              label="Due Date" 
              type="date"
              value={formData.dueDate} 
              onChange={(e) => setFormData({...formData, dueDate: e.target.value})} 
              required 
            />
          </div>
          <GlassInput 
            label="Total Marks" 
            type="number"
            value={formData.totalMarks} 
            onChange={(e) => setFormData({...formData, totalMarks: e.target.value})} 
            required 
          />
          
          <div className="flex justify-end gap-3 mt-6 pt-4 border-t border-white/10">
            <NeonButton variant="ghost" onClick={() => setIsModalOpen(false)}>
              Cancel
            </NeonButton>
            <NeonButton type="submit" variant="primary">
              Create Assignment
            </NeonButton>
          </div>
        </form>
      </GlassModal>
    </div>
  );
};

export default AssignmentManagement;
