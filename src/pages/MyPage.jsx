import { Outlet } from 'react-router-dom';
import NavLink from '../components/common/NavLink';
import useAuthStore from '../zustand/authStore';
import Avatar from '../components/common/Avatar';

const MyPage = () => {
  const { user } = useAuthStore();

  return (
    <div className="w-full max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">마이 페이지</h1>
      
      {/* 프로필 섹션 */}
      <div className="flex items-center space-x-4 mb-6">
        <Avatar src={user?.profile_img_path} size={60} className="w-16 h-16" />
        <div>
          <p className="text-lg font-semibold">{user?.nickname}</p>
          <p className="text-sm text-gray-500">마이페이지에 오신 것을 환영합니다.</p>
        </div>
      </div>
      
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