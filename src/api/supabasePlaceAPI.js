import supabase from '../supabase/client';
import { SUPABASE_TABLE_NAME } from './supabaseReviewsAPI';

/**
 * title: 플레이스장소 추가하기
 * description: 리뷰추가하기 버튼을 누를때 해당 카카오API에서 받아온 플레이스 정보를 수파베이스 플레이스 테이블에 등록합니다.
 * in: 카카오api에서 받아온 정보
 * out:
 **/
export const createPlace = async (place) => {
  const id = place.placeId;
  const place_name = place.content;
  const place_address = place.addressName;
  const { error } = await supabase
    .from(SUPABASE_TABLE_NAME.PLACES)
    .upsert([{ id, place_name, place_address }], { onConflict: ['id'] });
  if (error) {
    //id중복(똑같은장소추가) 때문에 발생한 에러는 에러로 처리하지 않음
    if (error.code !== '23505') throw error;
  }
};
