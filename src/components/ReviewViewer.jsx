import { useEffect } from 'react';
import { useState } from 'react';
import { useReviewsByPlaceIdQuery } from '../hooks/tanstack/useReviewsQuery';
import ReviewCard from './ReviewCard';
import { NavLink } from 'react-router-dom';
import { getAverageReviewsRating } from '../utils/ratingUtils';
import useReviewStore from '../zustand/reviewStore';

const ReviewViewer = () => {
  //ReviewViewer가 열려있는 상태와 클릭된 마커의 장소정보(카카오API정보)를 불러옵니다
  const { setOpenReviewViewer, place } = useReviewStore();

  //리뷰뷰어의 크기를 변경하는 state 입니다
  const [viewerIsEnlargement, setViewerIsEnlargement] = useState(false);

  //확대됐을때의 추가되어 사용되는 뷰어클래스
  const viewerClass = viewerIsEnlargement ? 'w-[80%]' : 'w-[330px]';

  //훅으로 정의되어있는 텐스텍의 state와 data를 받아옵니다.
  const { data: reviews, error, isPending, isError } = useReviewsByPlaceIdQuery(place.placeId);

  //reviews를 최신 작성 순으로 정렬하기(나중에 정렬옵션 추가)
  reviews?.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));

  //리뷰뷰어 마운트시 리뷰뷰어만 스크롤되게 지정
  useEffect(() => {
    //ReviewViewer 컴포넌트가 호출되면 body에 스크롤막힘
    document.body.style.overflow = 'hidden';
    return () => {
      //언 마운트되면풀림
      document.body.style.overflow = 'auto';
    };
  });

  //viewer의 표시될 내용을 정하기
  let viewerTitle = '';
  const viewerTitleClass = 'text-2xl font-bold pl-3 pt-4';
  //데이터가 안불러와졌을 때 뜨는 뷰어제목
  if (isPending || isError) {
    viewerTitle = (
      <div className={viewerTitleClass}>{isPending ? '로딩중입니다.....' : `에러가발생했습니다 :: ${error}`}</div>
    );
  } else {
    //데이터가 불러와졌을 때 뜨는 뷰어제목
    viewerTitle = (
      <div className={viewerTitleClass}>
        {reviews.length > 0
          ? reviews[0].places.place_name + getAverageReviewsRating(reviews)
          : '리뷰가 없습니다 첫 리뷰를 작성해주세요'}
      </div>
    );
  }

  //viewer사이즈를 조절하는 핸들러
  const handleViewerSize = () => {
    //리뷰개수가 0개면 사이즈 못커지게
    if (reviews?.length === 0) {
      return;
    }
    setViewerIsEnlargement(!viewerIsEnlargement);
  };

  return (
    <>
      <section className="fixed z-50 w-[100%] h-[100%] top-[80px] flex">
        {/* 리뷰뷰어 바깥영역 클릭시 리뷰뷰어 닫힘 */}
        <div
          className="flex-1 h-[100%]"
          onClick={() => {
            setOpenReviewViewer(false);
          }}
        ></div>

        {/* 리뷰뷰어 */}
        <div className={`flex ${viewerClass} slide-left`}>
          {/* 리뷰뷰어 확대/축소버튼 */}
          <div className="h-[100%] flex flex-col justify-center cursor-pointer">
            <div
              className="w-[40px] h-[80px] bg-halfcircle_blue rounded-l-full -translate-y-[80px] flex flex-col justify-center items-end"
              onClick={handleViewerSize}
            >
              <p className="text-white text-[15px]">{viewerIsEnlargement ? 'Close' : 'Open'} </p>
              <p className="text-halfcircle_pink text-[15px]">Click</p>
            </div>
          </div>

          {/* 리뷰뷰어 메인영역*/}
          <section
            className={`bg-skyblue bg-opacity-50 overflow-y-auto h-[100%] pb-[150px] w-[100%]`}
            onClick={handleViewerSize}
          >
            {/* 리뷰뷰어 내용을 정하는 부분 */}
            {viewerTitle}
            <div className=" flex flex-wrap content-start">
              {
                //리뷰데이터 개수로 메시지 구분해서 띄우기
                reviews?.length > 0 ? (
                  //리뷰데이터(array)로 카드 찍어내기
                  reviews.map((review) => {
                    return <ReviewCard key={review.id} review={review} />;
                  })
                ) : (
                  //리뷰데이터가 0개면 안내 메시지 띄우기
                  <div className="w-[300px]"></div>
                )
              }
            </div>
          </section>
        </div>
        {/* 리뷰쓰러가기 버튼 */}
        <div className="fixed flex justify-end p-5 z-10 bottom-0 right-0">
          <NavLink to={`/review-editor`}>
            <div className="w-[80px] h-[80px] bg-red rounded-full flex justify-center items-center text-[10px] text-white">
              리뷰 쓰러 가기
            </div>
          </NavLink>
        </div>
      </section>
    </>
  );
};

export default ReviewViewer;
