import React from 'react';
import { Outlet } from 'react-router-dom';

const PublicLayout: React.FC = () => {
  return (
    <div className="wrapper">
      <Outlet />
    </div>
  );
};

export default PublicLayout;