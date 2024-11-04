import { lazy } from 'react';

// project import
import Loadable from 'components/Loadable';
import Dashboard from 'layout/Dashboard';

const DashboardDefault = Loadable(lazy(() => import('pages/dashboard/index')));

// human-resource
const Staffs = Loadable(lazy(() => import('pages/portal/staffs/index')));

// profile
const EditProfile = Loadable(lazy(() => import('pages/portal/profile/EditProfile')));

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
        {
          path: 'profile',
          children: [
            {
              path: 'edit',
              element: <EditProfile />
            },
          ]
        },
      ]
    },
  ]
};

export default MainRoutes;
