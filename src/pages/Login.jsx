import Button from '../components/common/Button';
import useUser from '../hooks/useUser';
import { NavLink, useNavigate } from 'react-router-dom';
import useAuthStore from '../zustand/authStore';
import { useEffect } from 'react';
import Spacer from '../components/common/Spacer';
import UserConatiner from '../components/user/UserConatiner';
import UserLabel from '../components/user/UserLabel';
import UserInput from '../components/user/UserInput';
import { useState } from 'react';

const Login = () => {
  const { loginUserBySupabase } = useUser();
  const navigate = useNavigate();
  const isLogin = useAuthStore((s) => s.isLogin);
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');

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

  const handleOnChangeId = (e) => {
    const id = e.target.value;
    setId(id);
  };

  const handleOnChangePassword = (e) => {
    const password = e.target.value;
    setPassword(password);
  };

  const marginSize = 40;
  const marginSizeSmall = 20;
  return (
    <div className="flex flex-col items-center p-4">
      <div className="flex flex-col items-center p-20 mt-10 border border-fuchsia-400 rounded-lg">
        <img src="/10go.png" alt="logo" style={{ width: '150px' }} />
        <h2>로그인</h2>
        <Spacer size={marginSize} />
        <form onSubmit={handleLoginClick}>
          <UserConatiner>
            <UserLabel>ID</UserLabel>
            <UserInput type="text" name="id" value={id} onChange={handleOnChangeId}></UserInput>
          </UserConatiner>
          <UserConatiner>
            <UserLabel>PASSWORD</UserLabel>
            <UserInput type="password" name="password" value={password} onChange={handleOnChangePassword}></UserInput>
          </UserConatiner>

          <Button type="submit" bgcolor="skyblue" textcolor="white" size="2">
            login
          </Button>

          <Spacer size={marginSizeSmall} />
          <div>
            계정이 없으신가요?
            <NavLink to="/signup" style={{ color: 'red' }}>
              회원가입
            </NavLink>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
