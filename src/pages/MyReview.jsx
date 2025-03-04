import { useReviewsByUserIdQuery } from '../hooks/tanstack/useReviewsQuery';
import ReviewCard from '../components/ReviewCard';
import useAuthStore from '../zustand/authStore';
// import { useEffect } from 'react';

const MyReview = () => {
  const user = useAuthStore((state) => state.user);

  // ✅ React Hook은 항상 실행되도록 하고, `enabled` 옵션을 사용하여 user.id가 있을 때만 실행
  const {
    data: reviews,
    isLoading,
    isError,
    error,
  } = useReviewsByUserIdQuery(user?.id, {
    enabled: Boolean(user?.id), // user.id가 존재할 때만 쿼리를 실행
  });

  // useEffect(() => {
  //   if (!user) {
  //     alert('로그인이 필요합니다.');
  //     window.location.href = '/login';
  //   }
  // }, [user]);

  if (!user) {
    return <p className="text-center">로그인 정보를 불러오는 중...</p>;
  }

  if (isLoading) return <p className="text-center">리뷰를 불러오는 중...</p>;
  if (isError) return <p className="text-center text-red-500">에러 발생: {error.message}</p>;

  return (
    <div className="p-6 max-w-4xl mx-auto">
      {reviews?.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {reviews.map((review) => (
            <ReviewCard key={review.id} review={review} />
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-500">아직 작성한 리뷰가 없습니다.</p>
      )}
    </div>
  );
};

export default MyReview;
