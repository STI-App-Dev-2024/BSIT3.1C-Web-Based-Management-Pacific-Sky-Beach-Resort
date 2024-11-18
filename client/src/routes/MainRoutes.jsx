import { lazy } from 'react';

// project import
import Loadable from 'components/Loadable';
import Dashboard from 'layout/Dashboard';

const DashboardDefault = Loadable(lazy(() => import('pages/dashboard/index')));

// rooms
const Rooms = Loadable(lazy(() => import('pages/portal/rooms/index')));
const RoomsForm = Loadable(lazy(() => import('pages/portal/rooms/form')));
const RoomDetails = Loadable(lazy(() => import('pages/portal/rooms/details')));

// human-resource
const Staffs = Loadable(lazy(() => import('pages/portal/staffs/index')));

// profile
const EditProfile = Loadable(lazy(() => import('pages/portal/profile/EditProfile')));
const ViewProfile = Loadable(lazy(() => import('pages/portal/profile/ViewProfile')));

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
          path: 'rooms',
          children: [
            {
              index: true,
              element: <Rooms />,
            },
            {
              path: 'form',
              element: <RoomsForm />,
            },
            {
              path: 'details',
              children: [
                {
                  path: ':roomId',
                  element: <RoomDetails />,
                }
              ]
            },
          ]
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
            {
              path: 'view',
              element: <ViewProfile />
            },
          ]
        },
      ]
    },
  ]
};

export default MainRoutes;
