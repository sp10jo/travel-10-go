import Button from '../components/common/Button';
import useUser from '../hooks/useUser';
import { useNavigate } from 'react-router-dom';
import useAuthStore from '../zustand/authStore';
import { useEffect } from 'react';

const Login = () => {
  const { loginUserBySupabase, logoutUser } = useUser();
  const navigate = useNavigate();
  const isLogin = useAuthStore((s) => s.isLogin);

  useEffect(() => {
    if (isLogin) {
      navigate('/');
    }
  }, [navigate, isLogin]);

  const handleLoginClick = async (e) => {
    e.preventDefault();
    const res = await loginUserBySupabase(e);
    if (res) {
      navigate('/');
    }
  };

  const handleLogOutClick = async () => {
    const res = await logoutUser();
    if (res) {
      navigate('/');
    }
  };
  return (
    <div>
      <h1>login</h1>
      <form onSubmit={handleLoginClick}>
        <div>
          <label>id</label>
          <input type="text" name="id"></input>
        </div>
        <div>
          <label>password</label>
          <input type="password" name="password"></input>
        </div>
        <Button type="submit">login</Button>
        <Button type="button" onClick={handleLogOutClick}>
          logout
        </Button>
      </form>
    </div>
  );
};

export default Login;
