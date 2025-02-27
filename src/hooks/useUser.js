import { getUserById, getUserByNickName, registerUser } from '../api/supabaseUsersAPI';

const useUser = () => {
  const registerUserBySupabase = async (e) => {
    const email = e.target.email.value;
    const id = e.target.id.value;
    const password = e.target.password.value;
    const nickname = e.target.nickname.value;
    const profile_img = e.target.profile_img.files[0];

    if (!email || !id || !password || !nickname) {
      alert('모든 항목을 입력해주세요');
      return false;
    }

    if (profile_img && profile_img.type !== 'image/jpeg' && profile_img.type !== 'image/png') {
      alert('이미지 파일만 업로드 가능합니다');
      return false;
    }

    const userData = {
      email,
      id,
      password,
      nickname,
      profile_img,
    };

    const { error } = await registerUser(userData);

    if (error) {
      alert('회원가입에 실패했습니다 : ' + error.message);
      return false;
    }
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

  return { registerUserBySupabase, isUserIdExists, isUserNickNameExists };
};

export default useUser;
