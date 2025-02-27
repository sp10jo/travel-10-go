import Button from './common/Button';

const RegionCard1 = ({ region, onClick, className = '' }) => {
  return (
    <Button
      onClick={onClick}
      className={`p-4 w-[200px] h-[200px]
                bg-gray-200 rounded-md shadow-sm ${className}`}
    >
      <div className="px-4 py-2 bg-black rounded-full text-white">{region}</div>
    </Button>
  );
};

export default RegionCard1;
