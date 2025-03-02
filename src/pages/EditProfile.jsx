import { useState } from 'react';
import Input from '../components/common/Input';
import Button from '../components/common/Button';
import useAuthStore from '../zustand/authStore';
import { getUserByUUID, updateUser, uploadProfileImage } from '../api/supabaseUsersAPI';
import { useQuery } from '@tanstack/react-query';

const EditProfile = () => {
  const { user } = useAuthStore();
  const [newProfileImage, setNewProfileImage] = useState(null);

  const {
    data: userData,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['user', user?.id],
    queryFn: () => getUserByUUID(user.id),
    enabled: !!user?.id,
  });

  if (!user) {
    return <div>로딩 중...</div>;
  }
  if (isLoading) return <div>유저 정보를 불러오는 중...</div>;
  if (error) return <div>유저 정보를 가져오는 데 실패했습니다.</div>;

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setNewProfileImage(file);
    }
  };

  const handleSaveProfile = async () => {
    if (!user) return;

    let uploadedImagePath = userData.profile_img_path || 'default-avatar.png';

    if (newProfileImage) {
      try {
        const { data } = await uploadProfileImage(newProfileImage);
        uploadedImagePath = `${import.meta.env.VITE_APP_SUPABASE_URL}/storage/v1/object/public/profile-img/${
          data.path
        }`;
      } catch (error) {
        alert('프로필 이미지 업로드 실패');
        return;
      }
    }

    const updatedUserData = {
      nickname: user.nickname,
      profile_img_path: uploadedImagePath,
    };

    const { error } = await updateUser(user.id, updatedUserData);
    if (error) {
      alert('프로필 수정 실패');
      return;
    }
    // zustand 상태 업데이트
    useAuthStore.getState().setLogin({ ...user, profile_img_path: uploadedImagePath });
    alert('프로필이 수정되었습니다!');
  };

  return (
    <div className="flex flex-col items-center p-6">
      <h2 className="text-xl font-bold mb-4">프로필 수정</h2>

      {/* 프로필 이미지 업로드 */}
      <div className="mb-4">
        <label className="cursor-pointer">
          <img
            src={user.profile_img_path || '/default-avatar.png'}
            alt="프로필 이미지"
            className="w-24 h-24 rounded-full object-cover border"
          />
          <input type="file" className="hidden" onChange={handleImageChange} />
        </label>
      </div>

      {/* 닉네임 수정 */}
      <Input type="text" value={user.nickname || ''} readOnly className="w-64 text-center" />

      {/* 저장 버튼 */}
      <Button onClick={handleSaveProfile} className="mt-4 bg-green-500 text-white">
        수정하기
      </Button>
    </div>
  );
};

export default EditProfile;
