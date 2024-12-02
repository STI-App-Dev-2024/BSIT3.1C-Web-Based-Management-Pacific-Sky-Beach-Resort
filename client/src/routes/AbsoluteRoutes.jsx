import { lazy } from 'react';

// project import

import Loadable from 'components/Loadable';
import PageWrapper from 'layout/Wrapper';
import SuccessPage from 'components/SuccessPage';




// render - absolute pages
const Home = Loadable(lazy(() => import('pages/home/index')));

/* rooms */
const Rooms = Loadable(lazy(() => import('pages/rooms/index')));
const RoomDetails = Loadable(lazy(() => import('pages/rooms/details')));

const AboutUs = Loadable(lazy(() => import('pages/about-us/index')));
const ContactUs = Loadable(lazy(() => import('pages/contact-us/index')));


const NotFoundPage = Loadable(lazy(() => import('pages/portal/maintenance/404')));

// ==============================|| AUTH ROUTING ||============================== //

const AbsoluteRoutes = {
  path: '/',
  children: [
    {
      path: '/',
      element: <PageWrapper isHomePage={true} children={<Home />} />
    },
    {
      path: '/rooms',
      children: [
        {
          index: true,
          element: <PageWrapper children={<Rooms />} />,
        },
        {
          path: 'details',
          children: [
            {
              path: ':roomId',
              element: <PageWrapper children={<RoomDetails />} />,
            }
          ]
        },
      ]
    },
    {
      path: '/about-us',
      element: <PageWrapper children={<AboutUs />} />
    },
    {
      path: '/contact-us',
      element: <PageWrapper children={<ContactUs />} />
    },
    {
      path: '*',
      element: <NotFoundPage />
    },
    {
      path: '/success/booking-room',
      element: <SuccessPage heading="You've successfully booked a room reservation with us." message='Please check your email for further details. Please also check the spam.' />
    },
  ]

};

export default AbsoluteRoutes