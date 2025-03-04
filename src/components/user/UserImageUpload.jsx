import Avatar from '../common/Avatar';

const UserImageUpload = ({ handleImageChange, previewImage = false }) => {
  return (
    <>
      <div className="mb-4">
        <label className="cursor-pointer">
          <Avatar size={96} src={previewImage} alt="기본 프로필" />

          <input type="file" className="hidden" onChange={handleImageChange} />
        </label>
      </div>
      <span className="text-sm text-gray-500">이미지를 클릭하여 변경</span>
    </>
  );
};

export default UserImageUpload;
