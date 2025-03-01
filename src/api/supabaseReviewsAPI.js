import supabase from '../supabase/client';

const REVIEWS_SELECT_QUERY = '* , imgs:id(*), places(place_address,place_name), users(*)';

/**
 * title: 리뷰 불러오기(장소기준)
 * description : 플레이스아이디를 기준으로 리뷰데이터를 가져옵니다.
 * in : placeId : '12345678'
 * out : [
 *     {
 *       id: string,            // 리뷰 고유 ID
 *       content: string,       // 리뷰 내용
 *       star: number,          // 별점 (예: 4)
 *       created_at: string,    // 리뷰 작성 시간
 *       place_id : string      // 장소 고유 ID(카카오API에서 받아온 값 기반)
 *       places: {              // 장소 정보 (리뷰별 포함)
 *         name: string,        // 장소 이름
 *         address: string      // 장소 주소
 *       },
 *       imgs: [                // 리뷰에 포함된 이미지 리스트
 *         {
 *           id: number,
 *           img_path: string   //리뷰에 포함된 이미지의 주소
 *         }
 *       ],
 *       user: {                // 작성자 정보
 *         id: string,
 *         nickname: string,    //작성자의 닉네임
 *         profile_img_path: string | null, //
 *         created_at: string
 *       }
 *     }
 *   ]
 */
export const getReviewsByPlaceId = async (placeId) => {
  const { data, error } = await supabase.from('reviews').select(REVIEWS_SELECT_QUERY).eq('place_id', placeId);
  if (error) {
    throw error;
  }
  return data;
};

/**
 * title: 리뷰 불러오기(유저id기준)
 * description : 유저아이디를 기준으로 리뷰데이터를 가져옵니다.
 * in : userId : 'a9d4376d-2e65-4be1-ba62-5f6103500751'
 * out : getReviewsByPlaceId의 out과 동일
 **/
export const getReviewsByUserId = async (userId) => {
  const { data, error } = await supabase.from('reviews').select(REVIEWS_SELECT_QUERY).eq('user_id', userId);
  if (error) {
    throw error;
  }
  return data;
};

export const deleteReview = async (reviewId) => {
  const { error } = await supabase.from('reviews').delete().eq('id', reviewId);
  if (error) {
    throw error;
  }
};

export const updateReviews = async () => {};

export const createReviews = async () => {};
