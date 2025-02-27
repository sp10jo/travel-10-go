import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from '../pages/Home';
import Login from '../pages/Login';
import Signup from '../pages/Signup';
import MyPage from '../pages/MyPage';
import MyReview from '../pages/MyReview';
import EditProfile from '../pages/EditProfile';
import TripFinder from '../pages/TripFinder';
import ReviewEditor from '../pages/ReviewEditor';

const Router = () => {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/login' element={<Login />} />
          <Route path='/signup' element={<Signup />} />
          <Route path='/my-page' element={<MyPage />}>
            <Route path='my-review' element={<MyReview />} />
            <Route path='edit-profile' element={<EditProfile />} />
          </Route>
          <Route path='/trip-finder' element={<TripFinder />} />
          <Route path='/review-editor' element={<ReviewEditor />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default Router;
