import supabase from '../supabase/client';

//플레이스의 id를 기준으로 리뷰를 가져오기
export const getReviewsByPlaceId = async (placeId) => {
  const { data, error } = await supabase
    .from('reviews')
    .select('* , imgs:id(*), places(place_address,place_name)')
    .eq('place_id', placeId);
  if (error) {
    throw error;
  }
  return data;
};

//유저의 userId를 기준으로 리뷰를 가져오기
export const getReviewsByUserId = async (userId) => {
  const { data, error } = await supabase
    .from('reviews')
    .select('* , imgs:id(*), places(place_address,place_name)')
    .eq('user_id', userId);
  if (error) {
    throw error;
  }
  return data;
};

export const updateReviews = async () => {};

export const deleteReviews = async () => {};

export const createReviews = async () => {};
