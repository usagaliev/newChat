import { useEffect, useRef, FC } from 'react'
import MessageItem from './MessageItem'
import {Log, MessageType} from "../../types/types";

interface MessageListProps {
	log: Log
	messages: MessageType[]
	removeMessage: (message: MessageType) => void
}

const MessageList: FC<MessageListProps> = ({ log, messages, removeMessage }) => {
	const logRef = useRef<HTMLParagraphElement>(null)
	const bottomRef = useRef<HTMLParagraphElement>(null)

	useEffect(() => {
		bottomRef.current?.scrollIntoView({
			behavior: 'smooth'
		})
	}, [messages])

	useEffect(() => {
		if (log) {
			logRef.current!.style.opacity = '0.8'
			logRef.current!.style.zIndex = '1'

			const timerId = setTimeout(() => {
				logRef.current!.style.opacity = '0'
				logRef.current!.style.zIndex = '-1'

				clearTimeout(timerId)
			}, 1500)
		}
	}, [log])

	return (
		<div className='container message'>
			<h2>Messages</h2>
			<ul className='list message'>
				{messages.map((message) => (
					<MessageItem
						key={message.messageId}
						message={message}
						removeMessage={removeMessage}
					/>
				))}
				<p ref={bottomRef}></p>
				<p ref={logRef} className='log'>
					{log as unknown as string}
				</p>
			</ul>
		</div>
	)
}

export default MessageList
