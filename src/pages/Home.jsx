import React from 'react';
import RegionCard from '../components/RegionCard';

const Home = () => {
  return (
    <div className="flex flex-col items-center justify-center">
      <div>
        <button className="bg-pink-600 px-3 py-3 text-white rounded-md hover:bg-pink-100 hover:text-pink-950 transition-colors">
          나의 여행 스타일 찾기
        </button>
      </div>
      <h3 className="flex">지역선택</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
        <RegionCard region={'서울특별시'} />
        <RegionCard region={'인천광역시'} />
        <RegionCard region={'경기도'} />
        <RegionCard region={'강원도'} />
        <RegionCard region={'충청북도'} />
        <RegionCard region={'충청남도'} />
        <RegionCard region={'전라북도'} />
        <RegionCard region={'전라남도'} />
        <RegionCard region={'경상북도'} />
        <RegionCard region={'경상남도'} />
        <RegionCard region={'대구광역시'} />
        <RegionCard region={'광주광역시'} />
        <RegionCard region={'울산광역시'} />
        <RegionCard region={'부산광역시'} />
        <RegionCard region={'제주특별자치도'} />
      </div>
    </div>
  );
};

export default Home;
