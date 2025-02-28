import ReviewViewer from '../components/ReviewViewer';
import { useState } from 'react';

//해당 핀(장소)를 클릭했을때 나오는 드로어를 테스트하는 페이지 입니다
const TestPage = () => {
  //핀(장소)을 클릭하는 상황에서 발동하는 핸들러 입니다
  //핀(장소)을 클릭하면 openReviewViewer 스테이트 값이 true가 되고
  //ReviewViewer 컴포넌트가 보이게 됩니다
  const [openReviewViewer, setOpenReviewViewer] = useState(false);
  const [placeId, setPlaceId] = useState('');
  const handleClickPin = (placeId) => {
    //해당 장소에 관한 리뷰만 표시되야하기때문에
    //넘어온 placeId갑과 맞는 리뷰만 슈파베이스에서 가져오기위해 placeId를 받아 사용할 예정입니다.
    setOpenReviewViewer(true);
    setPlaceId(placeId);
  };

  return (
    <div className="flex flex-col">
      {/* 해더영역에 따라 어떻게 표시될지 보기위해 임의로 추가해놓은 해더입니다. */}
      <header className="w-[100%] h-[60px] bg-slate-600"></header>
      {/* 헤더 */}
      {/* 메인영역!! */}
      {openReviewViewer && <ReviewViewer placeId={placeId} setOpenReviewViewer={setOpenReviewViewer} />}
      <div style={{ overflow: 'hidden' }}>
        TestPage
        <button
          className="text-5xl"
          onClick={() => {
            handleClickPin(11111111);
          }}
        >
          📌1번지역
        </button>
        <button
          className="text-5xl"
          onClick={() => {
            handleClickPin(22222222);
          }}
        >
          📌2지역
        </button>
      </div>
    </div>
  );
};

export default TestPage;
