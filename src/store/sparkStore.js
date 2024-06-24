import { create } from "zustand";

const useSparkStore = create((set) => ({
    sparkProfile: null,
	setSparkProfile: (sparkProfile) => set({ sparkProfile }),
	
}));

export default useSparkStore;
