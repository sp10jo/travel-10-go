import { create } from 'zustand';

const useRegionStore = create((set) => ({
  selectedRegion: '',
  setSelectedRegion: (region) => set({ selectedRegion: region }),
}));

export default useRegionStore;