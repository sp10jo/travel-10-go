import { useState } from 'react';
import Input from '../components/common/Input';
import Button from '../components/common/Button';
import useAuthStore from '../zustand/authStore';
import { getUserByUUID, updateUser, uploadProfileImage } from '../api/supabaseUsersAPI';
import { useQuery } from '@tanstack/react-query';

const EditProfile = () => {
  const { user } = useAuthStore();
  const [newProfileImage, setNewProfileImage] = useState(null);
  const [newNickname, setNewNickname] = useState('');
  const [previewImage, setPreviewImage] = useState(user?.profile_img_path || '/default-avatar.png'); // 미리보기 이미지

  const {
    data: userData,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['user', user?.id],
    queryFn: () => getUserByUUID(user.id),
    enabled: !!user?.id,
    onSuccess: (data) => {
      if (data) {
        setNewNickname(data.nickname || '');
        setPreviewImage(data.profile_img_path || '/default-avatar.png'); // 기존 이미지 설정
      }
    },
  });

  if (!user) {
    return <div>로딩 중...</div>;
  }
  if (isLoading) return <div>유저 정보를 불러오는 중...</div>;
  if (error) return <div>유저 정보를 가져오는 데 실패했습니다.</div>;

  // 이미지 선택 시 미리보기 설정
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setNewProfileImage(file);

      // FileReader를 사용하여 미리보기 업데이트
      const reader = new FileReader();
      reader.onload = (event) => {
        setPreviewImage(event.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSaveProfile = async () => {
    if (!user) return;

    let uploadedImagePath = userData?.profile_img_path || '/default-avatar.png';

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
      nickname: newNickname,
      profile_img_path: uploadedImagePath,
    };

    const { error } = await updateUser(user.id, updatedUserData);
    if (error) {
      alert('프로필 수정 실패');
      return;
    }

    // zustand 상태 업데이트
    useAuthStore.getState().setLogin({ ...user, profile_img_path: uploadedImagePath, nickname: newNickname });
    alert('프로필이 수정되었습니다!');
  };

  return (
    <div className="flex flex-col items-center p-6">
      <h2 className="text-xl font-bold mb-4">프로필 수정</h2>

      {/* 프로필 이미지 업로드 */}
      <div className="mb-4">
        <label className="cursor-pointer">
          <img
            src={previewImage} // 미리보기 이미지 반영
            alt="프로필 이미지"
            className="w-24 h-24 rounded-full object-cover border"
          />
          <input type="file" className="hidden" onChange={handleImageChange} />
        </label>
      </div>
      <span className="text-sm text-gray-500">이미지를 클릭하여 변경</span>

      {/* 닉네임 수정 가능하도록 변경 */}
      <Input
        type="text"
        placeholder="변경할 닉네임을 입력해주세요."
        value={newNickname}
        onChange={(e) => setNewNickname(e.target.value)}
        className="w-64 text-center text-xs"
      />

      {/* 저장 버튼 */}
      <Button onClick={handleSaveProfile} className="mt-4 bg-green-500 text-white">
        수정하기
      </Button>
    </div>
  );
};

export default EditProfile;
