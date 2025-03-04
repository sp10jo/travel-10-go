import { create } from 'zustand';

const useReviewStore = create((set) => ({
  selectedPlace: null,
  openReviewViewer: false,
  setSelectedPlace: (place) => set({ place, openReviewViewer: true }),
  setOpenReviewViewer: (open) => set({ openReviewViewer: open }),
}));

export default useReviewStore;
