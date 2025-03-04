import { useNavigate } from 'react-router-dom';
import { useDeleteReview } from '../hooks/tanstack/useReviewsMutate';
import Avatar from './common/Avatar';
import Button from './common/Button';
import useAuthStore from '../zustand/authStore';
import { makeRationStar } from '../utils/ratingUtils';

const ReviewCard = ({ review }) => {
  const navigate = useNavigate();
  const { id: CurrentUserId } = useAuthStore((store) => store.user);

  //리뷰삭제를 위한 mutate 함수를 불러옴
  const deleteMutate = useDeleteReview(review.place_id, CurrentUserId);

  //리뷰에 담겨있는 정보를 뽑아서 저장
  const avatarSrc = review.users.profile_img_path;
  const username = review.users.nickname;
  const content = `${review.content}`;
  const footerText = review.places
    ? `📍${review.places.place_name} _ ${review.places.place_address}`
    : '장소 정보 없음';
  //이미지데이터는 배열에 담겨서 넘어옴
  const imgArr = review.imgs;

  //이미지 개수에 따라 클래스내용을 변경(하나일때는 이미지영역 가운데정렬)
  const imgClass = imgArr.length === 1 && 'justify-center';

  //자신이 쓴리뷰일때만 버튼을 표시(테스트를위해 항상 true가 되게만들어둠)
  const isMyReview = review.users.id === CurrentUserId;

  //수정버튼을 눌렀을때 실행 되는 핸들러
  const onEditClick = () => {
    //수정버튼 클릭시 리뷰작성페이지로 리뷰 아이디 넘김
    navigate(`/review-editor?reviewId=${review.id}`);
  };

  //삭제버튼을 눌렀을때 실행 되는 핸들러
  const onDeleteClick = async () => {
    await deleteMutate.mutate(review.id);
  };
  //bgcolor,textcolor,size
  return (
    <div
      onClick={(e) => {
        //카드안에서 발생하는 이벤트가 전달되지 않게하기위해 버블링 막기
        e.stopPropagation();
      }}
      className={`bg-white rounded-md shadow-sm overflow-hidden m-4 w-[300px] h-[400px] flex flex-col`}
    >
      <div className="flex items-center justify-between p-3 bg-white">
        <div className="flex items-center">
          <Avatar src={avatarSrc} alt={username} size={30} />
          <span className="ml-2 font-bold">{username}</span>
        </div>
        {isMyReview && (
          <div className="flex gap-1">
            <Button
              onClick={onEditClick}
              bgcolor="yellow"
              textcolor="white"
              size="2"
              className="px-2 py-0.5 bg-orange-400 rounded-md text-white text-sl"
            >
              수정
            </Button>
            <Button
              onClick={onDeleteClick}
              bgcolor="red"
              textcolor="white"
              size="2"
              className="px-2 py-0.5 bg-green-500 rounded-md text-white text-sl"
            >
              삭제
            </Button>
          </div>
        )}
      </div>
      <div className={`overflow-x-auto flex ${imgClass} gap-2`}>
        {imgArr.map((img) => {
          return (
            <img
              src={img.img_path}
              key={img.id + review.id}
              className="w-[200px] h-[200px] object-cover object-center"
            ></img>
          );
        })}
      </div>
      <div className="p-4 flex-1">
        <p className="text-sm break-words">{content}</p>
      </div>
      <div className="pl-4 text-lg">{makeRationStar(review.star)}</div>
      {footerText && (
        <div className="flex justify-between items-center p-4 bg-reviewcard_pink rounded-md">
          <span className="text-red-500 text-sm">{footerText}</span>
        </div>
      )}
    </div>
  );
};

export default ReviewCard;
