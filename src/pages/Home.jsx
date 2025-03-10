import { useEffect } from 'react';
import Spacer from '../components/common/Spacer';
import RegionCard from '../components/RegionCard';
import { MAIN_LOCATION } from '../constants/Location';
import useReviewStore from '../zustand/reviewStore';

const Home = () => {
  const { setCloseReviewViewer } = useReviewStore();

  useEffect(() => {
    //홈이마운트되면 전역에서관리중이던 place정보초기화
    setCloseReviewViewer();
  }, []);

  const handleQuestionClick = () => {
    alert('2025.05.10일 서비스 예정입니다.');
  };

  return (
    <div className="flex flex-col items-center justify-center bg-sky-50">
      <div className="fixed top-36 right-5 transform -translate-y-1/2 z-30">
        <button
          onClick={handleQuestionClick}
          className="bg-blue-950 px-3 py-3 text-white rounded-md hover:bg-blue-100 hover:text-pink-950 transition-colors"
        >
          나의 여행 스타일 찾기 ➤
        </button>
      </div>
      <div
        className="flex flex-col items-center justify-center w-full h-80 bg-cover bg-center"
        style={{ backgroundImage: "url('home/backgroundimg.png')" }}
      >
        <img src="home/10go.png" alt="데이터 요청에 실패했습니다." style={{ width: '12%' }} />
        <h3 className="flex text-black">여행하고 싶은 지역을 선택해주세요!</h3>
      </div>
      <Spacer size={50} />
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {MAIN_LOCATION.map((region) => (
          <RegionCard key={region} region={region} />
        ))}
      </div>
      <Spacer size={100} />
    </div>
  );
};

export default Home;
