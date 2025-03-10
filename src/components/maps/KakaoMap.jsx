import { useState, useEffect } from 'react';
import { Map, MapMarker, ZoomControl, CustomOverlayMap } from 'react-kakao-maps-sdk';
import { FaMapMarkerAlt } from 'react-icons/fa';
import ReactDOMServer from 'react-dom/server';
import useReviewStore from '../../zustand/reviewStore';
import useRegionStore from '../../zustand/regionStore';
import { motion } from 'framer-motion';
import Button from '../common/Button';
import { getCarDirection } from '../../api/kakaoMapAPI';

const KakaoMap = () => {
  const DEFAULT_LAT = 33.450701;
  const DEFAULT_LNG = 126.570667;
  const DEFAULT_ZOOM = 3;
  const MARKER_OFFSET_Y = 1.6;
  const MARKER_SIZE = 30;
  const CONTEXT_OFFSET_X = -0.1;
  const CONTEXT_OFFSET_Y = 0;

  const categoryTags = [
    { id: '관광지', name: '관광지', icon: '🏞️' },
    { id: '맛집', name: '맛집', icon: '🍲' },
    { id: '카페', name: '카페', icon: '☕' },
    { id: '숙소', name: '숙소', icon: '🏨' },
    { id: '쇼핑', name: '쇼핑', icon: '🛍️' },
    { id: '문화시설', name: '문화시설', icon: '🏛️' },
    { id: '체험', name: '체험', icon: '🧩' },
    { id: '공원', name: '공원', icon: '🌳' },
    { id: '엔터테인먼트', name: '엔터테인먼트', icon: '🎭' },
    { id: '역사명소', name: '역사명소', icon: '🏯' },
  ];

  const [map, setMap] = useState(null);
  const [markerImage, setMarkerImage] = useState(null);
  const [selectedCategories, setSelectedCategories] = useState(['관광지']);
  const [markers, setMarkers] = useState([]);
  const [hoveredMarker, setHoveredMarker] = useState(null);
  const [contextMenu, setContextMenu] = useState(null);
  const [routeInfo, setRouteInfo] = useState({
    start: null,
    end: null,
    via: [],
  });
  const [polyline, setPolyline] = useState(null);
  const [routeSummary, setRouteSummary] = useState({ distance: 0, duration: 0 });

  const selectedRegion = useRegionStore((state) => state.selectedRegion);
  const { setSelectedPlace, setOpenReviewViewer } = useReviewStore();

  useEffect(() => {
    const svgString = ReactDOMServer.renderToString(<FaMapMarkerAlt size={MARKER_SIZE} color="red" />);
    const dataUrl = `data:image/svg+xml;base64,${btoa(svgString)}`;
    setMarkerImage({
      src: dataUrl,
      size: { width: MARKER_SIZE, height: MARKER_SIZE },
    });
  }, []);

  useEffect(() => {
    if (!map || !selectedRegion || selectedCategories.length === 0) {
      setMarkers([]);
      return;
    }

    const ps = new window.kakao.maps.services.Places();
    const allMarkers = [];

    /**
     * 카카오맵 API를 이용해 선택한 지역/태그에 대응하는 장소 검색
     */
    const searchMarkers = async () => {
      for (const category of selectedCategories) {
        const keyword = `${selectedRegion} ${category}`;

        await new Promise((resolve) => {
          ps.keywordSearch(keyword, (data, status) => {
            if (status === window.kakao.maps.services.Status.OK) {
              const newMarkers = data.map((place) => ({
                position: { lat: parseFloat(place.y), lng: parseFloat(place.x) },
                content: place.place_name,
                placeId: place.id,
                addressName: place.address_name,
              }));

              allMarkers.push(...newMarkers);
              resolve();
            } else {
              resolve(); // 검색에 실패해도 resolve
            }
          });
        });
      }

      // 모든 검색이 끝난 후, 마커를 한 번에 업데이트
      setMarkers(allMarkers);

      // boundary 업데이트
      const bounds = new window.kakao.maps.LatLngBounds();
      allMarkers.forEach((marker) =>
        bounds.extend(new window.kakao.maps.LatLng(marker.position.lat, marker.position.lng))
      );
      map.setBounds(bounds);
    };

    searchMarkers();
  }, [map, selectedCategories, selectedRegion]);

  /** 출발지 설정 */
  const handleSetStart = () => {
    setRouteInfo({ ...routeInfo, start: contextMenu.position });
    setContextMenu(null);
  };

  /** 도착지 설정 */
  const handleSetEnd = () => {
    setRouteInfo({ ...routeInfo, end: contextMenu.position });
    setContextMenu(null);
  };

  /** 경유지 추가 */
  const handleAddVia = () => {
    setRouteInfo({
      ...routeInfo,
      via: [...routeInfo.via, contextMenu.position],
    });
    setContextMenu(null);
  };

  /** 자동차 경로 검색 */
  const handleGetCarDirection = () => {
    getCarDirection(routeInfo, setRouteSummary, setPolyline, map);
  };

  /**
   * 기본으로 제공되는 MapMarker에 우클릭 이벤트가 존재하지 않아
   * 마커 생성 시 우클릭 이벤트 추가
   * @param {Object} marker - 지도 마커 객체
   */
  const handleMarkerCreate = (marker) => {
    window.kakao.maps.event.addListener(marker, 'rightclick', () => {
      const position = marker.getPosition();
      const lat = position.getLat();
      const lng = position.getLng();
      setContextMenu({
        position: { lat: lat, lng: lng },
        visible: true,
      });
    });
  };

  /**
   * 태그 선택 및 토글
   * @param {string} category - 선택한 카테고리
   */
  const handleCategorySelect = (category) => {
    setSelectedCategories((prevSelected) =>
      prevSelected.includes(category) ? prevSelected.filter((cat) => cat !== category) : [...prevSelected, category]
    );
  };

  return (
    <div className="w-full h-full" id="map">
      <div className="absolute p-2 z-10 w-full rounded-lg">
        <div className="flex gap-3 w-full pb-1 mb-4">
          {categoryTags.map((category) => (
            // framer-motion을 사용하여 UX 향상
            <motion.button
              key={category.id}
              onClick={() => handleCategorySelect(category.name)}
              className={`px-3 py-1 rounded-full text-sm whitespace-nowrap ${
                selectedCategories.includes(category.name)
                  ? 'bg-blue-500 text-white'
                  : 'bg-card_border_gray text-gray-700 hover:bg-lightgray'
              }`}
              initial={{ scale: 1 }}
              animate={{ scale: selectedCategories.includes(category.name) ? 1.1 : 1 }}
              transition={{ type: 'spring', stiffness: 300 }} // 전환 효과
            >
              {category.icon} {category.name}
            </motion.button>
          ))}
        </div>

        <Button onClick={handleGetCarDirection} bgcolor="transparentgray">
          경로 찾기
        </Button>

        {routeSummary.distance > 0 && (
          <div className="absolute top-28 left-2 p-2 bg-white rounded-lg shadow-md text-sm text-gray-700">
            🚗 총 거리: <span className="font-bold">{routeSummary.distance} km</span> | ⏳ 예상 시간:{' '}
            <span className="font-bold">{routeSummary.duration} 분</span>
          </div>
        )}
      </div>
      <Map
        center={{ lat: DEFAULT_LAT, lng: DEFAULT_LNG }}
        style={{ width: '100%', height: '100%' }}
        level={DEFAULT_ZOOM}
        onCreate={setMap}
      >
        {markers.map((marker, index) => (
          <MapMarker
            key={`marker-${index}`}
            position={marker.position}
            onClick={() => {
              setSelectedPlace(marker);
              setOpenReviewViewer(true);
              setContextMenu(null);
            }}
            onMouseOver={() => setHoveredMarker(marker)}
            onMouseOut={() => setHoveredMarker(null)}
            image={markerImage}
            onCreate={(marker) => handleMarkerCreate(marker)}
          />
        ))}
        {hoveredMarker && (
          <CustomOverlayMap position={hoveredMarker.position} yAnchor={MARKER_OFFSET_Y}>
            <div className="relative bg-white border border-gray-300 rounded-md p-2.5 pr-6 text-sm text-gray-700 max-w-[300px] min-w-[200px] shadow-md text-center whitespace-normal">
              <div className="line-clamp-2">{hoveredMarker.content}</div>
              <div
                className="absolute top-1 right-1 cursor-pointer text-gray-400 leading-none h-4 w-4 text-center"
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedPlace(null);
                }}
              >
                ✕
              </div>
            </div>
          </CustomOverlayMap>
        )}
        {contextMenu && contextMenu.visible && (
          <CustomOverlayMap position={contextMenu.position} xAnchor={CONTEXT_OFFSET_X} yAnchor={CONTEXT_OFFSET_Y}>
            <div className="flex flex-col bg-white border border-gray rounded-lg">
              <Button onClick={handleSetStart}>
                <span className="mr-2">🏁</span> 출발지
              </Button>
              <Button onClick={handleSetEnd}>
                <span className="mr-2">🎯</span> 도착지
              </Button>
              <Button onClick={handleAddVia}>
                <span className="mr-2">📍</span> 경유지
              </Button>
            </div>
          </CustomOverlayMap>
        )}
        <ZoomControl position={'RIGHT'} />
      </Map>
    </div>
  );
};

export default KakaoMap;
