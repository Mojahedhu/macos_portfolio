import { locations } from "@/constant";
import { create } from "zustand";

import { immer } from "zustand/middleware/immer";
import type { WorkLocation } from "./location-types";

interface LocationState {
  activeLocation: WorkLocation;

  setActiveLocation: (location: WorkLocation) => void;
}

const DEFAULT_LOCATION = locations.work;

const useLocationStore = create<LocationState>()(
  immer((set) => ({
    activeLocation: DEFAULT_LOCATION,
    setActiveLocation: (location) => {
      set((state) => {
        state.activeLocation = location;
      });
    },
  })),
);

export { useLocationStore };
