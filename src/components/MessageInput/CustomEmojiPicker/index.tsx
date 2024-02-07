import Picker from '@emoji-mart/react'
import useCustomStore from '../../../hooks/useCustomStore'
import { useCallback, useEffect, Dispatch, SetStateAction, RefObject, FC } from 'react'
import { BsEmojiSmile } from 'react-icons/bs'

interface CustomEmojiPickerProps {
	setMessageText: Dispatch<SetStateAction<string>>
	messageInputRef?: RefObject<HTMLInputElement>
}

const CustomEmojiPicker: FC<CustomEmojiPickerProps> = ({ setMessageText, messageInputRef }) => {
	const { showEmoji, setShowEmoji, showPreview } = useCustomStore(
		({ showEmoji, setShowEmoji, showPreview }) => ({
			showEmoji,
			setShowEmoji,
			showPreview
		})
	)

	const onEscapeKeyPress = useCallback(
		(e: KeyboardEvent) => {
			if (e.key === 'Escape') {
				setShowEmoji(false)
			}
		},
		[setShowEmoji]
	)

	useEffect(() => {
		window.addEventListener('keydown', onEscapeKeyPress)

		return () => {
			window.removeEventListener('keydown', onEscapeKeyPress)
		}
	}, [onEscapeKeyPress])

	const handleSelectEmoji = ({ native }: { native: string }) => {
		setMessageText((text) => text + native)
		messageInputRef.current?.focus()
	}

	return (
		<div className='container emoji'>
			<button
				className='btn'
				type='button'
				onClick={() => setShowEmoji(!showEmoji)}
				disabled={showPreview}
			>
				<BsEmojiSmile className='icon' />
			</button>
			{showEmoji && (
				<Picker
					onSelect={handleSelectEmoji}
					emojiSize={20}
					showPreview={false}
					perLine={6}
				/>
			)}
		</div>
	)
}

export default CustomEmojiPicker