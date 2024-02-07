import { SERVER_URI, USER_KEY } from '../../constants'
import { CgTrashEmpty } from 'react-icons/cg'
import { GiSpeaker } from 'react-icons/gi'
import { useSpeechSynthesis, Voice } from 'react-speech-kit'
import TimeAgo from 'react-timeago'
import storage from '../../utils/storage'
import { FC } from 'react'

interface MessageType {
	messageId: string
	userId: string
	userName: string
	roomId: string
	messageType: 'text' | 'image' | 'audio' | 'video'
	textOrPathToFile: string
	createdAt: Date
}

interface MessageItemProps {
	message: MessageType
	removeMessage: (message: MessageType) => void
}

const MessageItem: FC<MessageItemProps> = ({ message, removeMessage }) => {
	const user = storage.get(USER_KEY)
	const { speak, voices } = useSpeechSynthesis()
	const lang = document.documentElement.lang || 'en'
	const voice: Voice | undefined = voices.find(
		(v) => v.lang.includes(lang) && v.name.includes('Google')
	)

	let element: JSX.Element | null = null
	const { messageType, textOrPathToFile } = message
	const pathToFile = `${SERVER_URI}/files${textOrPathToFile}`

	switch (messageType) {
		case 'text':
			element = (
				<>
					<button
						className='btn'
						onClick={() => speak({ text: textOrPathToFile, voice })}
					>
						<GiSpeaker className='icon speak' />
					</button>
					<p>{textOrPathToFile}</p>
				</>
			)
			break
		case 'image':
			element = <img src={pathToFile} alt='' />
			break
		case 'audio':
			element = <audio src={pathToFile} controls />
			break
		case 'video':
			element = <video src={pathToFile} controls />
			break
		default:
			return null
	}

	const isMyMessage = user.userId === message.userId

	return (
		<li className={`item message ${isMyMessage ? 'my' : ''}`}>
			<p className='username'>{isMyMessage ? 'Me' : message.userName}</p>

			<div className='inner'>
				{element}

				{isMyMessage && (
					<button className='btn' onClick={() => removeMessage(message)}>
						<CgTrashEmpty className='icon remove' />
					</button>
				)}
			</div>

			<p className='datetime'>
				<TimeAgo date={message.createdAt} />
			</p>
		</li>
	)
}

export default MessageItem
