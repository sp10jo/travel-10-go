import { useState, useRef } from 'react';

const ImgFileUploader = ({ maxImages = 3, onImagesChange }) => {
  // 업로드 된 이미지 및 미리보기 상태관리
  const [reviewImgs, setReviewImgs] = useState([]);
  const [previewImgs, setPreviewImgs] = useState([]);

  // 파일 업로드 input 연결
  const fileInputRef = useRef(null);

  // +.svg 가 있는 정사각형 박스 선택 시 파일 선택 창 열기
  const openFileSelector = () => {
    fileInputRef.current.click();
  };

  // 이미지 변경 함수 (최대 3장 제한)
  const handleImageFileChange = (e) => {
    //추가한 파일을 하나씩 배열안에 담아서 반환
    const files = Array.from(e.target.files);

    // 업로드한 이미지 개수가 부모컴포넌트에서 지정된 maxImages를 초과하는 경우 알림
    if (files.length + reviewImgs.length > maxImages) {
      alert(`이미지는 최대 ${maxImages}장까지 업로드할 수 있습니다.`);
      return;
    }
    //기존 이미지 기억한 상태 필요 (이미지 추가 시, 기존에 추가한 이미지 유지하기 위함, 이렇게 안하면 한장만 업로드 됨)
    setReviewImgs((prev) => [...prev, ...files]);

    // FileReader를 사용하여 이미지 미리보기 생성
    const newPreviews = files.map((file) => {
      const reader = new FileReader();
      return new Promise((resolve) => {
        reader.readAsDataURL(file);
        reader.onloadend = () => resolve(reader.result);
      });
    });

    // 모든 FileReader 작업이 완료된 후 상태 업데이트
    Promise.all(newPreviews).then((images) => {
      // 기존 미리보기 + 새 미리보기 추가
      setPreviewImgs((prev) => [...prev, ...images]);
      // 부모 컴포넌트에 이미지 전달
      onImagesChange([...reviewImgs, ...files]);
    });
  };

  // 미리보기 이미지 삭제 기능
  const handleRemoveImage = (index) => {
    setReviewImgs((prev) => prev.filter((_, i) => i !== index));
    setPreviewImgs((prev) => prev.filter((_, i) => i !== index));
    // 부모 컴포넌트에 변경된 상태 전달
    onImagesChange(reviewImgs.filter((_, i) => i !== index));
  };

  return (
    <div>
      {/* 숨김처리한 input 태그 */}
      <input
        type="file"
        multiple
        accept="image/*"
        onChange={handleImageFileChange}
        ref={fileInputRef}
        className="hidden"
      />

      {/* 이미지 미리보기 및 추가 버튼*/}
      <div className="flex gap-3 mt-3">
        {/* 추가 버튼 _ input으로 useRef로 연결 */}
        <div
          onClick={openFileSelector}
          className="flex flex-col justify-center items-center border w-[100px] h-[100px] object-cover rounded-lg bg-white hover:bg-purple-100 transform transition-all duration-200 ease-in-out active:scale-110"
        >
          <img draggable="false" src="/+.svg" className="w-1/2 h-1/2 text-gray-500 opacity-60" alt="camera icon" />
        </div>
        {/* 이미지 미리보기, 없을 시 기본 카메라 이미지 보여주기 */}
        {previewImgs.length > 0 ? (
          previewImgs.map((src, index) => (
            <div key={index} className="relative">
              <img className="w-[100px] h-[100px] object-cover rounded-lg" src={src} alt={`preview-${index}`} />
              <button
                type="button"
                onClick={() => handleRemoveImage(index)}
                className="absolute top-0 right-0 bg-red-500 text-white rounded-full w-5 h-5 flex justify-center items-center text-xl"
              >
                &times;
              </button>
            </div>
          ))
        ) : (
          <div className="flex justify-center items-center border w-[100px] h-[100px] object-cover rounded-lg bg-gray-100 ">
            <img
              draggable="false"
              src="/camera.svg"
              className="w-1/2 h-1/2 text-gray-500 opacity-30"
              alt="camera icon"
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default ImgFileUploader;
