import Button from './common/Button';

const RegionCard = ({ region, onClick, className = '' }) => {
  return (
    <div
      className={`flex flex-col items-center justify-center p-4 w-full
                  bg-white rounded-md shadow-sm ${className}`}
    >
      <Button onClick={onClick} className="px-4 py-2 bg-black rounded-full text-white">
        {region}
      </Button>
    </div>
  );
};

export default RegionCard;
