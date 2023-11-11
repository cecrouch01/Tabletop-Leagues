import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import App from './App.jsx';
import Error from "./pages/Error/Error.jsx";
import Home from "./pages/Home/Home.jsx";
import Dashboard from "./pages/Dashboard/Dashboard.jsx";
import CreateLeague from './pages/CreateLeague/CreateLeague.jsx';
import JoinLeagues from './pages/JoinLeagues/JoinLeagues.jsx';
import SingleLeague from './pages/SingleLeague/SingleLeague.jsx';
import Login from './pages/Login/Login.jsx';
import SignUp from './pages/SignUp/SignUp.jsx';
import './index.css'

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <Error />,
    children: [
      {
        index: true,
        element: <Home />
      },
      {
        path: '/dashboard',
        element: <Dashboard />
      },
      {
        path: '/league/create',
        element: <CreateLeague />
      },
      {
        path: '/league/join',
        element: <JoinLeagues />
      },
      {
        path: '/league/:leagueName',
        element: <SingleLeague />
      },
      {
        path: '/login',
        element: <Login />
      },
      {
        path: '/signUp',
        element: <SignUp />
      },
      {
        path: '/error',
        element: <Error />
      }
    ]
  }
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <RouterProvider router={router} />
);
