import React, { useState } from 'react';
import { Plus, Trash2, Clock, MapPin, User } from 'lucide-react';
import { useAppContext } from '../context/AppContext';
import GlassModal from '../components/erp/GlassModal';
import GlassInput from '../components/erp/GlassInput';
import NeonButton from '../components/erp/NeonButton';

const TimetableManagement = () => {
  const { timetable, addTimetableSlot, deleteTimetableSlot, subjects } = useAppContext();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [hoveredSlot, setHoveredSlot] = useState(null);

  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const times = ['09:00 AM', '10:00 AM', '11:00 AM', '12:00 PM', '01:00 PM', '02:00 PM', '03:00 PM', '04:00 PM'];

  const [formData, setFormData] = useState({
    day: 'Monday', time: '09:00 AM', subject: '', faculty: '', room: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    addTimetableSlot(formData);
    setIsModalOpen(false);
    setFormData({ day: 'Monday', time: '09:00 AM', subject: '', faculty: '', room: '' });
  };

  const getSlot = (day, time) => {
    return timetable.find(slot => slot.day === day && slot.time === time);
  };

  const subjectOptions = subjects.map(sub => ({ value: sub.code, label: `${sub.code} - ${sub.name}` }));

  return (
    <div className="space-y-6"
    >
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-orbitron font-bold text-white mb-2">Timetable</h1>
          <p className="text-gray-400 font-inter">Manage weekly class schedules</p>
        </div>
        <NeonButton onClick={() => setIsModalOpen(true)} variant="primary">
          <Plus size={18} /> Add Slot
        </NeonButton>
      </div>

      <div className="glass-card overflow-x-auto p-0 border border-white/10">
        <div className="min-w-[800px]">
          {/* Header Row */}
          <div className="grid grid-cols-7 bg-white/5 border-b border-white/10">
            <div className="p-4 font-orbitron text-gray-400 text-center border-r border-white/10">
              <Clock size={20} className="mx-auto mb-1 opacity-50" />
              Time
            </div>
            {days.map(day => (
              <div key={day} className="p-4 font-orbitron text-center text-white border-r border-white/10 last:border-r-0">
                {day}
              </div>
            ))}
          </div>

          {/* Time Rows */}
          {times.map(time => (
            <div key={time} className="grid grid-cols-7 border-b border-white/5 last:border-b-0">
              <div className="p-4 flex items-center justify-center font-inter text-sm text-gray-400 bg-white/5 border-r border-white/10">
                {time}
              </div>
              
              {days.map(day => {
                const slot = getSlot(day, time);
                return (
                  <div key={`${day}-${time}`} 
                    className="p-2 border-r border-white/5 last:border-r-0 min-h-[100px] relative transition-colors hover:bg-white/5"
                    onMouseEnter={() => setHoveredSlot(slot?.id)}
                    onMouseLeave={() => setHoveredSlot(null)}
                  >
                    {slot ? (
                      <div className="h-full bg-gradient-to-br from-neon-purple/20 to-neon-blue/20 border border-neon-purple/30 rounded-lg p-2 flex flex-col justify-between"
                      >
                        <div>
                          <span className="text-xs font-bold text-neon-blue block mb-1">{slot.subject}</span>
                          <div className="flex items-center text-xs text-gray-300 gap-1 mt-1">
                            <User size={10} /> <span className="truncate">{slot.faculty}</span>
                          </div>
                          <div className="flex items-center text-xs text-gray-400 gap-1 mt-1">
                            <MapPin size={10} /> <span className="truncate">{slot.room}</span>
                          </div>
                        </div>
                        
                        
                          {hoveredSlot === slot.id && (
                            <button onClick={() => deleteTimetableSlot(slot.id)}
                              className="absolute top-2 right-2 p-1.5 bg-neon-pink/20 text-neon-pink rounded hover:bg-neon-pink hover:text-white transition-colors"
                            >
                              <Trash2 size={12} />
                            </button>
                          )}
                        
                      </div>
                    ) : (
                      <div className="w-full h-full border border-dashed border-white/10 rounded-lg opacity-0 hover:opacity-100 flex items-center justify-center cursor-pointer transition-opacity" onClick={() => { setFormData({...formData, day, time}); setIsModalOpen(true); }}>
                        <Plus size={20} className="text-gray-500" />
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      </div>

      <GlassModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)}
        title="Add Timetable Slot"
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <GlassInput 
              label="Day" 
              type="select"
              options={days}
              value={formData.day} 
              onChange={(e) => setFormData({...formData, day: e.target.value})} 
              required 
            />
            <GlassInput 
              label="Time" 
              type="select"
              options={times}
              value={formData.time} 
              onChange={(e) => setFormData({...formData, time: e.target.value})} 
              required 
            />
          </div>
          <GlassInput 
            label="Subject" 
            type="select"
            options={subjectOptions}
            value={formData.subject} 
            onChange={(e) => setFormData({...formData, subject: e.target.value})} 
            required 
          />
          <div className="grid grid-cols-2 gap-4">
            <GlassInput 
              label="Faculty" 
              value={formData.faculty} 
              onChange={(e) => setFormData({...formData, faculty: e.target.value})} 
              required 
            />
            <GlassInput 
              label="Room" 
              value={formData.room} 
              onChange={(e) => setFormData({...formData, room: e.target.value})} 
              required 
            />
          </div>
          
          <div className="flex justify-end gap-3 mt-6 pt-4 border-t border-white/10">
            <NeonButton variant="ghost" onClick={() => setIsModalOpen(false)}>
              Cancel
            </NeonButton>
            <NeonButton type="submit" variant="primary">
              Add Slot
            </NeonButton>
          </div>
        </form>
      </GlassModal>
    </div>
  );
};

export default TimetableManagement;
