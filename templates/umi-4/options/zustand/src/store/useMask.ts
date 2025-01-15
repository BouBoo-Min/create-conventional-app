import { create } from "zustand";

interface State {
  maskVisible: boolean;
  isShowLoading: boolean;
}

interface Action {
  storeState: (name: any, value: any) => void;
}

const useMask = create<State & Action>((set, get) => ({
  maskVisible: false,
  isShowLoading: true,

  storeState: (name, value) =>
    set((state) => {
      return {
        ...state.storeState,
        [name]: value,
      };
    }),
}));

export default useMask;
