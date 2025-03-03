import axios from 'axios';
import useRegionStore from '../zustand/regionStore';
import { useYoutubeQuery } from '../hooks/tanstack/useYoutubeQuery';

const Youtube = () => {
  //지역 값
  let selectedRegion = useRegionStore((state) => state.selectedRegion);
  selectedRegion = selectedRegion ? selectedRegion + ' 여행지 추천' : '국내 여행지 추천';

  //tansquery를 사용해서 useEffect 뺐습니다.
  const handleVideo = async () => {
    try {
      //api 참고:
      // 1. 검색은 get ()
      // 2. API 중 v3 api사용 주소: https://www.googleapis.com/youtube/v3
      // 3. 검색을 위해 api에서 제공하는 /search 사용
      // 검색만 진행하니 주소를 따로 빼지 않았습니다.
      console.log(selectedRegion);
      const response = await axios.get('https://www.googleapis.com/youtube/v3/search', {
        params: {
          part: 'snippet', //snippet을 설정하는 경우 API 응답은 하위 속성도 모두 포함
          maxResults: 3, // 상위 3개 영상 가져오기 1로 하면 플레이리스트 중 1개 가져옵니다.
          q: selectedRegion, // 검색어 비어있으면 자동으로 서울 관광지 검색
          type: 'playlist', // api 할당량 때문에 playlist로 받아왔습니다.
          key: import.meta.env.VITE_APP_YOUTUBE_KEY, //다들 env 키 추가하셔요!
        },
      });
      return response.data.items;
    } catch (err) {
      alert('영상을 불러옴에 오류가 있습니다!' + err);
    }
  };

  //Tansquery 적용
  //videos: api에서 받아올 영상 값들 / isLoding: 초기 true, 값 받아오면 결과 상관 x false / error: 값을 못 받아오면 error 객체 들어온다.
  const { data: videos, isLoading, error } = useYoutubeQuery(selectedRegion, handleVideo);

  return (
    <div className="p-4">
      <div className="flex flex-row gap-4">
        {
          //isLoding이면 영상 불러오는 중 띄우기
          //처음에 true로 존재, 값을 받아오면 false가 됩니다.
          isLoading && <h3>📣 영상을 불러오는 중...</h3>
        }
        {
          //error면 영상 불러옴에 문제 있음 알리기
          //처음에 null, undefined로 존재, 값을 받고 isLoding: false +  값을 가져오는데 오류가 있을 때 (erroe: 에러객체) 나타납니다.
          //값을 제대로 받아오면 null로 존재합니다.
          error && <h3>📣 영상을 불러옴에 문제가 있습니다! </h3>
        }
        {
          //처음에 tansquery 적용 전이라 빈 값이 와서 .. 빈 값이 오면 [ ]로 map 돌리고자 videos || [] 작성했습니다.
          //isLoding 이 true인 초기에 값이 비었기에 []를 map해서 페이지에 나타나지 않습니다.
          //api로 값이 받아오고 isLoding 이 false가 되면 페이지에 나타냅니다.

          //플레이리스트 링크 형태: https://www.youtube.com/embed/?list = + playlistId
          (videos || []).map((video) => (
            //aspect-video : 비디오 비율 overflow-hidden : 넘기지 않게 숨기기기
            <div key={video.id.playlistId} className="w-full aspect-video mt-2 rounded-lg shadow-md overflow-hidden">
              <iframe
                className="w-full h-full"
                src={`https://www.youtube.com/embed/?list=${video.id.playlistId}`}
                //전체화면 가능
                allowFullScreen
              ></iframe>
              <span>{video.snippet.title}</span>
            </div>
          ))
        }
      </div>
    </div>
  );
};

export default Youtube;
