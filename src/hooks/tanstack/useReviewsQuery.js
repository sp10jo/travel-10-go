import { useQuery } from '@tanstack/react-query';
import { getReviewsByPlaceId, getReviewsByUserId } from '../../api/supabaseReviewsAPI';
import { QUERY_KEY } from '../../constants/queryKey';

//place_id를 기준으로 리뷰 데이터들을 가져옵니다.
export const useReviewsByPlaceIdQuery = (placeId) => {
  return useQuery({
    queryFn: () => getReviewsByPlaceId(placeId),
    queryKey: [QUERY_KEY.REVIEWS, placeId],
  });
};

//user_id를 기준으로 리뷰 데이터들을 가져옵니다
export const useReviewsByUserIdQuery = (userId) => {
  return useQuery({
    muaFn: () => getReviewsByUserId(userId),
    queryKey: [QUERY_KEY.REVIEWS, userId],
  });
};
