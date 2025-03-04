const Button = ({ onClick, children, type = 'button', size = 2, textcolor = 'black', bgcolor = 'white' }) => {
  const sizeClasses = {
    1: 'px-2 py-1 text-sm', // 작은 사이즈
    2: 'px-4 py-2 text-base', // 기본 사이즈
    3: 'px-6 py-3 text-lg', // 큰 사이즈
  };
  const bgClasses = {
    blue: 'bg-blue-500 hover:bg-blue-700',
    green: 'bg-green-500 hover:bg-green-700',
    red: 'bg-red-500 hover:bg-red-700',
    gray: 'bg-gray-500 hover:bg-gray-700',
    yellow: 'bg-yellow-500 hover:bg-yellow-700',
    black: 'bg-black hover:bg-gray-900',
    white: 'bg-white hover:bg-gray-200',
  };

  const textClass = {
    white: 'text-white',
    black: 'text-black',
    blue: 'text-blue-500',
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
