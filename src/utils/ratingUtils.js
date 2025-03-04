//리뷰의 star(5이하의 숫자)로 별을 그려내는 함수
export const makeRationStar = (rating) => {
  return '★'.repeat(rating) + '☆'.repeat(5 - rating);
};

//리뷰전체데이터로 평균 점수(소수첫째자리까지)를 리턴하는 함수
export const getAverageReviewsRating = (reviews) => {
  return (
    '★' +
    (
      reviews.reduce((sum, review) => {
        return sum + review.star;
      }, 0) / reviews.length
    ).toFixed(1)
  );
};
