import axios from 'axios';
import { useState, useEffect } from 'react';
import useRegionStore from '../zustand/regionStore';

const Youtube = () => {
  //받아오는 비디오 값입니다.
  const [videos, setVideos] = useState([]);

  //지금 받아오는 값이 없으니까 테스트

  //지역 값
  let selectedRegion = useRegionStore((state) => state.selectedRegion);
  console.log('search 전:', selectedRegion);
  if (selectedRegion === undefined || selectedRegion === null || selectedRegion === '') {
    selectedRegion = '서울 관광지';
  }
  console.log('search 후:', selectedRegion);

  // 처음 이동할 때 값 가져오도록 하기
  // 후에 검색 값을 state로 둬서 해당 값이 바뀌면 의존성을 줘서 다시 불러올 수 있게 하려합니다.
  useEffect(() => {
    const handleVideo = async () => {
      try {
        //api 참고:
        // 1. 검색은 get ()
        // 2. API 중 v3 api사용 주소: https://www.googleapis.com/youtube/v3
        // 3. 검색을 위해 api에서 제공하는 /search 사용
        // 검색만 진행하니 주소를 따로 빼지 않았습니다.
        const response = await axios.get('https://www.googleapis.com/youtube/v3/search', {
          params: {
            part: 'snippet', //snippet을 설정하는 경우 API 응답은 하위 속성도 모두 포함
            maxResults: 3, // 상위 3개 영상 가져오기
            q: selectedRegion, // 검색어 비어있으면 자동으로 서울 관광지 검색
            type: 'playlist', // 영상만 가져옴 api 할당량 때문에 리스트로 받아올지 고민 중.. video, playlist
            key: import.meta.env.VITE_APP_YOUTUBE_KEY, //다들 env 키 추가하셔요!
          },
        });
        setVideos(response.data.items);
      } catch (err) {
        alert('영상을 불러옴에 오류가 있습니다!' + err);
      }
    };
    handleVideo();
  }, [selectedRegion]);

  return (
    <div className="p-4">
      <div className="flex flex-row gap-4">
        {videos.length === 0 ? (
          <h3>📣영상을 불러오는 중일 가능성이 높습니다. 1분 이상 지속 시 오류!</h3>
        ) : (
          //영상 링크 형태: https://www.youtube.com/embed/ + videoId
          videos.map((video) => (
            //aspect-video : 비디오 비율 overflow-hidden : 넘기지 않게 숨기기기
            <div key={video.id.videoId} className="w-full aspect-video mt-2 rounded-lg shadow-md overflow-hidden">
              <iframe
                className="w-full h-full"
                src={`https://www.youtube.com/embed/${video.id.videoId}`}
                //전체화면 가능
                allowFullScreen
              ></iframe>
              <span>{video.snippet.title}</span>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Youtube;
