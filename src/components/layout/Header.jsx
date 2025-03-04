import Button from '../common/Button';
import Avatar from '../common/Avatar';
import useAuthStore from '../../zustand/authStore';
<<<<<<< HEAD
import { Link } from 'react-router-dom';

const Header = () => {
  // ===== Test Data (추후 zustand 상태와 연결) =====
  const isLogin = useAuthStore((state) => state.isLogin);
  const user = useAuthStore((state) => state.user);

=======

const Header = () => {
  // ===== Test Data (추후 zustand 상태와 연결) =====
  // const isLogin = false;
  // const user = {
  //   name: 'test',
  //   profileImage:
  //     'https://img.freepik.com/premium-vector/avatar-profile-icon-flat-style-female-user-profile-vector-illustration-isolated-background-women-profile-sign-business-concept_157943-38866.jpg?w=740',
  // };
>>>>>>> dev
  // =============================================
  const { isLogin, user, setLogout } = useAuthStore();
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
            <Button
<<<<<<< HEAD
              onClick={() => {
                useAuthStore.getState().setLogout();
                localStorage.clear();
              }}
=======
              onClick={setLogout}
>>>>>>> dev
              className="px-4 py-2 text-white bg-rose-500 rounded-lg hover:bg-rose-600 transition duration-300"
            >
              Logout
            </Button>
<<<<<<< HEAD
            <Link to={'/my-page'}>
              <Avatar src={user.profile_img_path} size={AVATAR_SIZE} />
            </Link>
=======
            {user && <Avatar src={user.profileImage} size={AVATAR_SIZE} />}
>>>>>>> dev
          </>
        )}
      </div>
    </header>
  );
};

export default Header;
