import create from 'zustand';

interface CustomStoreState {
	file: File | null;
	showPreview: boolean;
	showEmoji: boolean;
}

interface CustomStoreActions {
	setFile: (file: File | null) => void;
	setShowPreview: (showPreview: boolean) => void;
	setShowEmoji: (showEmoji: boolean) => void;
}

const useCustomStore = create<CustomStoreState & CustomStoreActions>((set) => ({
	file: null,
	showPreview: false,
	showEmoji: false,
	setFile: (file) => set({ file }),
	setShowPreview: (showPreview) => set({ showPreview }),
	setShowEmoji: (showEmoji) => set({ showEmoji }),
}));

export default useCustomStore;
