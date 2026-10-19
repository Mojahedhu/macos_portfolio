import { INITIAL_Z_INDEX, WINDOW_CONFIG } from "@/constant";
import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
export type WindowKey =
  | "finder"
  | "safari"
  | "terminal"
  | "photos"
  | "contact"
  | "resume";

type Window = {
  data: unknown;
  zIndex: number;
  isOpen: boolean;
};

interface WindowStore {
  windows: Record<WindowKey, Window>;
  nexZIndex: number;
  openWindow: (key: WindowKey, data?: unknown) => void;
  closeWindow: (key: WindowKey) => void;
  focusWindow: (key: WindowKey) => void;
}

const useWindowStore = create<WindowStore>()(
  immer((set) => ({
    windows: WINDOW_CONFIG,
    nexZIndex: INITIAL_Z_INDEX,
    openWindow: (key, data = null) => {
      set((state) => {
        const win = state.windows[key];
        if (!win) {
          console.warn(`[OpenWindow]:: Window with key ${key} not found`);
          return;
        }
        win.isOpen = true;
        win.data = data ?? win.data;
        win.zIndex = state.nexZIndex;
        state.nexZIndex++;
      });
    },
    closeWindow: (key) => {
      set((state) => {
        const win = state.windows[key];
        if (!win) {
          console.warn(`[CloseWindow]:: Window with key ${key} not found`);
          return;
        }
        win.isOpen = false;
        win.zIndex = INITIAL_Z_INDEX;
        win.data = null;
      });
    },
    focusWindow: (key) => {
      set((state) => {
        const win = state.windows[key];
        if (!win) {
          console.warn(`[FocusWindow]:: Window with key ${key} not found`);
          return;
        }
        win.zIndex = state.nexZIndex;
        state.nexZIndex++;
      });
    },
  })),
);

export default useWindowStore;
