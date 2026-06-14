const fs = require('fs');
const files = [
  'src/components/erp/WhatsAppChat.jsx',
  'src/pages/AssignmentManagement.jsx',
  'src/components/layout/Sidebar.jsx',
  'src/pages/SmartLogin.jsx',
  'src/pages/StudentManagement.jsx',
  'src/pages/TimetableManagement.jsx'
];

files.forEach(file => {
  if (fs.existsSync(file)) {
    let content = fs.readFileSync(file, 'utf8');
    content = content.replace(/<AnimatePresence(?:[^>]*)>/g, '');
    content = content.replace(/<\/AnimatePresence>/g, '');
    
    // Also remove any lingering framer motion props from button
    content = content.replace(/\s*whileHover=\{\{[^}]+\}\}/g, '');
    content = content.replace(/\s*whileTap=\{\{[^}]+\}\}/g, '');

    fs.writeFileSync(file, content);
  }
});
