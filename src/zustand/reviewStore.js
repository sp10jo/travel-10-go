import { create } from 'zustand';

const useReviewStore = create((set) => ({
  placeId: '',
  openReviewViewer: false,
  setPlaceId: (id) => set({ placeId: id, openReviewViewer: true }),
  setOpenReviewViewer: (open) => set({ openReviewViewer: open }),
}));

export default useReviewStore;
