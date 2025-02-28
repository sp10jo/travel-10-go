import { useState } from 'react';
import ReviewViewer from '../components/ReviewViewer';

const TripFinder = () => {
  const [openReviewViewer, setOpenReviewViewer] = useState(false);
  const [placeId, setPlaceId] = useState('');

  return (
    <div className="flex flex-col">
      {openReviewViewer && <ReviewViewer placeId={placeId} setOpenReviewViewer={setOpenReviewViewer} />}
    </div>
  );
};

export default TripFinder;
