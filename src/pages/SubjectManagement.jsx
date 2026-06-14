import React, { useState } from 'react';
import { Plus, Edit2, Trash2, BookOpen, FlaskConical, Zap } from 'lucide-react';
import { useAppContext } from '../context/AppContext';
import GlassModal from '../components/erp/GlassModal';
import GlassInput from '../components/erp/GlassInput';
import NeonButton from '../components/erp/NeonButton';

const SubjectManagement = () => {
  const { subjects, addSubject, updateSubject, deleteSubject } = useAppContext();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingSubject, setEditingSubject] = useState(null);

  const [formData, setFormData] = useState({
    name: '', code: '', type: 'Theory', credits: '', semester: ''
  });

  const handleOpenModal = (subject = null) => {
    if (subject) {
      setEditingSubject(subject);
      setFormData(subject);
    } else {
      setEditingSubject(null);
      setFormData({ name: '', code: '', type: 'Theory', credits: '', semester: '' });
    }
    setIsModalOpen(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingSubject) {
      updateSubject(editingSubject.id, formData);
    } else {
      addSubject(formData);
    }
    setIsModalOpen(false);
  };

  const getTypeStyle = (type) => {
    switch (type) {
      case 'Theory':
        return { icon: BookOpen, color: 'text-neon-purple', bg: 'bg-neon-purple/10', border: 'border-neon-purple/30', shadow: 'hover:shadow-[0_0_20px_rgba(139,92,246,0.2)]' };
      case 'Lab':
        return { icon: FlaskConical, color: 'text-neon-green', bg: 'bg-neon-green/10', border: 'border-neon-green/30', shadow: 'hover:shadow-[0_0_20px_rgba(52,211,153,0.2)]' };
      case 'Elective':
        return { icon: Zap, color: 'text-neon-amber', bg: 'bg-neon-amber/10', border: 'border-neon-amber/30', shadow: 'hover:shadow-[0_0_20px_rgba(251,191,36,0.2)]' };
      default:
        return { icon: BookOpen, color: 'text-white', bg: 'bg-white/10', border: 'border-white/30', shadow: 'hover:shadow-lg' };
    }
  };

  return (
    <div className="space-y-6"
    >
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-orbitron font-bold text-white mb-2">Subjects</h1>
          <p className="text-gray-400 font-inter">Manage course curriculum and credits</p>
        </div>
        <NeonButton onClick={() => handleOpenModal()} variant="primary">
          <Plus size={18} /> Add Subject
        </NeonButton>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {subjects.map((subject) => {
            const style = getTypeStyle(subject.type);
            const Icon = style.icon;
            
            return (
              <div key={subject.id}
                className={`glass-card relative overflow-hidden transition-all duration-300 ${style.shadow} border ${style.border}`}
              >
                {/* Background glow based on type */}
                <div className={`absolute -right-10 -top-10 w-32 h-32 rounded-full ${style.bg} blur-3xl`} />
                
                <div className="flex justify-between items-start mb-4 relative z-10">
                  <div className={`p-3 rounded-xl ${style.bg} ${style.color}`}>
                    <Icon size={24} />
                  </div>
                  <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button onClick={() => handleOpenModal(subject)}
                      className="text-gray-400 hover:text-neon-blue transition-colors"
                    >
                      <Edit2 size={18} />
                    </button>
                    <button onClick={() => deleteSubject(subject.id)}
                      className="text-gray-400 hover:text-neon-pink transition-colors"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </div>

                <div className="relative z-10">
                  <span className="px-2 py-1 text-xs font-medium rounded-md bg-white/5 border border-white/10 text-gray-300 mb-2 inline-block">
                    {subject.code}
                  </span>
                  <h3 className="text-xl font-orbitron font-bold text-white mb-1 line-clamp-1">
                    {subject.name}
                  </h3>
                  <div className="flex items-center gap-4 mt-4 pt-4 border-t border-white/10">
                    <div className="flex flex-col">
                      <span className="text-xs text-gray-500 uppercase tracking-wider">Credits</span>
                      <span className="text-sm font-medium text-white">{subject.credits}</span>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-xs text-gray-500 uppercase tracking-wider">Semester</span>
                      <span className="text-sm font-medium text-white">{subject.semester}</span>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-xs text-gray-500 uppercase tracking-wider">Type</span>
                      <span className={`text-sm font-medium ${style.color}`}>{subject.type}</span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
      </div>

      {subjects.length === 0 && (
        <div className="text-center py-20 text-gray-500">
          <BookOpen className="mx-auto mb-4 opacity-50" size={48} />
          <p className="text-lg">No subjects added yet.</p>
        </div>
      )}

      <GlassModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)}
        title={editingSubject ? "Edit Subject" : "Add New Subject"}
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <GlassInput 
            label="Subject Name" 
            value={formData.name} 
            onChange={(e) => setFormData({...formData, name: e.target.value})} 
            required 
          />
          <div className="grid grid-cols-2 gap-4">
            <GlassInput 
              label="Subject Code" 
              value={formData.code} 
              onChange={(e) => setFormData({...formData, code: e.target.value})} 
              required 
            />
            <GlassInput 
              label="Type" 
              type="select"
              options={['Theory', 'Lab', 'Elective']}
              value={formData.type} 
              onChange={(e) => setFormData({...formData, type: e.target.value})} 
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <GlassInput 
              label="Credits" 
              type="number"
              value={formData.credits} 
              onChange={(e) => setFormData({...formData, credits: e.target.value})} 
              required 
            />
            <GlassInput 
              label="Semester" 
              type="number"
              value={formData.semester} 
              onChange={(e) => setFormData({...formData, semester: e.target.value})} 
              required 
            />
          </div>
          
          <div className="flex justify-end gap-3 mt-6 pt-4 border-t border-white/10">
            <NeonButton variant="ghost" onClick={() => setIsModalOpen(false)}>
              Cancel
            </NeonButton>
            <NeonButton type="submit" variant="primary">
              {editingSubject ? 'Save Changes' : 'Add Subject'}
            </NeonButton>
          </div>
        </form>
      </GlassModal>
    </div>
  );
};

export default SubjectManagement;
