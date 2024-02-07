import { FC } from 'react'
import { AiOutlineUser } from 'react-icons/ai'
import {UserListProps} from "../../types/types";

const UserList: FC<UserListProps> = ({ users }) => {
	return (
		<div className='container user'>
			<h2>Users</h2>
			<ul className='list user'>
				{users.map(({ userId, userName }) => (
					<li key={userId} className='item user'>
						<AiOutlineUser className='icon user' />
						{userName}
					</li>
				))}
			</ul>
		</div>
	)
}

export default UserList
