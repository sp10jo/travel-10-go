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

  const [map, setMap] = useState(null);
  const [info, setInfo] = useState(null);
  const [markerImage, setMarkerImage] = useState(null);

  useEffect(() => {
    const svgString = ReactDOMServer.renderToString(<FaMapMarkerAlt size={24} color="#E03131" />);

    const dataUrl = `data:image/svg+xml;base64,${btoa(svgString)}`;

    setMarkerImage({
      src: dataUrl,
      size: {
        width: 24,
        height: 24,
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
    <div id="map" style={{ width: '100%', height: '100%' }}>
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
            <div
              style={{
                position: 'relative',
                backgroundColor: '#fff',
                border: '1px solid #ccc',
                borderRadius: '5px',
                padding: '10px',
                paddingRight: '25px', // X 버튼 공간 확보
                fontSize: '14px',
                color: '#333',
                maxWidth: '250px',
                minWidth: '150px',
                boxShadow: '0 2px 10px rgba(0, 0, 0, 0.2)',
                wordWrap: 'break-word',
                textAlign: 'center',
              }}
            >
              <div>{info.content}</div>
              <div
                style={{
                  position: 'absolute',
                  top: '5px',
                  right: '5px',
                  cursor: 'pointer',
                  color: '#888',
                  lineHeight: '1',
                  height: '16px',
                  width: '16px',
                  textAlign: 'center',
                  zIndex: '1',
                }}
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
