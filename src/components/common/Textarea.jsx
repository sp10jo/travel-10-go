import { useState } from 'react';

const Textarea = ({
  placeholder = '',
  value,
  onChange,
  height = 150, // 기본 150px
  textsize = 'text-sm',
  maxLength = 300, // 기본 300 글자
}) => {
  // 1. 글자수 초과 시, 에러 메시지 상태관리
  const [error, setError] = useState('');
  const [inputCount, setInputCount] = useState(0);

  // 2. 마우스 포커스를 잃을 시, 자동으로 오류 메시지 제거
  const handleBlur = () => {
    setError('');
  };

  // 3. 한글, 영문, 숫자 등을 1자로 카운트
  const getTextLengthAllType = (text) => {
    return Array.from(text).length;
  };

  // 4. onChange로 받아오는 값에서 getTextLenghAllType으로 텍스트 검증
  const handleTextChange = (e) => {
    let text = e.target.value;
    const realTextLength = getTextLengthAllType(text);

    if (realTextLength > maxLength) {
      setError(`작성하신 글이 제한 글자수를 초과했습니다`);
    } else {
      setError('');
    }

    // 글자 수 초과 시, 초과된 부분을 잘라내고 반환
    if (realTextLength > maxLength) {
      text = text.slice(0, maxLength);
    }
    setInputCount(getTextLengthAllType(text));

    // 브라우저 상태 반영
    onChange({ ...e, target: { ...e.target, value: text } });
  };

  return (
    <div>
      <textarea
        placeholder={placeholder}
        value={value}
        onChange={handleTextChange}
        onBlur={handleBlur}
        required
        style={{ height: `${height}px` }} // 동적 높이 적용
        className={`w-full min-w-[300px] sm:w-[100%] md:w-[600px] lg:w-[800px] min-h-[150px] whitespace-pre-wrap px-3 py-3 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-blue-500 resize-none ${textsize}`}
      />
      <div className="flex justify-end text-gray-500">
        {inputCount}/{maxLength} 자
      </div>
      <div
        className={`text-red-500 transition-opacity duration-500 ease-in-out mb-8 ${
          error ? 'opacity-100' : 'opacity-0'
        }`}
      >
        {error || <div>&nbsp;</div>}
        {/* Non-breaking space로 에러메세지가 없어도 해당 공간 만큼 차지하고 있도록 설정 _ 아래 내용이 밑으로 밀리는 현상 방지 */}
      </div>
    </div>
  );
};

export default Textarea;
