import {SERVER_URI, USER_KEY} from '../../constants'
import {CgTrashEmpty} from 'react-icons/cg'
import {GiSpeaker} from 'react-icons/gi'
import {useSpeechSynthesis} from 'react-speech-kit'
import TimeAgo from 'react-timeago'
import storage from '../../utils/storage'

export default function MessageItem({message, removeMessage}) {
	// извлекаем данные пользователя из локального хранилища
	const user = storage.get(USER_KEY)
	// утилиты для перевода текста в речь
	const {speak, voices} = useSpeechSynthesis()
	// определяем язык приложения
	const lang = document.documentElement.lang || 'en'
	// мне нравится голос от гугла
	const voice = voices.find(
		(v) => v.lang.includes(lang) && v.name.includes('Google')
	)

	// элемент для рендеринга зависит от типа сообщения
	let element

	// извлекаем из сообщения тип и текст или путь к файлу
	const {messageType, textOrPathToFile} = message

	// формируем абсолютный путь к файлу
	const pathToFile = `${SERVER_URI}/files${textOrPathToFile}`

	// определяем элемент для рендеринга на основе типа сообщения
	switch (messageType) {
		case 'text':
			element = (
				<>
					<button
						className='btn'
						// озвучиваем текст при нажатии кнопки
						onClick={() => speak({text: textOrPathToFile, voice})}
					>
						<GiSpeaker className='icon speak'/>
					</button>
					<p>{textOrPathToFile}</p>
				</>
			)
			break
		case 'image':
			element = <img src={pathToFile} alt=''/>
			break
		case 'audio':
			element = <audio src={pathToFile} controls></audio>
			break
		case 'video':
			element = <video src={pathToFile} controls></video>
			break
		default:
			return null
	}

	// определяем принадлежность сообщения текущему пользователю
	const isMyMessage = user.userId === message.userId

	return (
		<li className={`item message ${isMyMessage ? 'my' : ''}`}>
			<p className='username'>{isMyMessage ? 'Me' : message.userName}</p>

			<div className='inner'>
				{element}

				{isMyMessage && (
					<button className='btn' onClick={() => removeMessage(message)}>
						<CgTrashEmpty className='icon remove'/>
					</button>
				)}
			</div>

			<p className='datetime'>
				<TimeAgo date={message.createdAt}/>
			</p>
		</li>
	)
}