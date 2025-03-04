import uuid4 from "uuid4";

export const getFilePath = (reviewImg) => {
  if (!reviewImg || !reviewImg.name) {
    alert("리뷰이미지가 없거나 올바르지 않습니다. 다시 시도해주세요!")
    return;
  }
  const imageExt = reviewImg.name.split('.').pop(); //확장자 추출
  const uniqueImageName = `${uuid4()}.${imageExt}`; // uuid + 원래 확장자
  return `public/${uniqueImageName}`;
}