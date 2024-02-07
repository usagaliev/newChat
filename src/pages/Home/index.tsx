import { FC } from 'react'
import { NameInput } from '../../components/NameInput/NameInput'
import { Room } from '../../components/Room/Room'
import { USER_KEY } from '../../constants'
import storage from '../../utils/storage'

export const Home: FC = () => {
	const user = storage.get(USER_KEY)

	return user ? <Room /> : <NameInput />
}
