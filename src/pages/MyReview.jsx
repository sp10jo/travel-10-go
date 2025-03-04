import ReviewCard from '../components/ReviewCard';
import useAuthStore from '../zustand/authStore';
import { useReviewsByUserIdQuery } from '../hooks/tanstack/useReviewsQuery';

const MyReview = () => {
  const user = useAuthStore((state) => state.user);
  const { data: reviews, isLoading, error } = useReviewsByUserIdQuery(user?.id);

  if (isLoading) {
    return <div>리뷰를 불러오는 중...</div>;
  }
  if (error) {
    return <div>리뷰를 불러오는 데 실패했습니다.</div>;
  }
  if (!reviews || reviews.length === 0) {
    return <div>작성한 리뷰가 없습니다.</div>;
  }

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">내가 작성한 리뷰</h2>
      <div className="space-y-4">
        {reviews.map((review) => (
          <ReviewCard key={review.id} review={review} />
        ))}
      </div>
    </div>
  );
};

export default MyReview;
