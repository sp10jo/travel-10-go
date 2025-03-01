import { useEffect } from 'react';
import { useState } from 'react';
import { useReviewsByPlaceIdQuery } from '../hooks/tanstack/useReviewsQuery';
import ReviewCard from './ReviewCard';

const ReviewViewer = ({ placeId, setOpenReviewViewer }) => {
  //드로어의 크기를 변경하는 state 입니다
  const [viewerIsEnlargement, setViewerIsEnlargement] = useState(false);

  //확대됐을때의 추가되어 사용되는 뷰어클래스
  const viewerClass = viewerIsEnlargement && 'w-[80%] flex flex-wrap content-start';

  //훅으로 정의되어있는 텐스텍의 state와 data를 받아옵니다.
  //data : 쿼리로요청한 리뷰데이터들이 담겨있습니다.
  //error : isError가 true일때 어떤 에러가 났는지 담겨있습니다.
  //isPending, isError 로딩중이거나, 에러중인 상태(boolean 값)을 담고있습니다.
  const { data: reviews, error, isPending, isError } = useReviewsByPlaceIdQuery(placeId);

  //placeId
  useEffect(() => {
    //ReviewViewer 컴포넌트가 호출되면 body에 스크롤막힘
    document.body.style.overflow = 'hidden';
    return () => {
      //언 마운트되면풀림
      document.body.style.overflow = 'auto';
    };
  });

  if (isPending) {
    return <div>로딩중입니다.</div>;
  }

  if (isError) {
    return <div>에러가발생했습니다 :: {error}</div>;
  }

  //reviews : 카드를 표시할때 사용할 리뷰데이터들 입니다.
  console.log(reviews);

  return (
    <>
      <section className="fixed z-50 w-[100%] h-[100%] top-[60px] flex">
        <div
          onClick={() => {
            setOpenReviewViewer(false);
          }}
          className="flex-1 h-[100%] bg-black opacity-50"
        ></div>
        <section
          //사이드바만 스크롤 되게 지정
          className={`bg-pink-200 overflow-y-auto h-[100%] ${viewerClass}`}
          onClick={() => {
            setViewerIsEnlargement(!viewerIsEnlargement);
          }}
        >
          {/* 리뷰 카드가 들어올 부분입니다. */}
          {reviews.map((review) => {
            return <ReviewCard key={review.id} review={review} />;
          })}
        </section>
      </section>
    </>
  );
};

export default ReviewViewer;
