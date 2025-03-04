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

    onMutate: async (reviewId) => {
      //해당 키에대한 쿼리무효화(데이터읽어오기) 취소
      await queryClient.cancelQueries({ queryKey: [QUERY_KEY.REVIEWS, `${placeId}`] });

      //해당 캐시데이터(리뷰데이터들) js문법으로 수정
      //첫번째인자(key)의 캐시데이터를, 두번째 인자의 값으로 바꿈
      queryClient.setQueryData([QUERY_KEY.REVIEWS, `${placeId}`], (oldReviews) => {
        //캐시데이터에서 리뷰아이디에 해당하는 값을 삭제
        return oldReviews.filter((review) => {
          return review.id !== reviewId;
        });
      });
    },

    //mutationFn 이 실행된 후 실행(성공/실패여부 상관 X)
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY.REVIEWS, `${placeId}`] });
    },
  });
};
