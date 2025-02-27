import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';

const MyPage = () => {
  return (
    <div className="w-full max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">마이 페이지</h1>
      {/* 탭 메뉴 */}
      <div>
        <NavLink
          to="edit-profile"
          className={({ isActive }) =>
            `px-4 py-2 ${isActive ? 'border-b-2 border-red-500 font-bold' : 'text-gray-500'}`
          }
        >
          프로필 수정 페이지
        </NavLink>
        <NavLink
          to="my-review"
          className={({ isActive }) =>
            `px-4 py-2 ${isActive ? 'border-b-2 border-red-500 font-bold' : 'text-gray-500'}`
          }
        >
          마이리뷰
        </NavLink>
      </div>

      {/* 하위 페이지 렌더링 */}
      <div className="mt-4">
        <Outlet />
      </div>
    </div>
  );
};

export default MyPage;
