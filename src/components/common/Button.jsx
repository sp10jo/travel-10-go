const Button = ({ onClick, children, type = 'button', size = 2, textcolor = 'black', bgcolor = 'white' }) => {
  const sizeClasses = {
    1: 'px-2 py-1 text-sm', // 작은 사이즈
    2: 'px-4 py-2 text-base', // 기본 사이즈
    3: 'px-6 py-3 text-lg', // 큰 사이즈
  };
  const bgClasses = {
    skyblue: 'bg-skyblue hover:bg-blue-700',
    green: 'bg-green hover:bg-green-700',
    red: 'bg-button_red_delete hover:bg-red-700',
    gray: 'bg-gray hover:bg-gray-700',
    yellow: 'bg-button_yellow_update hover:bg-yellow-700',
  };

  const textClass = {
    white: 'text-white',
    black: 'text-black',
  };

  return (
    <button
      type={type}
      onClick={onClick}
      className={`${sizeClasses[size]} ${textClass[textcolor]} border-t rounded ${bgClasses[bgcolor]} shadow-md`}
    >
      {children}
    </button>
  );
};

export default Button;
