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
      //해당 키에대한 쿼리무효화(데이터읽어오기) 취소(삭제요청 중 데이터가져오면 동기화문제)
      //리뷰에대한 캐시데이터를 두군데에서 가지고있을 수 있기때문에 삭제요청시 둘다 처리
      await Promise.all([
        queryClient.cancelQueries({ queryKey: [QUERY_KEY.REVIEWS, `${placeId}`] }),
        queryClient.cancelQueries({ queryKey: [QUERY_KEY.REVIEWS, `${userId}`] }),
      ]);

      //케시데이터 변경 전 데이터 받아오기
      const placePrev = queryClient.getQueryData([QUERY_KEY.REVIEWS, `${placeId}`]);
      const userPrev = queryClient.getQueryData([QUERY_KEY.REVIEWS, `${userId}`]);

      //placeID기준 캐시데이터 변경
      queryClient.setQueryData([QUERY_KEY.REVIEWS, `${placeId}`], (oldReviews) => {
        //캐시데이터에서 리뷰아이디에 해당하는 값을 삭제
        return oldReviews?.filter((review) => {
          return review.id !== reviewId;
        });
      });
      //userID기준 캐시데이터 변경
      queryClient.setQueryData([QUERY_KEY.REVIEWS, `${userId}`], (oldReviews) => {
        //캐시데이터에서 리뷰아이디에 해당하는 값을 삭제
        return oldReviews?.filter((review) => {
          return review.id !== reviewId;
        });
      });

      //변경 전 데이터 context에 저장
      return { placePrev, userPrev };
    },

    //mutationFn이 에러났을때 전에 가지고있던 데이터로 변환
    onError: (_, __, context) => {
      alert('삭제중 에러가 발생했습니다.');
      queryClient.setQueryData([QUERY_KEY.REVIEWS, `${placeId}`], context.placePrev);
      queryClient.setQueryData([QUERY_KEY.REVIEWS, `${userId}`], context.userPrev);
    },

    //mutationFn이 성공했을 때
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY.REVIEWS, `${placeId}`] });
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY.REVIEWS, `${userId}`] });
    },
  });
};
