import Avatar from './common/Avatar';
import Button from './common/Button';

const ReviewCard = ({ review, className }) => {
  //리뷰에 담겨있는 정보를 뽑아서 저장합니다
  const avatarSrc = review.users.profile_img_path;
  const username = review.users.nickname;
  const content = `${review.content}`;
  const footerText = `${review.places.place_name} :: ${review.places.place_address}`;

  //리뷰하나당 여러개의 사진이 있을 수 있으니 배열로 저장합니다.
  const imgArr = review.imgs;

  const onEditClick = () => {};

  const onDeleteClick = () => {};

  return (
    <div className={`bg-gray-200 rounded-md shadow-sm overflow-hidden ${className}`}>
      <div className="flex items-center justify-between p-3 bg-white">
        <div className="flex items-center">
          <Avatar src={avatarSrc} alt={username} size={30} />
          <span className="ml-2 font-bold">{username}</span>
        </div>
        <div className="flex gap-1">
          <Button onClick={onEditClick} className="px-2 py-0.5 bg-orange-400 rounded-md text-white text-sl">
            수정
          </Button>
          <Button onClick={onDeleteClick} className="px-2 py-0.5 bg-green-500 rounded-md text-white text-sl">
            삭제
          </Button>
        </div>
      </div>
      <div>
        {imgArr.map((path) => {
          console.log(path);
          return <img src={path.img_path} key={path.id + review.id} className="w-[50px] h-[50px]"></img>;
        })}
      </div>
      <div className="p-4">
        <p className="text-sm break-words">{content}</p>
      </div>

      {footerText && (
        <div className="flex justify-between items-center p-3 bg-white">
          <span className="text-red-500 text-sm">{footerText}</span>
        </div>
      )}
    </div>
  );
};

export default ReviewCard;
