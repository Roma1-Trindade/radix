import React, { ReactNode } from 'react';

import Navbar from './navbar';
import Sidebar from './sidebar';

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div>
      <Navbar />
      <div className="flex">
        <Sidebar />
        <main className="p-4 sm:ml-64 flex-1 mt-14">{children}</main>
      </div>
    </div>
  );
};

export default Layout;
