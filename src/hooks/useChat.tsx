import { useEffect, useRef, useState } from 'react'
import { io, Socket } from 'socket.io-client'
import storage from '../utils/storage'
import { SERVER_URI, USER_KEY } from '../constants'
import {Log, MessageType, User} from "../types/types";

export default function useChat() {
	const user: User = storage.get(USER_KEY)
	const [users, setUsers] = useState<User[]>([])
	const [messages, setMessages] = useState<MessageType[]>([])
	const [log, setLog] = useState<Log | null>(null)
	const socketRef = useRef<Socket | null>(null)

	useEffect(() => {
		socketRef.current = io(SERVER_URI, {
			query: {
				roomId: user.roomId,
				userName: user.userName
			}
		})

		const socket = socketRef.current

		socket.emit('user:add', user)
		socket.emit('message:get')

		socket.on('log', (log: Log) => {
			setLog(log)
		})

		socket.on('user_list:update', (users: User[]) => {
			setUsers(users)
		})

		socket.on('message_list:update', (messages: MessageType[]) => {
			setMessages(messages)
		})

		return () => {
			socket.disconnect()
		}
	}, [])

	const sendMessage = (message: MessageType) => {
		socketRef.current?.emit('message:add', message)
	}

	const removeMessage = (message: MessageType) => {
		socketRef.current?.emit('message:remove', message)
	}

	return { users, messages, log, sendMessage, removeMessage }
}
