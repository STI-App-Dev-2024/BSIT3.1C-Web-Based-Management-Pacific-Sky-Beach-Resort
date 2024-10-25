import { lazy } from 'react';

// project import
import Loadable from 'components/Loadable';
import Dashboard from 'layout/Dashboard';

// modules
import Staffs from 'pages/portal/staffs/index'

const DashboardDefault = Loadable(lazy(() => import('pages/dashboard/index')));

// ==============================|| MAIN ROUTING ||============================== //

const MainRoutes = {
  path: '/',
  element: <Dashboard />,
  children: [
    {
      path: '/',
      element: <DashboardDefault />
    },
    {
      path: 'portal',
      children: [
        {
          path: 'dashboard',
          element: <DashboardDefault />
        },
        {
          path: 'staffs',
          element: <Staffs />
        },
      ]
    },
  ]
};

export default MainRoutes;
