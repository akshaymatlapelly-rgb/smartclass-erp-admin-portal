import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import WhatsAppChat from '../erp/WhatsAppChat';

const DashboardLayout = () => {
  return (
    <div className="flex min-h-screen bg-transparent">
      <Sidebar />
      <main className="flex-1 md:ml-64 pt-16 md:pt-0 p-4 md:p-8 overflow-x-hidden min-h-screen">
        <Outlet />
      </main>
      <WhatsAppChat />
    </div>
  );
};

export default DashboardLayout;
