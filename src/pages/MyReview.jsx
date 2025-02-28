// src/pages/MyReview.jsx
import { useState, useEffect } from 'react';
import ReviewCard from '../components/ReviewCard';
import useAuthStore from '../zustand/authStore';
import { getReviewsByUserId } from '../api/supabaseReviewsAPI';

const MyReview = () => {
  // const user = useAuthStore(s => s.user);

  // const {a, b} = useAbcStore(function (s) {
  //   return {
  //     a: s.a,
  //     b: s.b
  //   }
  // })

  const { user } = useAuthStore();
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    // Supabase에서 데이터 가져오는 API 연결
    if (!user) return;

    const fetchReviews = async () => {
      const { data, error } = await getReviewsByUserId(user.id);
      if (error) {
        alert('리뷰를 불러오는 데 실패했습니다.');
        return;
      }
      // const mockReviews = [
      //   { id: 1, username: '닉네임1', content: '첫 번째 리뷰입니다.' },
      //   { id: 2, username: '닉네임2', content: '두 번째 리뷰입니다.' },
      // ];
      setReviews(data);
    };
    fetchReviews();
  }, [user]);

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">내가 작성한 리뷰</h2>
      <div className="space-y-4">
        {reviews.map((review) => (
          <ReviewCard
            key={review.id}
            username={review.username}
            content={review.content}
            onEditClick={() => alert('수정 기능 추가 예정')}
            onDeleteClick={() => alert('삭제 기능 추가 예정')}
          />
        ))}
      </div>
    </div>
  );
};

export default MyReview;
