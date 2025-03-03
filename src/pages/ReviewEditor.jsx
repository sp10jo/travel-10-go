import useAuthStore from '../zustand/authStore';
import Button from '../components/common/Button';
import Textarea from '../components/common/Textarea';
import ImgFileUploader from '../components/common/ImgFileUploader';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getFilePath } from '../utils/getFilePath';
import { createReviews, insertImagePathToTable, uploadImages } from '../api/supabaseReviewsAPI';
import { PAGE } from '../constants/PageName';

const ReviewEditor = () => {
  const navigate = useNavigate();

  // 상태관리
  const { user } = useAuthStore();
  const [content, setContent] = useState('');
  const [star, setStar] = useState('');
  // ImgFileUploader로 받아온 이미지 배열로 저장
  const [reviewImgs, setReviewImgs] = useState([]);
  // 현재 없는 place_id 정보는 null값으로 지정 (추후 데이터 테이블 연동)
  const place = null;

  // 이미지 업데이트 함수
  const handleImagesChange = (images) => {
    setReviewImgs(images);
  };

  // 뒤로가기 버튼 핸들러
  const handleSendToBackClick = () => {
    navigate(-1);
  };

  // 리뷰 등록 폼 핸들러
  const handleAddSubmit = async (e) => {
    e.preventDefault();

    // 게시글 등록 확인 컨펌 (취소 false / 확인 true)
    const isConfirm = window.confirm('등록하시겠습니까?');

    if (isConfirm) {
      try {
        // 1. reviews 테이블에 저장하는 로직
        const reviewData = await createReviews(content, star, user.id, place);
        const dataId = reviewData.id;

        // 2. reviews_img_path 테이블에 저장하는 로직
        if (reviewImgs.length > 0) {
          for (const img of reviewImgs) {
            const filePath = getFilePath(img);
            const uploadFilePath = `https://ysuwbzthjuzxaxblxwff.supabase.co/storage/v1/object/public/${SUPABASE_TABLE_NAME.BUCKET_REVIEW_IMG}/${filePath}`;

            // 2-1. 이미지 스토리지에 업로드
            await uploadImages(filePath, img);

            // 2-2. 스토리지에 업로드된 이미지 주소를 reviews_img_path 테이블에 저장
            // await insertImagePathToTable(dataId, uploadFilePath);
            await insertImagePathToTable(dataId, uploadFilePath);
          }
        }

        // 3. 리뷰 등록 후 완료 alert 및 리뷰 보고 있던 페이지로 이동
        alert('리뷰가 등록되었습니다.');
        navigate(PAGE.TEST);
      } catch (error) {
        alert('데이터 입력 요청이 실패하였습니다. 지속된 요청 실패 시 고객센터로 문의바랍니다.');
        console.error(error);
      }
    }
  };

  return (
    <div className="flex flex-col justify-center items-center max-w-[400px] w-full mx-auto">
      <h3>리뷰 작성 페이지</h3>
      <form onSubmit={handleAddSubmit}>
        <h4>Content</h4>
        <div>
          <Textarea
            placeholder="리뷰는 300자 이하로 작성해주세요."
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
        </div>

        <h4>이미지 업로드하기 (최대 3장)</h4>
        <ImgFileUploader maxImages={3} onImagesChange={handleImagesChange} />

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
          <Button type="submit">등록</Button>
        </div>
      </form>
    </div>
  );
};

export default ReviewEditor;
