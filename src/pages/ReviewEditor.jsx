import useAuthStore from '../zustand/authStore';
import Button from '../components/common/Button';
import Textarea from '../components/common/Textarea';
import ImgFileUploader from '../components/common/ImgFileUploader';
import { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { getFilePath } from '../utils/getFilePath';
import {
  createReviews,
  deleteImage,
  getReviewsByReviewId,
  insertImagePathToTable,
  SUPABASE_TABLE_NAME,
  updateReviews,
  uploadImages,
} from '../api/supabaseReviewsAPI';
import { useEffect } from 'react';
import useReviewStore from '../zustand/reviewStore';
import { createPlace } from '../api/supabasePlaceAPI';

const ReviewEditor = () => {
  const navigate = useNavigate();
  const { place } = useReviewStore();

  // 상태관리
  const { user } = useAuthStore();
  const [content, setContent] = useState('');
  const [star, setStar] = useState('');
  // ImgFileUploader로 받아온 이미지 배열로 저장
  const [reviewImgs, setReviewImgs] = useState([]);
  // 수정할시에, 기존이미지가 있는지 체크용 상태관리 선언
  const [existingImages, setExistingImages] = useState([]);

  // url 파라미터로 placeId와 reviewId값 받아오기
  const [searchParams] = useSearchParams();
  const reviewId = searchParams.get('reviewId');
  // 수정버튼 클릭 시, 리뷰아이디로 해당 값 가져와서 렌더링
  useEffect(() => {
    const getReviewData = async () => {
      const data = await getReviewsByReviewId(reviewId);
      const editData = data[0];
      const UploadedimgArr = editData.imgs.map((img) => {
        return img.img_path;
      });
      setContent(editData.content);
      setStar(editData.star);
      setExistingImages(UploadedimgArr);
      setReviewImgs(UploadedimgArr);
    };
    //쿼리스트링으로 reviewId가 넘어오면 데이터 불러와서 인풋창 set해주는 getReviewData()로직실행
    if (reviewId) {
      getReviewData();
    }
  }, []);

  // 이미지 업데이트 함수
  const handleImagesChange = (images) => {
    setReviewImgs(images);
  };

  //이미지 수정 함수
  const handleChange = (images) => {
    setExistingImages(images);
  };

  // 뒤로가기 버튼 핸들러
  const handleSendToBackClick = () => {
    navigate(-1);
  };

  // 리뷰 등록 폼 핸들러
  const handleAddSubmit = async (e) => {
    e.preventDefault();

    // 게시글 등록 확인 컨펌 (취소 false / 확인 true)
    const isConfirm = window.confirm(reviewId ? '수정하시겠습니까?' : '등록하시겠습니까?');

    if (isConfirm) {
      try {
        //카카오 api에서 받아온 플레이스 정보를 수파베이스 플레이스 테이블에 등록
        await createPlace(place);
        // 1. reviews 테이블에 저장하는 로직
        const reviewData = reviewId
          ? await updateReviews(content, star, user.id, place.placeId, reviewId)
          : await createReviews(content, star, user.id, place.placeId);

        const dataId = reviewData.id;

        //처음에 수정 값 undefined 방지
        const existingImgs = existingImages || [];
        // 2. reviews_img_path 테이블에 삭제 및 저장 === 수정
        // 조건: 리뷰 수정 사진이 있을 경우 === 리뷰 사진 수정
        if (reviewImgs.length > 0 && existingImgs.length > 0) {
          // 2-0. 테이블에 연결된 이미지를 삭제합니다.
          await deleteImage(reviewId);
          for (const img of existingImgs) {
            const filePath = getFilePath(img);
            const uploadFilePath = `https://ysuwbzthjuzxaxblxwff.supabase.co/storage/v1/object/public/${SUPABASE_TABLE_NAME.BUCKET_REVIEW_IMG}/${filePath}`;

            // 2-1. 이미지 스토리지에 업로드
            await uploadImages(filePath, img);

            // 2-2. 스토리지에 업로드된 이미지 주소를 reviews_img_path 테이블에 저장
            await insertImagePathToTable(dataId, uploadFilePath);
          }
        } else {
          //리뷰 수정 사진은 없고 추가 사진은 있는 경우 === 리뷰 사진 추가
          for (const img of reviewImgs) {
            const filePath = getFilePath(img);
            const uploadFilePath = `https://ysuwbzthjuzxaxblxwff.supabase.co/storage/v1/object/public/${SUPABASE_TABLE_NAME.BUCKET_REVIEW_IMG}/${filePath}`;

            // 2-1. 이미지 스토리지에 업로드
            await uploadImages(filePath, img);

            // 2-2. 스토리지에 업로드된 이미지 주소를 reviews_img_path 테이블에 저장
            await insertImagePathToTable(dataId, uploadFilePath);
          }
        }

        // 3. 리뷰 등록 후 완료 alert 및 리뷰 보고 있던 페이지로 이동
        reviewId ? alert('리뷰가 수정되었습니다.') : alert('리뷰가 등록되었습니다.');
        navigate(-1);
      } catch (error) {
        alert('데이터 입력 요청이 실패하였습니다. 지속된 요청 실패 시 고객센터로 문의바랍니다.');
        console.error(error);
      }
    }
  };

  return (
    <div className="flex flex-col justify-center items-center max-w-[400px] w-full mx-auto">
      {/* 리뷰아이디 여부에 따라 수정페이지/작성페이지로 보여주기 */}
      <h3>{place.content}</h3>
      <h3>{reviewId ? '리뷰 수정 페이지' : '리뷰 작성 페이지'}</h3>
      <form onSubmit={handleAddSubmit}>
        <h4>Content</h4>
        <div>
          <Textarea
            placeholder="리뷰는 300자 이하로 작성해주세요."
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
        </div>

        <h4>
          {reviewId
            ? '내가 올린 사진 보기 (이미지를 다시 첨부하고 싶다면 리뷰를 새로 작성해주세요!)'
            : '이미지 업로드하기 (최대 3장)'}
        </h4>
        {/* 리뷰아이디 여부에 따라 업로드 컴포넌트 보여줄지와 기존이미지 보여줄지 판단 */}
        {reviewId && reviewImgs.length > 0 ? (
          <ImgFileUploader maxImages={3} onImagesChange={handleChange} />
        ) : (
          // 기존 이미지가 없거나 새글 작성할 시에 보여줄 이미지 업로드 기능
          <ImgFileUploader maxImages={3} onImagesChange={handleImagesChange} />
        )}

        <h4>리뷰 평점</h4>
        <p>
          <select
            value={star}
            onChange={(e) => setStar(e.target.value)}
            name="star"
            id="star"
            className="border px-3 py-3 mb-10 border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-blue-500 resize-none text-sm"
            required
          >
            <option value="" disabled>
              1~5점 중 선택해주세요!
            </option>
            <option value="5">⭐️⭐️⭐️⭐️⭐️(5점)</option>
            <option value="4">⭐️⭐️⭐️⭐️(4점)</option>
            <option value="3">⭐️⭐️⭐️(3점)</option>
            <option value="2">⭐️⭐️(2점)</option>
            <option value="1">⭐️(1점)</option>
          </select>
        </p>
        <div className="flex justify-center items-center gap-10">
          <Button type="button" onClick={handleSendToBackClick}>
            뒤로 가기
          </Button>
          {/* 리뷰아이디 여부에 따라 수정/등록 버튼 보여주기 */}
          <Button type="submit">{reviewId ? '수정' : '등록'}</Button>
        </div>
      </form>
    </div>
  );
};

export default ReviewEditor;
