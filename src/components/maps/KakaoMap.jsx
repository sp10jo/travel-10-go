import { useState, useEffect } from 'react';
import { Map, MapMarker, ZoomControl, CustomOverlayMap } from 'react-kakao-maps-sdk';
import { FaMapMarkerAlt } from 'react-icons/fa';
import ReactDOMServer from 'react-dom/server';
import useReviewStore from '../../zustand/reviewStore';
import useRegionStore from '../../zustand/regionStore';
import { motion } from 'framer-motion';

const KakaoMap = () => {
  const DEFAULT_LAT = 33.450701;
  const DEFAULT_LNG = 126.570667;
  const DEFAULT_ZOOM = 3;
  const MARKER_OFFSET_Y = 1.6;
  const MARKER_SIZE = 30;

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
  const [selectedCategory, setSelectedCategory] = useState('관광지');
  const [markers, setMarkers] = useState([]);
  const [hoveredMarker, setHoveredMarker] = useState(null);
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
    if (!map || !selectedRegion) return;

    setMarkers([]);

    const ps = new window.kakao.maps.services.Places();
    const keyword = `${selectedRegion} ${selectedCategory}`;

    ps.keywordSearch(keyword, (data, status) => {
      if (status === window.kakao.maps.services.Status.OK) {
        const newMarkers = data.map((place) => ({
          position: { lat: parseFloat(place.y), lng: parseFloat(place.x) },
          content: place.place_name,
          placeId: place.id,
          addressName: place.address_name,
        }));

        setMarkers(newMarkers);

        const bounds = new window.kakao.maps.LatLngBounds();
        newMarkers.forEach((marker) =>
          bounds.extend(new window.kakao.maps.LatLng(marker.position.lat, marker.position.lng))
        );
        map.setBounds(bounds);
      }
    });
  }, [map, selectedCategory, selectedRegion]);

  return (
    <div className="w-full h-full" id="map">
      <div className="absolute p-2 z-10  w-full rounded-lg">
        <div className="flex gap-3 w-full pb-1">
          {categoryTags.map((category) => (
            <motion.button
              key={category.id}
              onClick={() => setSelectedCategory(category.name)}
              className={`px-3 py-1 rounded-full text-sm whitespace-nowrap ${
                selectedCategory === category.name
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
              initial={{ scale: 1 }}
              animate={{ scale: selectedCategory === category.name ? 1.1 : 1 }}
              transition={{ type: 'spring', stiffness: 300 }}
            >
              {category.icon} {category.name}
            </motion.button>
          ))}
        </div>
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
            }}
            onMouseOver={() => setHoveredMarker(marker)}
            onMouseOut={() => setHoveredMarker(null)}
            image={markerImage}
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
        <ZoomControl position={'RIGHT'} />
      </Map>
    </div>
  );
};

export default KakaoMap;
