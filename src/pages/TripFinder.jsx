import { useState, useEffect } from 'react';
import ReviewViewer from '../components/ReviewViewer';
import KakaoMap from '../components/maps/KakaoMap';
import useRegionStore from '../zustand/regionStore';
import Youtube from '../components/Youtube';
import useReviewStore from '../zustand/reviewStore';

const TripFinder = () => {
  const [markers, setMarkers] = useState([]);
  const [isKakaoLoaded, setIsKakaoLoaded] = useState(false);

  const selectedRegion = useRegionStore((state) => state.selectedRegion);
  const { selectedPlace, openReviewViewer } = useReviewStore();

  useEffect(() => {
    if (window.kakao) {
      setIsKakaoLoaded(true);
    } else {
      console.error('카카오맵 SDK가 로드되지 않았습니다.');
      // alert("일시적인 시스템 오류가 발생했습니다. 지속되는 경우 고객센터로 연락주세요. 메인페이지로 이동합니다.")
      // navigate("/")
    }
  }, []);

  useEffect(() => {
    if (!selectedRegion || !isKakaoLoaded) return;

    const ps = new window.kakao.maps.services.Places(); // PlaceSearch
    const keyword = `${selectedRegion} 관광지`;

    // keyword: 검색할 키워드, data: 검색 결과, status: 검색 상태
    ps.keywordSearch(keyword, (data, status) => {
      if (status === window.kakao.maps.services.Status.OK) {
        let markers = [];

        for (let i = 0; i < data.length; i++) {
          markers.push({
            position: { lat: data[i].y, lng: data[i].x },
            content: data[i].place_name,
            placeId: data[i].id,
            addressName: data[i].address_name,
          });
        }

        setMarkers(markers);
      }
    });
  }, [selectedRegion, isKakaoLoaded]);

  return (
    <div className="flex flex-col flex-1">
      {/* 상단 2/3 영역에 KakaoMap 배치 */}
      <div className="flex-[2] p-4">
        <KakaoMap region={selectedRegion} markers={markers} />
      </div>

      {/* 하단 1/3 영역에 Youtube 배치 */}
      <div className="flex-[1] mx-20">
        <Youtube />
      </div>

      {openReviewViewer && <ReviewViewer place={selectedPlace} />}
    </div>
  );
};

export default TripFinder;
