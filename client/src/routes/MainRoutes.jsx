import { lazy } from 'react';

// project import
import Loadable from 'components/Loadable';
import Dashboard from 'layout/Dashboard';
import TabPassword from 'pages/portal/account/TabPassword';

const DashboardDefault = Loadable(lazy(() => import('pages/dashboard/index')));

// rooms
const Rooms = Loadable(lazy(() => import('pages/portal/rooms/index')));
const RoomsForm = Loadable(lazy(() => import('pages/portal/rooms/form')));
const RoomDetails = Loadable(lazy(() => import('pages/portal/rooms/details')));

// activities
const Activities = Loadable(lazy(() => import('pages/portal/activities/index')));

// press-release
const PressRelease = Loadable(lazy(() => import('pages/portal/press-release/index')));

// appointments
const Appointments = Loadable(lazy(() => import('pages/portal/appointments/index')));

// calendar
const Calendar = Loadable(lazy(() => import('pages/portal/calendar/index')));

// archives
const Archives = Loadable(lazy(() => import('pages/portal/archives/index')));

// website-tickets
const WebsiteTickets = Loadable(lazy(() => import('pages/portal/website-tickets/index')));

// human-resource
const Staffs = Loadable(lazy(() => import('pages/portal/staffs/index')));

// profile
const EditProfile = Loadable(lazy(() => import('pages/portal/profile/EditProfile')));
const ViewProfile = Loadable(lazy(() => import('pages/portal/profile/ViewProfile')));

// reservations
const RoomReservations = Loadable(lazy(() => import('pages/portal/reservations/room-reservations/index')));

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
          path: 'reservations',
          children: [
            {
              path: 'rooms',
              element: <RoomReservations />,
            },
          ]
        },
        {
          path: 'activities',
          element: <Activities />,
        },
        {
          path: 'press-release',
          element: <PressRelease />,
        },
        {
          path: 'appointments',
          element: <Appointments />,
        },
        {
          path: 'calendar',
          element: <Calendar />,
        },
        {
          path: 'archives',
          element: <Archives />,
        },
        {
          path: 'website-tickets',
          element: <WebsiteTickets />,
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
        {
          path: 'account',
          children: [
            {
              path: 'change-password',
              element: <TabPassword />
            },
          ]
        },
      ]
    },
  ]
};

export default MainRoutes;
