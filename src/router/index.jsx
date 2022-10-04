import { Navigate, useRoutes } from 'react-router-dom';

import { NotFound, ApiList, EditApi, DeleteApi, Other } from '../components';
import MainLayout from '../layout/MainLayout';


export default function Router () {
  return useRoutes([
    {
      path: '/',
      element: <Navigate to="/apis/list" replace />,
    },
    {
      path: '/apis',
      element: <MainLayout />,
      children: [
        { element: <Navigate to="/apis/list" replace />, index: true },
        { path: 'list', element: <ApiList /> },
        { path: 'other', element: <Other /> },
        { path: ':id', element: <EditApi /> },
        { path: ':id/delete', element: <DeleteApi /> },
      ],
    },
    {
      path: '*',
      element: <MainLayout />,
      children: [
        { path: '404', element: <NotFound /> },
        { path: '*', element: <Navigate to="/404" replace /> },
      ],
    },
    { path: '*', element: <Navigate to="/404" replace /> },
  ]);
}