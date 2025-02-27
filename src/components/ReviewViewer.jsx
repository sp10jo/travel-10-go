import { useEffect } from 'react';
import { useState } from 'react';
import ReviewCard from './ReviewCard';

const ReviewViewer = ({ placeId, setOpenReviewViewer }) => {
  const [viewerSize, setViewerSize] = useState(30);
  //placeId
  useEffect(() => {
    //ReviewViewer 컴포넌트가 호출되면 body에 스크롤막힘
    document.body.style.overflow = 'hidden';
    return () => {
      //언 마운트되면풀림
      document.body.style.overflow = 'auto';
    };
  });

  //카드 표시 확인을 위한 배열입니다[0,1,2....19]
  const testPrintArray = [...Array(20)].map((_, i) => i + 1);

  return (
    <>
      <section className="fixed z-50 w-[100%] h-[100%] top-[60px] flex ">
        <div
          onClick={() => {
            setOpenReviewViewer(false);
          }}
          className="flex-1 h-[100%] bg-black opacity-50"
        ></div>
        <aside
          style={{ width: `${viewerSize}%`, height: '100%' }}
          //사이드바만 스크롤 되게 지정
          className="bg-pink-200 overflow-y-auto"
          onClick={() => {
            const size = viewerSize === 30 ? 80 : 30;
            setViewerSize(size);
          }}
        >
          {testPrintArray.map((e) => {
            console.log(e);
            // const { username, avatarSrc, content, footerText, onEditClick, onDeleteClick}
            return (
              <div key={e}>
                <ReviewCard
                  username={'테스트'}
                  avatarSrc={'null'}
                  footerText={'주소:: 상세주소'}
                  onEditClick={() => {}}
                  onDeleteClick={() => {}}
                />
              </div>
            );
          })}
        </aside>
      </section>
    </>
  );
};

export default ReviewViewer;
