import { Map, ZoomControl } from 'react-kakao-maps-sdk';

const KakaoMap = () => {
  return (
    <>
      <Map center={{ lat: 33.450701, lng: 126.570667 }} style={{ width: '100%', height: '100%' }} level={3}>
        <ZoomControl position={'RIGHT'} />
      </Map>
      ;
    </>
  );
};

export default KakaoMap;
