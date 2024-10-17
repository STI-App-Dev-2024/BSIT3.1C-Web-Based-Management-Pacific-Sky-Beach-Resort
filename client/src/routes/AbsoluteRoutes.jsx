import { lazy } from 'react';

// project import

import Loadable from 'components/Loadable';
import PageWrapper from 'layout/Wrapper';


// render - absolute pages
const Home = Loadable(lazy(() => import('pages/home/index')));
const AboutUs = Loadable(lazy(() => import('pages/about-us/index')));
const ContactUs = Loadable(lazy(() => import('pages/contact-us/index')));
// ==============================|| AUTH ROUTING ||============================== //

const AbsoluteRoutes = {
  path: '/',
  children: [
    {
      path: '/',
      element: <PageWrapper children={<Home />} />
    },

    {
      path: '/about-us',
      element: <PageWrapper children={<AboutUs />} />
    },

    {
      path: '/contact-us',
      element: <PageWrapper children={<ContactUs />} />
    },
  ]
  
};

export default AbsoluteRoutes