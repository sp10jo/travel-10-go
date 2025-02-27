const Avatar = ({ src, alt = 'Avatar', size = 40, className = '' }) => (
  <img
    src={src}
    alt={alt}
    className={`rounded-full object-cover ${className}`}
    width={size}
    height={size}
    style={{ width: size, height: size }}
  />
);

export default Avatar;
