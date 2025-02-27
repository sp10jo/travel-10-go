import axios from 'axios';
import React from 'react';
const key = 'AIzaSyD06auha20lnXQsMPJjUsAlpH3uGo38UNY';

const Youtube = () => {
  const handleVideo = async () => {
    try {
      //axios를 통한 api 연결
      //검색은 get ()
      //v3 api사용 https://www.googleapis.com/youtube/v3 요게 주소! 전에
      // 제공해주신 nbcamp? 같은 서버 느낌
      // /search 이 친구가 login 같은 api에서 제공하는 검색 느낌!
      //저희는 검색 밖에 없으니까 일단 나누지 않겠습니다

      const response = await axios.get('https://www.googleapis.com/youtube/v3/search', {
        params: {
          part: 'snippet', //snippet을 설정하는 경우 API 응답은 하위 속성도 모두 포함
          maxResults: 3, // 상위 3개 영상 가져오기
          q: '서울', // 검색어
          type: 'video', // 영상만 필터링
          key: key,
        },
      });
      return response.data.items;
    } catch (err) {
      alert('영상을 불러옴에 오류가 있습니다!' + err);
      return [];
    }
  };

  /* 
  이렇게 바로 받아오면 오류나더라...
  await 인데 handleVideo()가 Promise(비동기 함수)인데, videos.map()을 바로 호출해서 handleVideo()는 비동기 함수(async function)라서 즉시 데이터를 반환하는 게 아니라 
  Promise 객체를 반환... videos.map()을 하려고 하니까, videos가 배열이 아니라 Promise라서 에러남.. >>useEffect 로 페이지 로딩 될 때마다 값 계산해서 적용하는 게 좋을 듯?

  const videos =  handleVideo(); */
  return (
    <div>
      Youtube
      <div>
        {/* {!videos ? (
          <div>불러오는데 오류났음! 값이 없음!</div>
        ) : (
          //들어오는 형태: [ { id: { videoId: "123" }, snippet: { title: "제목..", thumbnails: { medium: { url: "썸네일 사진 같아용.jpg" } } } },]
          //영상 링크 형태: https://www.youtube.com/embed/ + videoId
          videos.map((video) => (
            <div key={video.id.videoId}>
              <h2>{video.snippet.title}</h2>
              <iframe
                width="500"
                height="300"
                src={`https://www.youtube.com/embed/${video.id.videoId}`}
                allowFullScreen
              ></iframe>
            </div>
          ))
        ) }*/}
        <iframe
          width="560"
          height="315"
          src="https://www.youtube.com/embed/an9J6isFQag"
          frameBorder="0"
          allowFullScreen
        ></iframe>
        <iframe
          width="560"
          height="315"
          src="https://www.youtube.com/embed/J1DHOQNhU6c"
          frameBorder="0"
          allowFullScreen
        ></iframe>
        <iframe
          width="560"
          height="315"
          src="https://www.youtube.com/embed/tgKs6glo5zk"
          frameBorder="0"
          allowFullScreen
        ></iframe>
      </div>
    </div>
  );
};

export default Youtube;
