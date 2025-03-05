import Button from '../common/Button';
import Avatar from '../common/Avatar';
import useAuthStore from '../../zustand/authStore';
import { Link } from 'react-router-dom';
import useUser from '../../hooks/useUser';

const Header = () => {
  //주스탄드 연결
  const isLogin = useAuthStore((state) => state.isLogin);
  const user = useAuthStore((state) => state.user);

  console.log(user);

  //로그아웃
  const { logoutUser } = useUser();

  const AVATAR_SIZE = 50;

  return (
    <header className="flex justify-between items-center p-4 bg-white shadow-md h-[100%]">
      <a href="/" className="text-2xl text-blue-500 font-arvo font-bold no-underline hover:no-underline">
        10Go
      </a>

      <div className="flex items-center space-x-4">
        {!isLogin ? (
          <>
            <a
              href="/login"
              className="px-4 py-2 bg-indigo-500 rounded-lg text-white hover:bg-indigo-600 transition duration-300"
            >
              Login
            </a>
            <a
              href="/signup"
              className="px-4 py-2 bg-emerald-500 rounded-lg text-white hover:bg-emerald-600 transition duration-300"
            >
              Sign Up
            </a>
          </>
        ) : (
          <>
            <Button onClick={() => logoutUser()} bgcolor="red" textcolor="white" size="2">
              Logout
            </Button>
            <Link to={'/my-page'}>
              {user?.profile_img_path && <Avatar src={user.profile_img_path} size={AVATAR_SIZE} />}
              {user?.profile_img_path === null && <Avatar src={null} size={AVATAR_SIZE} />}
            </Link>
          </>
        )}
      </div>
    </header>
  );
};

export default Header;
