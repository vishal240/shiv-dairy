import React from 'react';
import { Outlet } from 'react-router-dom';
import TopSideBar from '../components/TopSideBar';

const AuthenticatedLayout: React.FC = () => {
  return (
    <div className="wrapper2">
      <TopSideBar />
      <div className="container-fluid">
        <Outlet />
      </div>
    </div>
  );
};

export default AuthenticatedLayout;