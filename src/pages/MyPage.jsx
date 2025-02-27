import React from 'react';
import { Outlet } from 'react-router-dom';
import NavLink from '../components/common/NavLink';

const MyPage = () => {
  return (
    <div className="w-full max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">마이 페이지</h1>
      {/* 탭 메뉴 */}
      <div className="flex space-x-4 border-b">
        <NavLink to="edit-profile" activeClass="border-b-2 border-red-500 font-bold">
          프로필 수정 페이지
        </NavLink>
        <NavLink to="my-review" activeClass="border-b-2 border-red-500 font-bold">
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
