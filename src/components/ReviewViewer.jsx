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

  useEffect(() => {
    //ReviewViewer 컴포넌트가 호출되면 body에 스크롤막힘
    document.body.style.overflow = 'hidden';
    return () => {
      //언 마운트되면풀림
      document.body.style.overflow = 'auto';
    };
  });

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
        <div
          className="flex-1 h-[100%] bg-black opacity-50"
          onClick={() => {
            setOpenReviewViewer(false);
          }}
        ></div>

        <div className="bg-red-400 overflow-y-auto h-[100%] w-[30px]" onClick={handleViewerSize}></div>
        <section
          //사이드바만 스크롤 되게 지정
          className={`bg-pink-200 overflow-y-auto h-[100%] ${viewerClass}`}
          onClick={handleViewerSize}
        >
          {isPending || isError ? (
            //로딩중이거나 에러발생시 해당 메시지 띄우기
            <div className="w-[300px]">{isPending ? '로딩중입니다.....' : `에러가발생했습니다 :: ${error}`}</div>
          ) : //리뷰데이터 개수로 메시지 구분해서 띄우기
          reviews?.length > 0 ? (
            //리뷰데이터(array)로 카드 찍어내기
            reviews.map((review) => {
              return <ReviewCard key={review.id} review={review} />;
            })
          ) : (
            //리뷰데이터가 0개면 안내 메시지 띄우기
            <div className="w-[300px]">리뷰가 없습니다 리뷰추가하기</div>
          )}
        </section>
      </section>
    </>
  );
};

export default ReviewViewer;
