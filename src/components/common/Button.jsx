const Button = ({ onClick, children, className = '' }) => (
  <button onClick={onClick} className={`px-4 py-2 border-t rounded ${className}`}>
    {children}
  </button>
);

export default Button;
