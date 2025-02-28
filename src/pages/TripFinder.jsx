import { useState } from 'react';
import ReviewViewer from '../components/ReviewViewer';
import KakaoMap from '../components/maps/KakaoMap';

const TripFinder = () => {
  const [openReviewViewer, setOpenReviewViewer] = useState(false);
  const [placeId, setPlaceId] = useState('');

  return (
    <div className="flex flex-col flex-1">
      {/* 상단 2/3 영역에 KakaoMap 배치 */}
      <div className="flex-[2] p-4">
        <KakaoMap />
      </div>

      {/* 하단 1/3 영역에 Youtube 배치 */}
      <div className="flex-[1]"></div>

      {openReviewViewer && <ReviewViewer placeId={placeId} setOpenReviewViewer={setOpenReviewViewer} />}
    </div>
  );
};

export default TripFinder;
