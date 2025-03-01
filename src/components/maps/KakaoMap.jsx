import { useState, useEffect } from 'react';
import { Map, MapMarker, ZoomControl, CustomOverlayMap } from 'react-kakao-maps-sdk';
import { FaMapMarkerAlt } from 'react-icons/fa';
import ReactDOMServer from 'react-dom/server';

const KakaoMap = ({ region, markers }) => {
  // 추후 region에 따라 값이 설정되도록 변경
  const LATITUDE = 33.450701;
  const LONGITUDE = 126.570667;
  const ZOOM_LEVEL = 3;
  const MARKER_OFFSET_Y = 1.5;
  const MARKER_SIZE = 28;

  const [map, setMap] = useState(null);
  const [info, setInfo] = useState(null);
  const [markerImage, setMarkerImage] = useState(null);

  // Favicon 아이콘을 svg 문자열로 변환해 DataURL로 만들어 이미지로 사용
  useEffect(() => {
    const svgString = ReactDOMServer.renderToString(<FaMapMarkerAlt size={MARKER_SIZE} color="" />);

    const dataUrl = `data:image/svg+xml;base64,${btoa(svgString)}`;

    setMarkerImage({
      src: dataUrl,
      size: {
        width: MARKER_SIZE,
        height: MARKER_SIZE,
      },
    });
  }, []);

  useEffect(() => {
    if (!map || markers.length === 0) return;

    const bounds = new window.kakao.maps.LatLngBounds();

    markers.forEach((marker) => {
      bounds.extend(new window.kakao.maps.LatLng(marker.position.lat, marker.position.lng));
    });

    map.setBounds(bounds);
  }, [map, markers]);

  return (
    <div className="w-full h-full" id="map">
      <Map
        center={{ lat: LATITUDE, lng: LONGITUDE }}
        style={{ width: '100%', height: '100%' }}
        level={ZOOM_LEVEL}
        onCreate={setMap}
      >
        {markers.map((marker, index) => (
          <MapMarker
            key={`marker-${index}`}
            position={marker.position}
            onClick={() => setInfo(marker)}
            image={markerImage}
          />
        ))}

        {info && (
          <CustomOverlayMap position={info.position} yAnchor={MARKER_OFFSET_Y}>
            <div className="relative bg-white border border-gray-300 rounded-md p-2.5 pr-6 text-sm text-gray-700 max-w-xs min-w-[150px] shadow-md text-center">
              <div>{info.content}</div>
              <div
                className="absolute top-1 right-1 cursor-pointer text-gray-400 leading-none h-4 w-4 text-center z-10"
                onClick={(e) => {
                  e.stopPropagation();
                  setInfo(null);
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
