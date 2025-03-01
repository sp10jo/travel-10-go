const Textarea = ({
  placeholder = '',
  value,
  onChange,
  maxLength = 300, //기본 300자 제한
  height = 150, // 기본 150px
  textsize = 'text-sm',
}) => (
  <textarea
    placeholder={placeholder}
    value={value}
    onChange={onChange}
    maxLength={maxLength}
    required
    className={`w-full h-[${height}px] whitespace-pre-wrap px-3 py-3 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-blue-500 resize-none ${textsize}`}
  />
);

export default Textarea;
