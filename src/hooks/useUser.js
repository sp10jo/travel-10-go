import { getUserById, getUserByNickName, login, logout, registerUser } from '../api/supabaseUsersAPI';
import useAuthStore from '../zustand/authStore';

const useUser = () => {
  const setLogin = useAuthStore((state) => state.setLogin);
  const registerUserBySupabase = async (userData) => {
    const { insertData, signUpData, error } = await registerUser(userData);

    if (error) {
      alert('회원가입에 실패했습니다 : ' + error.message);
      return false;
    }
    setLogin(insertData, signUpData.session.access_token);
    alert('회원가입에 성공했습니다');
    return true;
  };

  const isUserIdExists = async (id) => {
    const { data, error } = await getUserById(id);

    if (error) {
      alert('중복확인에 실패했습니다 : ' + error.message);
      return false;
    }

    if (data !== null) {
      alert('이미 사용중인 아이디입니다');
      return false;
    }

    alert('사용 가능한 아이디입니다');
    return true;
  };

  const checkString = (str) => {
    if (str === null || str === undefined || str === '' || str.includes(' ')) {
      return false;
    }
    return true;
  };

  const checkStringLength = (str, min, max) => {
    if (str.length < min || str.length > max) {
      return false;
    }
    return true;
  };

  const isAlphaNumericOnly = (str) => {
    return /^[A-Za-z0-9]+$/.test(str);
  };

  const isUserNickNameExists = async (nickname) => {
    const { data, error } = await getUserByNickName(nickname);

    if (error) {
      alert('중복확인에 실패했습니다 : ' + error.message);
      return false;
    }

    if (data !== null) {
      alert('이미 사용중인 닉네임입니다');
      return false;
    }

    alert('사용 가능한 닉네임입니다');
    return true;
  };
  const loginUserBySupabase = async (e) => {
    const id = e.target.id.value;
    const password = e.target.password.value;

    if (!id || !password) {
      alert('모든 항목을 입력해주세요');
      return false;
    }

    const { error } = await login({ id, password });

    if (error) {
      alert('로그인에 실패했습니다 : ' + error.message);
      return false;
    }
    alert('로그인에 성공했습니다');
    return true;
  };

  const logoutUser = async () => {
    const { error } = await logout();

    if (error) {
      alert('로그아웃에 실패했습니다 : ' + error.message);
      return false;
    }
    useAuthStore.getState().setLogout();

    alert('로그아웃에 성공했습니다');
    return true;
  };

  return {
    registerUserBySupabase,
    isUserIdExists,
    logoutUser,
    isUserNickNameExists,
    loginUserBySupabase,
    checkStringLength,
    checkString,
    isAlphaNumericOnly,
  };
};

export default useUser;
