import React from 'react';
import { useState, useEffect } from 'react';
import ReviewCard from '../components/ReviewCard';

const MyReview = () => {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    //Supabase에서 데이터 가져오는 API 연결
    const fetchReviews = async () => {
      const mockReviews = [
        {
          id: 1,
          username: '닉네임1',
          content: '첫 번째 리뷰입니다.',
        },
        {
          id: 2,
          username: '닉네임2',
          content: '두 번째 리뷰입니다.',
        },
      ];
      setReviews(mockReviews);
    };
    fetchReviews();
  }, []);

  return (
    <div>
      <h2>내가 작성한 리뷰</h2>
      <div>
        {reviews.map((reviews) => (
          <ReviewCard
            key={reviews.id}
            username={reviews.username}
            content={reviews.content}
            onEditClick={() => alert('수정 기능 추가 예정')}
            onDeleteClick={() => alert('삭제 기능 추가 예정')}
          />
        ))}
      </div>
    </div>
  );
};

export default MyReview;
