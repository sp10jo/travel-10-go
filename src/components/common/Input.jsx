// const Input = ({ type = 'text', placeholder = '', value, onChange, className = '' }) => (
const Input = ({
  type = 'text',
  placeholder = '',
  value,
  onChange,
  className = '' /*, isError, errorMsg, label, labelPosition, withPasswordIcon*/,
}) => (
  <input
    type={type}
    placeholder={placeholder}
    value={value}
    onChange={onChange}
    className={`px-3 py-2 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-blue-500 ${className}`}
  />
);

export default Input;
