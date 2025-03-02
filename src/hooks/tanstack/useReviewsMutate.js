import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteReview } from '../../api/supabaseReviewsAPI';
import { QUERY_KEY } from '../../constants/queryKey';

//리뷰삭제 뮤테이트
export const useDeleteReview = (placeId) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (reviewId) => {
      await deleteReview(reviewId);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY.REVIEWS, `${placeId}`] });
    },
  });
};
