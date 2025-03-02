import supabase from '../supabase/client';

const REVIEWS_SELECT_QUERY = '* , imgs:id(*), places(place_address,place_name), users(*)';
//from으로 가져오는 테이블 이름 상수화
const SUPABASE_TABLE_NAME = {
  REVIEWS: 'reviews',
  REVIEWS_IMG_PATH: 'reviews_img_path',
  BUCKET_REVIEW_IMG: 'review-img',
}

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

export const updateReviews = async () => { };

/**
 * title: 리뷰 작성하기
 * description: 입력된 데이터를 수파베이스 테이블에 insert
 * in: 내용, 별점, 유저아이디, 장소아이디
 * out: 
**/
export const createReviews = async (content, star, userId, place = null) => {
  const { data, error } = await supabase.from(SUPABASE_TABLE_NAME.REVIEWS).insert({ content, star, user_id: userId, place_id: place }).select().single();
  if (error) throw error;
  return data;
};

/**
 * title: 수파베이스 스토리지에 이미지 업로드하기
 * description: 업로드 된 이미지 주소 및 이미지를 받아 업로드
 * in: 파일주소 (/public/~~~uuid 파일명), 이미지파일
 * out: 
**/
export const uploadImages = async (filePath, reviewImg) => {
  const { error } = await supabase.storage.from(SUPABASE_TABLE_NAME.BUCKET_REVIEW_IMG).upload(filePath, reviewImg);
  if (error) throw error;
};

/**
 * title: 이미지 주소 수파베이스에 reviews_img_path에 업로드
 * description: 업로드 할때 얻은 퍼블릭 이미지 주소와 리뷰를 달고 있는 댓글의 아이디를 이용하여 insert
 * in: 리뷰글의 아이디, 이미지 퍼블릭 주소
 * out:
**/
export const insertImagePathToTable = async (dataId, uploadFilePath) => {
  const { error } = await supabase.from(SUPABASE_TABLE_NAME.REVIEWS_IMG_PATH).insert({
    review_id: dataId,
    img_path: uploadFilePath,
  });
  if (error) throw error;
};