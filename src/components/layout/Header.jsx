import Button from '../common/Button';
import Avatar from '../common/Avatar';

const Header = () => {
  const isLogin = true;

  return (
    <header className="flex justify-between items-center p-4 bg-white shadow-md">
      <a href="/" className="text-2xl text-blue-500 font-arvo no-underline hover:no-underline">
        10Go
      </a>

      <div className="flex items-center space-x-4">
        {!isLogin ? (
          <>
            <a href="/login" className="px-4 py-2 bg-blue-500 rounded text-white hover:bg-blue-600">
              Login
            </a>
            <a href="/signup" className="px-4 py-2 bg-gray-500 rounded text-white hover:bg-gray-600">
              Sign Up
            </a>
          </>
        ) : (
          <>
            <Button className="px-4 py-2 text-white bg-red-500 rounded hover:bg-red-600">Logout</Button>
            <Avatar />
          </>
        )}
      </div>
    </header>
  );
};

export default Header;
