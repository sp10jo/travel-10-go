const UserInput = ({ type = 'text', placeholder = '', value, onChange, name }) => {
  return (
    <input
      type={type}
      placeholder={placeholder}
      name={name}
      value={value}
      onChange={onChange}
      className={`w-[300px] mb-3 mr-2 border-b border-gray-900 placeholder-gray-300 text-lg focus:outline-none`}
    />
  );
};

export default UserInput;
