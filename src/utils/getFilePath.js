import uuid4 from "uuid4";

export const getFilePath = (reviewImg) => {
  const imageExt = reviewImg.name.split('.').pop(); //확장자 추출
  const uniqueImageName = `${uuid4()}.${imageExt}`; // uuid + 원래 확장자
  return `public/${uniqueImageName}`;
}