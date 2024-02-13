import useCustomStore from '../../../hooks/useCustomStore'
import { useCallback, useEffect, Dispatch, SetStateAction, RefObject, FC } from 'react'
import { BsEmojiSmile } from 'react-icons/bs'
import EmojiPicker from "@emoji-mart/react";

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
		console.log(native, 'native');
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
				<EmojiPicker
					onEmojiSelect={handleSelectEmoji}
					emojiSize={20}
					showPreview={false}
					perLine={6}
					className='emoji-picker1234'
					style={{
						position: "absolute",
						bottom: "80px",
						right: "200px",
						zIndex: 9999
					}}
				/>
			)}
		</div>
	)
}

export default CustomEmojiPicker