import { Link } from 'react-router-dom';

const RegionCard = ({ region, onClick, className = '' }) => {
  const isLogin = true;

  const regionImages = {
    서울특별시: '/home/seoul.jpg',
    부산광역시: '/home/busan.jpg',
    대구광역시: '/home/daegu.jpeg',
    인천광역시: '/home/incheon.jpg',
    광주광역시: '/home/gwangju.jpg',
    대전광역시: '/home/default.jpg',
    울산광역시: '/home/default.jpg',
    경기도: '/home/default.jpg',
    강원도: '/home/default.jpg',
    충청북도: '/home/default.jpg',
    충청남도: '/home/default.jpg',
    전라북도: '/home/default.jpg',
    전라남도: '/home/default.jpg',
    경상북도: '/home/default.jpg',
    경상남도: '/home/default.jpg',
    제주특별자치도: '/home/default.jpg',
  };

  return (
    <Link
      to={isLogin ? `/trip-finder` : `/login`}
      // 로그인 여부에 따라 tripfinder 페이지 이동 or 로그인 페이지로 이동
      className={`relative w-[300px] h-[200px] bg-white border-none rounded-md shadow-sm mt-36 ${className}`}
      style={{
        backgroundImage: `url(${regionImages[region]})`, // 배경 이미지 설정
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      {/* 검정색 오버레이 (기본 투명, hover 시 불투명) */}
      <div className="absolute inset-0 bg-black opacity-0 hover:opacity-50 transition-opacity duration-300"></div>

      {/* 지역 이름 */}
      <div className="flex items-center justify-center w-full h-full text-gray-300 hover:text-white text-2xl font-bold z-20">
        {region}
      </div>
    </Link>
  );
};

export default RegionCard;
