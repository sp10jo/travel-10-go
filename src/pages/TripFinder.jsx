import { useState } from 'react';
import ReviewViewer from '../components/ReviewViewer';
import KakaoMap from '../components/maps/KakaoMap';
import Youtube from '../components/Youtube';
import useReviewStore from '../zustand/reviewStore';

const TripFinder = () => {
  const { openReviewViewer } = useReviewStore();

  return (
    <div className="flex flex-col flex-1">
      {/* 지도 영역 */}
      <div className="flex-[2] p-4">
        <KakaoMap />
      </div>

      {/* YouTube 영상 영역 */}
      <div className="flex-[1] mx-20">
        <Youtube />
      </div>

      {openReviewViewer && <ReviewViewer />}
    </div>
  );
};

export default TripFinder;
