import create from 'zustand'

const useStore = create((set, get) => ({
	// файл
	file: null,
	// индикатор отображения превью файла
	showPreview: false,
	// индикатор отображения компонента с эмодзи
	showEmoji: false,
	// метод для обновления файла
	setFile: (file) => {
		// получаем предыдущий файл
		const prevFile = get().file
		if (prevFile) {
			// https://w3c.github.io/FileAPI/#creating-revoking
			// это позволяет избежать утечек памяти
			URL.revokeObjectURL(prevFile)
		}
		// обновляем файл
		set({ file })
	},
	// метод для обновления индикатора отображения превью
	setShowPreview: (showPreview) => set({ showPreview }),
	// метод для обновления индикатора отображения эмодзи
	setShowEmoji: (showEmoji) => set({ showEmoji })
}))

export default useStore