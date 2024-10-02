import { lazy } from 'react';

// project import
import Loadable from 'components/Loadable';
import MinimalLayout from 'layout/MinimalLayout';
import PageWrapper from 'layout/Wrapper';

// render - absolute pages
const Home = Loadable(lazy(() => import('pages/home/index')));

// ==============================|| AUTH ROUTING ||============================== //

const AbsoluteRoutes = {
  path: '/',
  children: [
    {
      path: '/',
      element: <PageWrapper children={<Home />} />
    },
  ]
};

export default AbsoluteRoutes