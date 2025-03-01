import useAuthStore from '../zustand/authStore';
import Button from '../components/common/Button';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getFilePath } from '../utils/getFilePath';
import { createReviews, insertImagePathToTable, uploadImages } from '../api/supabaseReviewsAPI';

const ReviewEditor = () => {
  const navigate = useNavigate();

  //상태관리
  const [content, setContent] = useState('');
  const [star, setStar] = useState('');
  const [reviewImg, setReviewImg] = useState(null);
  const [previewImg, setPreviewImg] = useState(null);
  const { user } = useAuthStore();

  //현재 없는 place_id 정보는 null값으로 지정 (추후 데이터 테이블 연동)
  const place = null;

  // 이미지 변경 함수
  const handleImageFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setReviewImg(file);
    }
    // FileReader를 사용하여 이미지 미리보기 생성
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setPreviewImg(reader.result);
    };
  };

  // 뒤로가기 버튼 핸들러
  const handleSendToBackClick = () => {
    navigate(-1);
  };

  // 리뷰 등록 폼 핸들러
  const handleAddSubmit = async (e) => {
    e.preventDefault();

    //게시글 등록 확인 컨펌 (취소 false/ 확인 ture)
    const isConfirm = window.confirm('등록하시겠습니까?');

    // isConfirm true 확인버튼 클릭 시, 수파베이스에 저장하는 로직
    if (isConfirm) {
      try {
        // 1. reviews 테이블에 저장하는 로직
        const reviewData = await createReviews(content, star, user.id, place);
        const dataId = reviewData.id;

        // 2 reviews_img_path 테이블에 저장하는 로직
        // [2-1] 리뷰 작성 시 업로드된 이미지의 스토리지 주소 얻기
        if (reviewImg) {
          const filePath = getFilePath(reviewImg);
          const uploadFilePath = `https://ysuwbzthjuzxaxblxwff.supabase.co/storage/v1/object/public/review${filePath}`;

          // [2-2] 얻은 이미지 주소로 스토리지에 업로드
          uploadImages(filePath, reviewImg);

          // [2-3] 스토리지에 업로드된 이미지 주소로 reviews_img_path에 컬럼 저장
          insertImagePathToTable(dataId, uploadFilePath);
        }
      } catch (error) {
        alert('데이터 입력 요청이 실패하였습니다. 지속된 요청 실패 시 고객센터로 문의바랍니다');
        console.error(error);
      }
    }
  };

  return (
    <div className="flex flex-col justify-center items-center max-w-[400px] w-full mx-auto">
      <h3>리뷰 작성 페이지</h3>
      <form onSubmit={handleAddSubmit}>
        <h4>Content</h4>
        <p>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            maxLength={300}
            placeholder="리뷰는 300자 이하로 작성해주세요."
            className="whitespace-pre-wrap px-3 py-3 w-full h-[150px] border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-blue-500 resize-none text-sm"
            required
          />
        </p>
        {/* 현재 이미지 1개 우선 구현 */}
        <p>
          <input type="file" name="upload" accept="image/*" onChange={handleImageFileChange} />
        </p>
        {/* 추후 이미지 2개 이상 구현 예정*/}
        {/* <p>
          <input type="file" multiple="multiple" name="upload" accept="image/*" onChange={handleImageFileChange} />
        </p> */}
        {previewImg ? (
          <div>
            <img className="w-[300px] h-[300px] object-cover" src={previewImg} alt="preview-image" />
          </div>
        ) : (
          <div className="flex justify-center items-center w-[400px] h-[300px] rounded-3xl bg-gray-200">
            이미지를 업로드해주세요
          </div>
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
          <Button type="submit">등록</Button>
        </div>
      </form>
    </div>
  );
};

export default ReviewEditor;
