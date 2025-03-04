import { create } from 'zustand';

const useReviewStore = create((set) => ({
  selectedPlace: null,
  openReviewViewer: false,
  place: null,
  setSelectedPlace: (place) => set({ place, openReviewViewer: true }),
  setOpenReviewViewer: (open) => set({ openReviewViewer: open }),
  setCloseReviewViewer: () => set({ openReviewViewer: false, place: null }),
}));

export default useReviewStore;
