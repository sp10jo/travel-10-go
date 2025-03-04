import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteReview } from '../../api/supabaseReviewsAPI';
import { QUERY_KEY } from '../../constants/queryKey';

//리뷰삭제 뮤테이트
export const useDeleteReview = (placeId, userId) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (reviewId) => {
      await deleteReview(reviewId);
    },

    onMutate: async (reviewId) => {
      //해당 키에대한 쿼리무효화(데이터읽어오기) 취소
      //리뷰에대한 캐시데이터를 두군데서 가지고있을 수 있기때문에 삭제요청시 둘다 처리
      await Promise.all([
        queryClient.cancelQueries({ queryKey: [QUERY_KEY.REVIEWS, `${placeId}`] }),
        queryClient.cancelQueries({ queryKey: [QUERY_KEY.REVIEWS, `${userId}`] }),
      ]);

      //placeID기준 캐시테이블데이터 변경
      queryClient.setQueryData([QUERY_KEY.REVIEWS, `${placeId}`], (oldReviews) => {
        //캐시데이터에서 리뷰아이디에 해당하는 값을 삭제
        return oldReviews?.filter((review) => {
          return review.id !== reviewId;
        });
      });
      //userID기준 캐시테이블데이터 변경
      queryClient.setQueryData([QUERY_KEY.REVIEWS, `${userId}`], (oldReviews) => {
        //캐시데이터에서 리뷰아이디에 해당하는 값을 삭제
        return oldReviews?.filter((review) => {
          return review.id !== reviewId;
        });
      });
    },

    //mutationFn 이 실행된 후 실행(성공/실패여부 상관 X)
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY.REVIEWS, `${placeId}`] });
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY.REVIEWS, `${userId}`] });
    },
  });
};
