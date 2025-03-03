import { useQuery } from '@tanstack/react-query';

//캐싱을 해결해 달라
export const useYoutubeQuery = (queryKey, handleVideo) => {
  return useQuery({
    queryKey,
    //queryKey를 통해 같은 값이 오면 api를 불러오지 않음
    queryFn: handleVideo, // querykey에 값이 없으면 해당 함수를 수행
    staleTime: 1000 * 60 * 5, //5분 동안 판단!
  });
};
