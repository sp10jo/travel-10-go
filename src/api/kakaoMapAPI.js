/**
 * 카카오 내비게이션 API를 이용하여 자동차 경로를 요청하고 지도에 경로를 표시하는 함수
 * @param {Object} routeInfo - 경로 정보
 * @param {Object} routeInfo.start - 출발지 좌표
 * @param {number} routeInfo.start.lat - 출발지 위도
 * @param {number} routeInfo.start.lng - 출발지 경도
 * @param {Object} routeInfo.end - 도착지 좌표
 * @param {number} routeInfo.end.lat - 도착지 위도
 * @param {number} routeInfo.end.lng - 도착지 경도
 * @param {Array<{ lat: number, lng: number }>} routeInfo.via - 경유지 목록
 * @param {Function} setRouteSummary - 경로 요약 정보 setter 함수
 * @param {Function} setPolyline - Polyline setter 함수
 * @param {Object} map - 카카오 지도 객체
 */
export const getCarDirection = async (routeInfo, setRouteSummary, setPolyline, map) => {
  if (!routeInfo.start || !routeInfo.end) {
    alert('출발지와 도착지를 설정해 주세요.');
    return;
  }

  const origin = `${routeInfo.start.lng},${routeInfo.start.lat}`;
  const destination = `${routeInfo.end.lng},${routeInfo.end.lat}`;
  // 경유지 좌표는 '|'로 결합하여 넘긴다.
  const viaPoints = routeInfo.via.map((via) => `${via.lng},${via.lat}`).join('|');

  const headers = {
    Authorization: `KakaoAK ${import.meta.env.VITE_KAKAO_REST_KEY}`,
    'Content-Type': 'application/json',
  };

  // URL 쿼리 파라미터 생성(출발지, 도착지)
  const queryParams = new URLSearchParams({
    origin,
    destination,
    waypoints: viaPoints,
  });

  // https://developers.kakaomobility.com/docs/navi-api/directions/ 참고
  const requestUrl = `${import.meta.env.VITE_KAKAO_MOBILITY_URL}?${queryParams}`;

  try {
    const response = await fetch(requestUrl, { method: 'GET', headers });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();

    let totalDistance = 0;
    let totalDuration = 0;
    const linePath = []; // 경로 저장 배열

    data.routes[0].sections.forEach((section) => {
      totalDistance += section.distance;
      totalDuration += section.duration;

      section.roads.forEach((router) => {
        router.vertexes.forEach((_, index) => {
          if (index % 2 === 0) {
            linePath.push(new window.kakao.maps.LatLng(router.vertexes[index + 1], router.vertexes[index]));
          }
        });
      });
    });

    setRouteSummary({
      distance: (totalDistance / 1000).toFixed(1), // m -> km 변환
      duration: Math.ceil(totalDuration / 60), // 초 -> 분 변환
    });

    if (setPolyline) {
      setPolyline((prevPolyline) => {
        if (prevPolyline) prevPolyline.setMap(null); // 기존 polyline 상태 제거

        const newPolyline = new window.kakao.maps.Polyline({
          path: linePath,
          strokeWeight: 5,
          strokeColor: 'green',
          strokeOpacity: 0.7,
          strokeStyle: 'solid',
        });

        newPolyline.setMap(map);
        return newPolyline;
      });
    }
  } catch (error) {
    console.error('Error:', error);
  }
};
