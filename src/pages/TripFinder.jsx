import { useState, useEffect } from 'react';
import ReviewViewer from '../components/ReviewViewer';
import KakaoMap from '../components/maps/KakaoMap';
import useRegionStore from '../zustand/regionStore';
import Youtube from '../components/Youtube';

const TripFinder = () => {
  const [openReviewViewer, setOpenReviewViewer] = useState(false); // 태진님과 작업 예정
  const [placeId, setPlaceId] = useState(''); // 태진님과 작업 예정
  const [markers, setMarkers] = useState([]);
  const [isKakaoLoaded, setIsKakaoLoaded] = useState(false);

  const selectedRegion = useRegionStore((state) => state.selectedRegion);

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
        const bounds = new window.kakao.maps.LatLngBounds();
        let markers = [];

        console.log(data);

        for (let i = 0; i < data.length; i++) {
          markers.push({
            position: { lat: data[i].y, lng: data[i].x },
            content: data[i].place_name,
          });
          // 표시 범위 자동 계산
          bounds.extend(new window.kakao.maps.LatLng(data[i].y, data[i].x));
        }

        setMarkers(markers);

        // 지도 범위 재설정 로직
        if (window.kakao.maps) {
          const mapContainer = document.getElementById('map');
          const mapOption = {
            center: new window.kakao.maps.LatLng(33.450701, 126.570667), // home에서 선택된 지역에 맞춰 위도,경도 설정하도록 수정 필요
            level: 3, // 마찬가지로 결정 필요
          };
          const map = new window.kakao.maps.Map(mapContainer, mapOption);
          map.setBounds(bounds);
        }
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

      {openReviewViewer && <ReviewViewer placeId={placeId} setOpenReviewViewer={setOpenReviewViewer} />}
    </div>
  );
};

export default TripFinder;
