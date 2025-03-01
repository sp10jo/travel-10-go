import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteReview } from '../../api/supabaseReviewsAPI';
import { QUERY_KEY } from '../../constants/queryKey';

export const useDeleteReview = (reviewId, placeId) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async () => {
      await deleteReview(reviewId);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY.REVIEWS, placeId] });
    },
  });
};
