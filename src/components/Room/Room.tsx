import { FC } from 'react'
import useChat from '../../hooks/useChat'
import MessageInput from '../MessageInput'
import MessageList from '../MessageList/MessageList'
import UserList from '../UserList/UserList'

export const Room: FC = () => {
	const { users, messages, log, sendMessage, removeMessage } = useChat()

	return (
		<div className='container chat'>
			<div className='container message'>
				<MessageList
					log={log}
					messages={messages}
					removeMessage={removeMessage}
				/>
				<MessageInput sendMessage={sendMessage} />
			</div>
			<UserList users={users} />
		</div>
	)
}
