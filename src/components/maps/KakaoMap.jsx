import { useState, useEffect } from 'react';
import { Map, MapMarker, ZoomControl } from 'react-kakao-maps-sdk';

const KakaoMap = ({ region, markers }) => {
  // 추후 region에 따라 값이 설정되도록 변경
  const LATITUDE = 33.450701;
  const LONGITUDE = 126.570667;
  const ZOOM_LEVEL = 3;

  const [map, setMap] = useState(null);

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
          <MapMarker key={index} position={marker.position}>
            <div style={{ color: '#000' }}>{marker.content}</div>
          </MapMarker>
        ))}
        <ZoomControl position={'RIGHT'} />
      </Map>
    </div>
  );
};

export default KakaoMap;
