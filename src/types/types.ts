export interface Log {
	message: string
}

export interface MessageType {
	messageId: string
	userId: string
	userName: string
	roomId: string
	messageType: 'text' | 'image' | 'audio' | 'video'
	textOrPathToFile: string
	createdAt: Date
}

export interface User {
	userId: string
	userName: string
	roomId?: string
}

export interface UserListProps {
	users: User[]
}