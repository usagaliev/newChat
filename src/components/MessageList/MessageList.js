import { useEffect, useRef } from 'react'
import MessageItem from './MessageItem'

export default function MessageList({ log, messages, removeMessage }) {
	// иммутабельная ссылка на элемент для отображения системных сообщений
	const logRef = useRef()
	// иммутабельная ссылка на конец списка сообщений
	const bottomRef = useRef()

	// выполняем прокрутку к концу списка при добавлении нового сообщения
	// это может стать проблемой при большом количестве пользователей,
	// когда участники чата не будут успевать читать сообщения
	useEffect(() => {
		bottomRef.current.scrollIntoView({
			behavior: 'smooth'
		})
	}, [messages])

	// отображаем и скрываем системные сообщения
	useEffect(() => {
		if (log) {
			logRef.current.style.opacity = 0.8
			logRef.current.style.zIndex = 1

			const timerId = setTimeout(() => {
				logRef.current.style.opacity = 0
				logRef.current.style.zIndex = -1

				clearTimeout(timerId)
			}, 1500)
		}
	}, [log])

	return (
		<div className='container message'>
			<h2>Messages</h2>
			<ul className='list message'>
				{/* перебираем список и рендерим сообщения */}
				{messages.map((message) => (
					<MessageItem
						key={message.messageId}
						message={message}
						removeMessage={removeMessage}
					/>
				))}

				<p ref={bottomRef}></p>

				<p ref={logRef} className='log'>
					{log}
				</p>
			</ul>
		</div>
	)
}