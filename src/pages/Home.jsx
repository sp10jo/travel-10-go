import Spacer from '../components/common/Spacer';
import RegionCard from '../components/RegionCard';
import { MAIN_LOCATION } from '../constants/Location';

const Home = () => {
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
      <Spacer size={50} />
      <h3 className="flex">여행하고 싶은 지역을 선택해주세요!버셀테스트Main</h3>
      <Spacer size={100} />

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
