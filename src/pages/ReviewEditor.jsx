import { useState } from 'react';
import supabase from '../supabase/client';
import { useNavigate } from 'react-router-dom';
import uuid4 from 'uuid4';

const ReviewEditor = () => {
  const navigate = useNavigate();

  // [*] useState : 일단 useState로 작업 후 추후 리팩토링 예정
  const [content, setContent] = useState('');
  const [star, setStar] = useState('');
  const [reviewImg, setReviewImg] = useState(null);
  const [previewImg, setPreviewImg] = useState(null);

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

  // 등록 버튼 핸들러
  const handleAddSubmit = async (e) => {
    e.preventDefault();

    //안내 메세지
    const isConfirm = window.confirm('등록하시겠습니까?');

    // 수파베이스에 저장하는 로직
    if (isConfirm) {
      try {
        // 1. supabase reviews 테이블에 저장하는 로직
        const { data, error } = await supabase
          .from('reviews')
          .insert({ content, star, user_id: null, place_id: null })
          .select()
          .single();
        if (error) throw error;

        // 2. 이미지가 있다면 supabase 스토리지에 업로드 하는 로직
        if (reviewImg) {
          const imageExt = reviewImg.name.split('.').pop(); //확장자 추출
          const uniqueImageName = `${uuid4()}.${imageExt}`; // uuid + 원래 확장자

          //이미지 파일 경로
          const filePath = `public/${uniqueImageName}`;

          //이미지 업로드
          const { error: uploadError } = await supabase.storage.from('review-img').upload(filePath, reviewImg);

          if (uploadError) throw uploadError;

          //스토리지에 저장된 이미지 주소 가져오기
          const { data: reviewPublicUrl } = supabase.storage.from('review-img').getPublicUrl(filePath);

          // 3. 스토리지에 업로드 된 이미지의 주소를 가져와서 review_img_path 테이블에 img_path 에 저장하기
          const { error: imgPathError } = await supabase.from('reviews_img_path').insert({
            review_id: data.id, //리뷰글의 아이디
            img_path: reviewPublicUrl.publicUrl,
          });

          if (imgPathError) throw imgPathError;
        }
      } catch (error) {
        console.error('수파베이스 데이터 입력 에러:', error);
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
          />
        </p>
        {/* 현재 이미지 1개 우선 구현 */}
        <p>
          <input type="file" name="upload" accept="image/*" onChange={handleImageFileChange} />
        </p>
        {/* 추후 이미지 2개 이상 구현 예정*/}
        {/* <p>
          <input type="file" multiple="multiple" name='upload' accept="image/*" onChange={handleImageFileChange} />
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
          <button
            type="button"
            onClick={() => navigate(-1)}
            className=" rounded-full w-24 h-24 bg-green-500 text-white hover:bg-green-100 hover:text-green-500"
          >
            뒤로 가기
          </button>
          <button className=" rounded-full w-24 h-24 bg-red-500 text-white hover:bg-red-100 hover:text-red-500">
            등록
          </button>
        </div>
      </form>
    </div>
  );
};

export default ReviewEditor;
