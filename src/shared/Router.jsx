import { BrowserRouter, Navigate, Outlet, Route, Routes } from 'react-router-dom';
import Home from '../pages/Home';
import Login from '../pages/Login';
import Signup from '../pages/Signup';
import MyPage from '../pages/MyPage';
import MyReview from '../pages/MyReview';
import EditProfile from '../pages/EditProfile';
import TripFinder from '../pages/TripFinder';
import ReviewEditor from '../pages/ReviewEditor';
import MainLayout from '../components/layout/MainLayout';
import useAuthStore from '../zustand/authStore';

const Router = () => {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route element={<MainLayout />}>
            <Route path="/" element={<Home />} />
            <Route element={<PrivateRoute />}>
              <Route path="/my-page" element={<MyPage />}>
                <Route path="my-review" element={<MyReview />} />
                <Route path="edit-profile" element={<EditProfile />} />
              </Route>
              <Route path="/trip-finder" element={<TripFinder />} />
              <Route path="/review-editor" element={<ReviewEditor />} />
            </Route>

            <Route element={<PublicRoute />}>
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default Router;

const PrivateRoute = () => {
  const isLogin = useAuthStore((s) => s.isLogin);

  return isLogin ? <Outlet /> : <Navigate to="/login" />;
};

const PublicRoute = () => {
  const isLogin = useAuthStore((s) => s.isLogin);

  return isLogin ? <Navigate to="/" /> : <Outlet />;
};
