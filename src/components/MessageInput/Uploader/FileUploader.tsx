import useCustomStore from '../../../hooks/useCustomStore'
import { useEffect, useRef, FC } from 'react'
import { MdAttachFile } from 'react-icons/md'
import FilePreview from './FilePreview'

const FileUploader: FC = () => {
	const { file: storedFile, setFile: setStoredFile } = useCustomStore(({ file, setFile }) => ({ file, setFile }))
	const inputReference = useRef<HTMLInputElement>(null)

	useEffect(() => {
		if (!storedFile && inputReference?.current) {
			inputReference.current.value = ''
		}
	}, [storedFile])

	return (
		<div className='container file'>
			<input
				type='file'
				accept='image/*, audio/*, video/*'
				onChange={(e) => setStoredFile(e.target.files![0])}
				className='visually-hidden'
				ref={inputReference}
			/>
			<button
				type='button'
				className='btn'
				onClick={() => inputReference.current!.click()}
			>
				<MdAttachFile className='icon' />
			</button>

			{storedFile && <FilePreview />}
		</div>
	)
}

export default FileUploader
