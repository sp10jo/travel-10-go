import React from 'react';
import RegionCard from '../components/RegionCard';
import useRegionStore from '../zustand/regionStore';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const main_select = [
    '서울특별시',
    '부산광역시',
    '대구광역시',
    '인천광역시',
    '광주광역시',
    '대전광역시',
    '울산광역시',
    '경기도',
    '강원도',
    '충청북도',
    '충청남도',
    '전라북도',
    '전라남도',
    '경상북도',
    '경상남도',
    '제주특별자치도',
  ];
  const setSelectedRegion = useRegionStore((state) => state.setSelectedRegion);
  const navigate = useNavigate();

  const handleRegionClick = (region) => {
    setSelectedRegion(region);
    navigate('/trip-finder');
  };

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="fixed top-36 right-5 transform -translate-y-1/2">
        <button className="bg-blue-950 px-3 py-3 text-white rounded-md hover:bg-blue-100 hover:text-pink-950 transition-colors">
          나의 여행 스타일 찾기 ➤
        </button>
      </div>
      <h3 className="flex">여행하고 싶은 지역을 선택해주세요!</h3>
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {main_select.map((region) => (
          <RegionCard key={region} region={region} onClick={() => handleRegionClick(region)} />
        ))}
      </div>
    </div>
  );
};

export default Home;
