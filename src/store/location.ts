import { create } from "zustand";

import { immer } from "zustand/middleware/immer";
import type { LocationType } from "./location-types";

interface LocationState {
  activeLocationKey: LocationType | number;

  setActiveLocationKey: (key: LocationType | number) => void;
}

const DEFAULT_LOCATION = "work";

const useLocationStore = create<LocationState>()(
  immer((set) => ({
    activeLocationKey: DEFAULT_LOCATION,
    setActiveLocationKey: (key) => {
      set((state) => {
        state.activeLocationKey = key;
      });
    },
  })),
);

export { useLocationStore };
