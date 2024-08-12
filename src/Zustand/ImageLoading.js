import {create} from 'zustand';

const useImageLoadingStore = create(set => ({
  imageLoading: false,
  setImageLoading: loading => set({imageLoading: loading}),
  handleImageLoadStart: () => set({imageLoading: true}),
  handleImageLoadEnd: () => set({imageLoading: false}),
}));

export default useImageLoadingStore;
