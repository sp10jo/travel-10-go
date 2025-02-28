import { FaUserCircle } from 'react-icons/fa';

const Avatar = ({ src, alt = 'Avatar', size = 40, className = '' }) => {
  return src ? (
    <img
      src={src}
      alt={alt}
      className={`rounded-full object-cover ${className}`}
      width={size}
      height={size}
      style={{ width: size, height: size }}
    />
  ) : (
    <FaUserCircle className={`text-gray-400 ${className}`} size={size} />
  );
};

export default Avatar;
