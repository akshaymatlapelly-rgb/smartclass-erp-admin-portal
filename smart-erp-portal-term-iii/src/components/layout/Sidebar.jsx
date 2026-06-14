import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { 
  LayoutDashboard, Users, BookOpen, Calendar, 
  CheckSquare, FileText, Award, LogOut, Menu, X 
} from 'lucide-react';
import { useAppContext } from '../../context/AppContext';

const Sidebar = () => {
  const { logout, auth } = useAppContext();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { path: '/', label: 'Dashboard', icon: LayoutDashboard },
    { path: '/students', label: 'Students', icon: Users },
    { path: '/subjects', label: 'Subjects', icon: BookOpen },
    { path: '/timetable', label: 'Timetable', icon: Calendar },
    { path: '/attendance', label: 'Attendance', icon: CheckSquare },
    { path: '/assignments', label: 'Assignments', icon: FileText },
    { path: '/marks', label: 'Marks', icon: Award },
  ];

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const sidebarContent = (
    <div className="flex flex-col h-full bg-navy-purple-light/80 backdrop-blur-xl border-r border-white/10 w-64 p-4 z-40">
      <div className="flex items-center gap-3 px-2 mb-10 mt-4">
        <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center shadow-[0_0_15px_rgba(255,255,255,0.3)] overflow-hidden p-0.5">
          <img src="https://plain-apac-prod-public.komododecks.com/202605/22/IHRQzXDMaTRe22mGudhd/image.png" alt="SmartClass Logo" className="w-full h-full object-contain" />
        </div>
        <h1 className="font-orbitron text-xl font-bold text-gradient-primary">SmartClass</h1>
      </div>

      <div className="px-4 mb-6">
        <p className="text-xs text-gray-400 font-inter uppercase tracking-wider">Admin Portal</p>
        <p className="text-sm text-gray-300 truncate mt-1">{auth?.email}</p>
      </div>

      <nav className="flex-1 space-y-2">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            onClick={() => setIsOpen(false)}
            className={({ isActive }) => 
              `flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-300 ${
                isActive 
                  ? 'bg-white/10 text-neon-blue shadow-[0_0_10px_rgba(59,178,255,0.2)] border border-neon-blue/30' 
                  : 'text-gray-400 hover:bg-white/5 hover:text-white'
              }`
            }
          >
            <item.icon size={20} />
            <span className="font-medium font-inter">{item.label}</span>
          </NavLink>
        ))}
      </nav>

      <div className="mt-auto pt-4 border-t border-white/10">
        <button onClick={handleLogout}
          className="flex items-center gap-3 px-4 py-3 w-full text-left text-gray-400 hover:text-neon-pink hover:bg-white/5 rounded-lg transition-colors"
        >
          <LogOut size={20} />
          <span className="font-medium font-inter">Logout</span>
        </button>
      </div>
    </div>
  );

  return (
    <>
      {/* Mobile Header */}
      <div className="md:hidden fixed top-0 left-0 right-0 h-16 bg-navy-purple-light/90 backdrop-blur-md border-b border-white/10 flex items-center justify-between px-4 z-50">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-white rounded-md flex items-center justify-center overflow-hidden p-0.5">
            <img src="https://plain-apac-prod-public.komododecks.com/202605/22/IHRQzXDMaTRe22mGudhd/image.png" alt="SmartClass Logo" className="w-full h-full object-contain" />
          </div>
          <h1 className="font-orbitron font-bold text-gradient-primary">SmartClass</h1>
        </div>
        <button onClick={() => setIsOpen(!isOpen)} className="text-white p-2">
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Desktop Sidebar */}
      <div className="hidden md:block fixed top-0 left-0 h-screen">
        {sidebarContent}
      </div>

      {/* Mobile Sidebar */}
      
        {isOpen && (
          <div className="md:hidden fixed inset-y-0 left-0 z-40"
          >
            {sidebarContent}
          </div>
        )}
      

      {/* Mobile Overlay */}
      {isOpen && (
        <div className="md:hidden fixed inset-0 bg-black/50 backdrop-blur-sm z-30"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  );
};
export default Sidebar;
