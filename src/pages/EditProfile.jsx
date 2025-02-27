import React from 'react';
import { useState } from 'react';
import Input from '../components/common/Input';
import Button from '../components/common/Button';

const EditProfile = () => {
  const [nickname, setNickname] = useState('닉네임');
  const [profileImage, setProfileImage] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfileImage(URL.createObjectURL(file));
    }
  };

  const handleSave = () => {
    alert('프로필이 저장되었습니다!');
  };

  return (
    <div className="flex flex-col items-center p-6">
      <h2 className="text-xl font-bold mb-4">프로필 수정</h2>

      {/* 프로필 이미지 업로드 */}
      <div className="mb-4">
        <label className="cursor-pointer">
          <img
            src={profileImage || '/default-avatar.png'}
            alt="프로필 이미지"
            className="w-24 h24 rounded-full object-cover border"
          />
          <input type="file" className="hidden" onChange={handleImageChange} />
        </label>
      </div>

      {/* 닉네임 수정 */}
      <Input
        type="text"
        value={nickname}
        onChange={(e) => {
          setNickname(e.target.value);
        }}
        className="w-64 text-center"
      />

      {/* 저장 버튼 */}
      <Button onClick={handleSave} className="mt-4 bg-green-500 text-white">
        수정하기
      </Button>
    </div>
  );
};

export default EditProfile;
