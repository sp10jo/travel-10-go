import { useNavigate } from 'react-router-dom';
import Button from '../components/common/Button';
import useUser from '../hooks/useUser';
import { useState } from 'react';

const Signup = () => {
  const { registerUserBySupabase, isUserIdExists, isUserNickNameExists } = useUser();
  const [isIdExists, setIsIdExists] = useState(false);
  const [isNickNameExists, setIsNickNameExists] = useState(false);
  const nv = useNavigate();

  const handleRegisterClick = async (e) => {
    e.preventDefault();

    if (!(isIdExists || isNickNameExists)) {
      alert('중복확인을 해주세요');
      return;
    }

    const isSucsess = await registerUserBySupabase(e);

    if (isSucsess) {
      // nv('/login');
    }
  };

  const handleIsIdExists = async (e) => {
    const id = e.target.previousElementSibling.value;

    setIsIdExists(await isUserIdExists(id));
  };

  const handleIsNickNameExists = async (e) => {
    const nickname = e.target.previousElementSibling.value;

    setIsNickNameExists(await isUserNickNameExists(nickname));
  };

  return (
    <div>
      <h1>Signup</h1>
      <form onSubmit={handleRegisterClick} onKeyDown={(e) => e.key === 'Enter' && e.preventDefault()}>
        <div>
          <label>email</label>
          <input type="text" name="email"></input>
        </div>
        <div>
          <label>id</label>
          <input type="text" name="id"></input>
          <Button onClick={handleIsIdExists}>중복확인</Button>
          {isIdExists && <span>사용 가능한 아이디입니다</span>}
        </div>
        <div>
          <label>password</label>
          <input type="password" name="password"></input>
        </div>
        <div>
          <label>nickname</label>
          <input type="text" name="nickname"></input>
          <Button onClick={handleIsNickNameExists}>중복확인</Button>
          {isNickNameExists && <span>사용 가능한 닉네임입니다</span>}
        </div>
        <input type="file" name="profile_img" />
        <Button type="submit">submit</Button>
      </form>
    </div>
  );
};

export default Signup;
