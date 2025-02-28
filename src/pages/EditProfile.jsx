import { useState, useEffect } from 'react';
import Input from '../components/common/Input';
import Button from '../components/common/Button';
import useAuthStore from '../zustand/authStore';
import { getUserByUUID, updateUser, uploadProfileImage } from '../api/supabaseUsersAPI';

const EditProfile = () => {
  const { user } = useAuthStore();
  const [nickname, setNickname] = useState('');
  const [profileImage, setProfileImage] = useState(null);
  const [newProfileImage, setNewProfileImage] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      if (!user) return;
      const { data, error } = await getUserByUUID(user.id);
      if (error) {
        alert('유저 정보를 불러오는 데 실패했습니다.');
        return;
      }
      setNickname(data.nickname);
      setProfileImage(data.profile_img_path);
    };

    fetchUserData();
  }, [user]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setNewProfileImage(file);
      setProfileImage(URL.createObjectURL(file));
    }
  };

  const handleSaveProfile = async () => {
    if (!user) return;

    let uploadedImagePath = profileImage;
    if (newProfileImage) {
      const { data } = await uploadProfileImage(newProfileImage);
      uploadedImagePath = `${import.meta.env.VITE_APP_SUPABASE_URL}/storage/v1/object/public/profile-img/${data.path}`;
    }

    const updatedUserData = {
      nickname,
      profile_img_path: uploadedImagePath,
    };

    const { error } = await updateUser(user.id, updatedUserData);
    if (error) {
      alert('프로필 수정 실패');
      return;
    }

    alert('프로필이 수정되었습니다!');
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
            className="w-24 h-24 rounded-full object-cover border"
          />
          <input type="file" className="hidden" onChange={handleImageChange} />
        </label>
      </div>

      {/* 닉네임 수정 */}
      <Input type="text" value={nickname} onChange={(e) => setNickname(e.target.value)} className="w-64 text-center" />

      {/* 저장 버튼 */}
      <Button onClick={handleSaveProfile} className="mt-4 bg-green-500 text-white">
        수정하기
      </Button>
    </div>
  );
};

export default EditProfile;
