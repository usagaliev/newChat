import useCustomStore from '../../../hooks/useCustomStore'
import { useEffect, useState, FC, JSX, ReactNode} from 'react'
import {AiOutlineClose} from 'react-icons/ai'

const FilePreview: FC = () => {
	const {file: storedFile, setFile: setStoredFile} = useCustomStore(({file, setFile}) => ({file, setFile}))
	const [src, setSrc] = useState<string | undefined>()
	const [type, setType] = useState<string | undefined>()

	useEffect(() => {
		if (storedFile) {
			setSrc(URL.createObjectURL(storedFile))
			setType(storedFile.type.split('/')[0])
		}
	}, [storedFile])

	let element: string | number | boolean | JSX.Element | Iterable<ReactNode>

	switch (type) {
		case 'image':
			element = <img src={src!} alt={storedFile?.name} />
			break
		case 'audio':
			element = <audio src={src!} controls />
			break
		case 'video':
			element = <video src={src!} controls />
			break
		default:
			break
	}

	return (
		<div className='container preview'>
			{element}

			<button
				type='button'
				className='btn close'
				onClick={() => setStoredFile(null)}
			>
				<AiOutlineClose className='icon close' />
			</button>
		</div>
	)
}

export default FilePreview
