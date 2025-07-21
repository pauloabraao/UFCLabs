import { createBrowserRouter } from 'react-router-dom';
import HomePage from './pages/HomePage';
import ReportPage from './pages/ReportPage';
import LabsPage from './pages/LabsPage';

const router = createBrowserRouter([
  {
    path: '/',
    element: <HomePage />,
  },
  {
    path: '/report',
    element: <ReportPage/>,
  },
  {
    path: '/labs',
    element: <LabsPage />,
  }
]);

export default router;
