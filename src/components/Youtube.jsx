import axios from 'axios';
import { useState, useEffect } from 'react';
const Youtube = ({ location }) => {
  //받아오는 비디오 값입니다.
  const [videos, setVideos] = useState([]);

  //이전 페이지에서 받아오는 값입니다.
  const [search, setSearch] = useState('');

  useEffect(() => {
    if (location === undefined || location === null) {
      console.log('로케이션', location);
      setSearch('대한민국 관광지');
    } else {
      console.log('로케이션', location);
      setSearch(location);
    }
  }, [location]);
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
            q: '강아지', // 검색어 << 후에 수정할 내용
            type: 'video', // 영상만 가져옴옴
            key: import.meta.env.VITE_APP_YOUTUBE_KEY, //다들 env 키 추가하셔요!
          },
        });
        setVideos(response.data.items);
      } catch (err) {
        alert('영상을 불러옴에 오류가 있습니다!' + err);
      }
    };
    handleVideo();
  });

  return (
    <div className="p-4">
      <div className="flex flex-row gap-4">
        {videos.length === 0 ? (
          <h3>📣영상을 불러오는 중일 가능성이 높습니다. 1분 이상 지속 시 오류!</h3>
        ) : (
          //영상 링크 형태: https://www.youtube.com/embed/ + videoId
          videos.map((video) => (
            <div key={video.id.videoId} className="w-full aspect-video mt-2 rounded-lg shadow-md overflow-hidden">
              <iframe
                className="w-full h-full"
                src={`https://www.youtube.com/embed/${video.id.videoId}`}
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
