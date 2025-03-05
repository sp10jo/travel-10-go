const Button = ({ onClick, children, type = 'button', size = 2, textcolor = 'black', bgcolor = 'white' }) => {
  const sizeClasses = {
    1: 'px-3 py-1.5 text-sm', // 작은 사이즈
    2: 'px-4 py-2 text-base', // 기본 사이즈
    3: 'px-6 py-3 text-lg', // 큰 사이즈
  };
  const bgClasses = {
    skyblue: 'bg-skyblue hover:bg-[#F1F1FF] hover:text-skyblue',
    green: 'bg-green hover:bg-[#EDFDE9] hover:text-green',
    red: 'bg-button_red_delete hover:bg-[#FFE2E7] hover:text-button_red_delete',
    gray: 'bg-gray hover:bg-[#D9D9D9] hover:text-gray',
    yellow: 'bg-button_yellow_update hover:bg-[#FFF0DA] hover:text-button_yellow_update',
    transparentgray: 'bg-lightgray hover:bg-[#D3D3D3]',
  };

  const textClass = {
    white: 'text-white',
    black: 'text-black',
    skyblue: 'text-blue-600',
  };

  return (
    <button
      type={type}
      onClick={onClick}
      className={`${sizeClasses[size]} ${textClass[textcolor]} rounded ${bgClasses[bgcolor]} shadow-md`}
    >
      {children}
    </button>
  );
};

export default Button;
