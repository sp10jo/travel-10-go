import { useQuery } from '@tanstack/react-query';
import { getReviewsByPlaceId, getReviewsByUserId } from '../../api/supabaseReviewsAPI';

//place_id를 기준으로 리뷰 데이터들을 가져옵니다.
export const useReviewsByPlaceIdQuery = (placeId) => {
  return useQuery({
    queryFn: () => getReviewsByPlaceId(placeId),
    queryKey: ['REVIEWS', placeId],
  });
};

//user_id를('a9d4376d-2e65-4be1-ba62-5f6103500751') 기준으로 리뷰 데이터들을 가져옵니다
export const useReviewsByUserIdQuery = (userId) => {
  return useQuery({
    muaFn: () => getReviewsByUserId(userId),
    queryKey: ['REVIEWS', userId],
  });
};
