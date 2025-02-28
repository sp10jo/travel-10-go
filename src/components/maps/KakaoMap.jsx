import { Map, ZoomControl } from 'react-kakao-maps-sdk';

const KakaoMap = () => {
  const lat = 33.450701;
  const lng = 126.570667;
  const zoom = 3;

  return (
    <Map center={{ lat, lng }} style={{ width: '100%', height: '100%' }} level={zoom}>
      <ZoomControl position={'RIGHT'} />
    </Map>
  );
};

export default KakaoMap;
