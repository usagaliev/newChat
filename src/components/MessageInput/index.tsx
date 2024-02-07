import fileApi from '../../api/file.api'
import { USER_KEY } from '../../constants'
import useCustomStore from '../../hooks/useCustomStore'
import { nanoid } from 'nanoid'
import { useEffect, useRef, useState, FC } from 'react'
import { FiSend } from 'react-icons/fi'
import storage from '../../utils/storage'
import FileUploader from './Uploader/FileUploader'
import Recorder from './Recorder/Recorder'
import CustomEmojiPicker from "./CustomEmojiPicker";

interface MessageInputProps {
	sendMessage: (message: any) => void
}

const MessageInput: FC<MessageInputProps> = ({ sendMessage }) => {
	const user = storage.get(USER_KEY)
	// @ts-ignore
	const state = useCustomStore((state: any) => state)
	const {
		file: storedFile,
		setFile: setStoredFile,
		showPreview,
		setShowPreview,
		showEmoji,
		setShowEmoji
	} = state

	const [text, setText] = useState<string>('')
	const [submitDisabled, setSubmitDisabled] = useState<boolean>(true)
	const inputRef = useRef<HTMLInputElement>(null)

	useEffect(() => {
		setSubmitDisabled(!text.trim() && !storedFile)
	}, [text, storedFile])

	useEffect(() => {
		setShowPreview(storedFile)
	}, [storedFile, setShowPreview])

	const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		if (submitDisabled) return

		const { userId, userName, roomId } = user
		let message: any = {
			messageId: nanoid(),
			userId,
			userName,
			roomId
		}

		if (!storedFile) {
			message.messageType = 'text'
			message.textOrPathToFile = text
		} else {
			try {
				const path = await fileApi.upload({ file: storedFile, roomId })
				const type = storedFile.type.split('/')[0]

				message.messageType = type
				message.textOrPathToFile = path
			} catch (e) {
				console.error(e)
			}
		}

		if (showEmoji) {
			setShowEmoji(false)
		}

		sendMessage(message)

		setText('')
		setStoredFile(null)
	}

	return (
		<form onSubmit={onSubmit} className='form message'>
			<CustomEmojiPicker setMessageText={setText} messageInputRef={inputRef} />
			<FileUploader />
			<Recorder />
			<input
				type='text'
				autoFocus
				placeholder='Message...'
				value={text}
				onChange={(e) => setText(e.target.value)}
				ref={inputRef}
				disabled={showPreview}
			/>
			<button className='btn' type='submit' disabled={submitDisabled}>
				<FiSend className='icon' />
			</button>
		</form>
	)
}

export default MessageInput
