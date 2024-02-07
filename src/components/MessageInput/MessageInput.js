import fileApi from '../../api/file.api'
import { USER_KEY } from '../../constants'
import useStore from '../../hooks/useStore'
import { nanoid } from 'nanoid'
import { useEffect, useRef, useState } from 'react'
import { FiSend } from 'react-icons/fi'
import storage from '../../utils/storage'
import EmojiMart from './EmojiMart/EmojiMart'
import FileInput from './FileIput/FileInput'
import Recorder from './Recorder/Recorder'

export default function MessageInput({ sendMessage }) {
	// извлекаем данные пользователя из локального хранилища
	const user = storage.get(USER_KEY)
	// извлекаем состояние из хранилища
	const state = useStore((state) => state)
	const {
		file,
		setFile,
		showPreview,
		setShowPreview,
		showEmoji,
		setShowEmoji
	} = state
	// локальное состояние для текста сообщения
	const [text, setText] = useState('')
	// локальное состояние блокировки кнопки
	const [submitDisabled, setSubmitDisabled] = useState(true)
	// иммутабельная ссылка на инпут для ввода текста сообщения
	const inputRef = useRef()

	// для отправки сообщения требуется либо текст сообщения, либо файл
	useEffect(() => {
		setSubmitDisabled(!text.trim() && !file)
	}, [text, file])

	// отображаем превью при наличии файла
	useEffect(() => {
		setShowPreview(file)
	}, [file, setShowPreview])

	// функция для отправки сообщения
	const onSubmit = async (e) => {
		e.preventDefault()
		if (submitDisabled) return

		// извлекаем данные пользователя и формируем начальное сообщение
		const { userId, userName, roomId } = user
		let message = {
			messageId: nanoid(),
			userId,
			userName,
			roomId
		}

		if (!file) {
			// типом сообщения является текст
			message.messageType = 'text'
			message.textOrPathToFile = text
		} else {
			// типом сообщения является файл
			try {
				// загружаем файл на сервер и получаем относительный путь к нему
				const path = await fileApi.upload({ file, roomId })
				// получаем тип файла
				const type = file.type.split('/')[0]

				message.messageType = type
				message.textOrPathToFile = path
			} catch (e) {
				console.error(e)
			}
		}

		// скрываем компонент с эмодзи, если он открыт
		if (showEmoji) {
			setShowEmoji(false)
		}

		// отправляем сообщение
		sendMessage(message)

		// сбрасываем состояние
		setText('')
		setFile(null)
	}

	return (
		<form onSubmit={onSubmit} className='form message'>
			<EmojiMart setText={setText} messageInput={inputRef.current} />
			<FileInput />
			<Recorder />
			<input
				type='text'
				autoFocus
				placeholder='Message...'
				value={text}
				onChange={(e) => setText(e.target.value)}
				ref={inputRef}
				// при наличии файла вводить текст нельзя
				disabled={showPreview}
			/>
			<button className='btn' type='submit' disabled={submitDisabled}>
				<FiSend className='icon' />
			</button>
		</form>
	)
}