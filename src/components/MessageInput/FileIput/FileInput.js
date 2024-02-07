import useStore from '../../../hooks/useStore'
import { useEffect, useRef } from 'react'
import { MdAttachFile } from 'react-icons/md'
import FilePreview from './FilePreview'

export default function FileInput() {
	// извлекаем файл и метод для его обновления из хранилища
	const { file, setFile } = useStore(({ file, setFile }) => ({ file, setFile }))
	// иммутабельная ссылка на инпут для добавления файла
	// мы скрываем инпут за кнопкой
	const inputRef = useRef()

	// сбрасываем значение инпута при отсутствии файла
	useEffect(() => {
		if (!file) {
			inputRef.current.value = ''
		}
	}, [file])

	return (
		<div className='container file'>
			<input
				type='file'
				accept='image/*, audio/*, video/*'
				onChange={(e) => setFile(e.target.files[0])}
				className='visually-hidden'
				ref={inputRef}
			/>
			<button
				type='button'
				className='btn'
				// передаем клик инпуту
				onClick={() => inputRef.current.click()}
			>
				<MdAttachFile className='icon' />
			</button>

			{file && <FilePreview />}
		</div>
	)
}