import { dAppName } from 'config';
import Swap from 'pages/Swap';
import withPageTitle from './components/PageTitle';

export const routeNames = {
  swap: '/',
  unlock: '/unlock',
  ledger: '/ledger',
  walletconnect: '/walletconnect'
};

const routes: Array<any> = [
  {
    path: routeNames.swap,
    title: 'Swap',
    component: Swap,
    authenticatedRoute: true
  }
];

const mappedRoutes = routes.map((route) => {
  const title = route.title ? `${route.title} • ${dAppName}` : `${dAppName}`;

  const requiresAuth = Boolean(route.authenticatedRoute);
  const wrappedComponent = withPageTitle(title, route.component);

  return {
    path: route.path,
    component: wrappedComponent,
    authenticatedRoute: requiresAuth
  };
});

export default mappedRoutes;
