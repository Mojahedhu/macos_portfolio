import { create } from "zustand";

export type GalleryKey =
  | "library"
  | "memories"
  | "places"
  | "people"
  | "favorites";

interface GalleryStore {
  gallery: GalleryKey;
  setActiveGallery: (active: GalleryKey) => void;
}

const useGallery = create<GalleryStore>()((set) => ({
  gallery: "library",
  setActiveGallery: (active) => {
    set({ gallery: active });
  },
}));

export { useGallery };
