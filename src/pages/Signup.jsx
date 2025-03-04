import { NavLink, useNavigate } from 'react-router-dom';
import Button from '../components/common/Button';
import useUser from '../hooks/useUser';
import { useState } from 'react';
import UserInput from '../components/user/UserInput';
import UserLabel from '../components/user/UserLabel';
import UserConatiner from '../components/user/UserConatiner';
import UserError from '../components/user/UserError';
import UserImageUpload from '../components/user/UserImageUpload';
import Spacer from '../components/common/Spacer';

const Signup = () => {
  const {
    registerUserBySupabase,
    isUserIdExists,
    isUserNickNameExists,
    checkStringLength,
    checkString,
    isAlphaNumericOnly,
  } = useUser();
  const [isIdExists, setIsIdExists] = useState(false);
  const [isNickNameExists, setIsNickNameExists] = useState(false);
  const [email, setEmail] = useState('');
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');
  const [nickName, setNickName] = useState('');
  const [img, setImg] = useState('');
  const [previewImage, setPreviewImage] = useState(null);
  const [isEmail, setIsEmail] = useState(false);
  const [isId, setIsId] = useState(false);
  const [isPassword, setIsPassword] = useState(false);
  const [isNickName, setIsNickName] = useState(false);

  const navigate = useNavigate();
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const handleRegisterClick = async (e) => {
    e.preventDefault();

    if (!isEmail || !isId || !isPassword || !isNickName) {
      alert('입력값을 확인해주세요');
      return;
    }
    if (!isIdExists || !isNickNameExists) {
      alert('중복확인을 해주세요');
      return;
    }

    const isSucsess = await registerUserBySupabase(e);

    if (isSucsess) {
      navigate('/login');
    }
  };

  const handleIsIdExists = async (e) => {
    const id = e.target.previousElementSibling.value;
    if (!isId) {
      return;
    }

    setIsIdExists(await isUserIdExists(id));
  };

  const handleIsNickNameExists = async (e) => {
    const nickname = e.target.previousElementSibling.value;
    if (!isNickName) {
      return;
    }

    setIsNickNameExists(await isUserNickNameExists(nickname));
  };
  const handleOnChangeEmail = (e) => {
    const value = e.target.value;
    setEmail(value);
    if (emailRegex.test(value)) {
      setIsEmail(true);
    }
  };

  const handleOnChangeId = (e) => {
    const value = e.target.value;
    setId(value);
    if (checkStringLength(value, 4, 20) && isAlphaNumericOnly(value) && checkString(value)) {
      setIsId(true);
    }
  };

  const handleOnChangePassword = (e) => {
    const value = e.target.value;
    setPassword(value);
    if (checkStringLength(value, 8, 20) && checkString(value)) {
      setIsPassword(true);
    }
  };
  const handleOnChangeNickName = (e) => {
    const value = e.target.value;
    setNickName(value);
    if (checkStringLength(value, 2, 20) && checkString(value)) {
      setIsNickName(true);
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImg(file);

      // FileReader를 사용하여 미리보기 업데이트
      const reader = new FileReader();
      reader.onload = (event) => {
        setPreviewImage(event.target.result);
      };
      reader.readAsDataURL(file);
    }
  };
  const marginSize = 40;

  return (
    <div className="flex flex-col items-center p-4">
      <div className="flex flex-col items-center p-20 mt-10 border border-fuchsia-400 rounded-lg">
        <h1>회원가입</h1>
        <Spacer size={marginSize} />
        <form onSubmit={handleRegisterClick} onKeyDown={(e) => e.key === 'Enter' && e.preventDefault()}>
          <div className="flex flex-col justify-center items-center">
            <UserImageUpload
              handleImageChange={handleImageChange}
              previewImage={previewImage}
              value={img}
              type="file"
              name="profile_img"
            />
          </div>
          <UserConatiner className="flex flex-col">
            <UserLabel>EMAIL</UserLabel>
            <UserInput
              onChange={handleOnChangeEmail}
              value={email}
              type="text"
              name="email"
              placeholder="이메일을 입력해주십시오."
            ></UserInput>
            <UserError>{isEmail ? '올바른 이메일 형식입니다.' : '올바르지 않은 이메일 형식입니다.'}</UserError>
          </UserConatiner>
          <UserConatiner>
            <UserLabel>ID</UserLabel>
            <div>
              <UserInput
                onChange={handleOnChangeId}
                value={id}
                type="text"
                name="id"
                placeholder="아이디를 입력해주십시오."
              ></UserInput>
              <Button size={1} onClick={handleIsIdExists} textcolor="black" bgcolor="white">
                {isIdExists ? '확인완료' : '중복확인'}
              </Button>
            </div>
            <UserError>
              {isId ? '사용가능한 아이디입니다.' : '아이디는 4~20자의 영문 대소문자와 숫자만 사용 가능합니다.'}
            </UserError>
          </UserConatiner>
          <UserConatiner>
            <UserLabel>PASSWORD</UserLabel>
            <UserInput
              onChange={handleOnChangePassword}
              value={password}
              type="password"
              name="password"
              placeholder="비밀번호를 입력해주십시오."
            ></UserInput>
            <UserError>
              {isPassword ? '사용가능한 비밀번호입니다.' : '비밀번호는 8~20자의 문자열만 사용 가능합니다.'}
            </UserError>
          </UserConatiner>
          <UserConatiner>
            <UserLabel>닉네임</UserLabel>
            <div>
              <UserInput
                onChange={handleOnChangeNickName}
                value={nickName}
                type="text"
                name="nickname"
                placeholder="닉네임을 입력해주십시오."
              ></UserInput>
              <Button size={1} onClick={handleIsNickNameExists}>
                {isNickNameExists ? '확인완료' : '중복확인'}
              </Button>
            </div>
            <UserError>
              {isNickName ? '사용가능한 닉네임입니다.' : '닉네임은 2~20자의 문자열만 사용가능합니다.'}
            </UserError>
          </UserConatiner>
          <div>
            <Button size={1} type="submit">
              회원가입
            </Button>
            <div>
              이미 계정이 있으신가요?{' '}
              <NavLink to={'/login'} style={{ color: 'red' }}>
                로그인
              </NavLink>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signup;
