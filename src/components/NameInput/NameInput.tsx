import { USER_KEY } from '../../constants'
import { nanoid } from 'nanoid'
import { useEffect, useState, FC, ChangeEvent, FormEvent } from 'react'
import storage from '../../utils/storage'

interface FormData {
	userName: string
	roomId: string
}

export const NameInput: FC = () => {
	const [formData, setFormData] = useState<FormData>({
		userName: '',
		roomId: 'main_room'
	})
	const [submitDisabled, setSubmitDisabled] = useState<boolean>(true)

	useEffect(() => {
		const isSomeFieldEmpty = Object.values(formData).some((v) => !v.trim())
		setSubmitDisabled(isSomeFieldEmpty)
	}, [formData])

	const onChange = (e: ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target
		setFormData({ ...formData, [name]: value })
	}

	const onSubmit = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		if (submitDisabled) return

		const userId = nanoid()
		storage.set(USER_KEY, {
			userId,
			userName: formData.userName,
			roomId: formData.roomId
		})
		window.location.reload()
	}

	return (
		<div className='container name-input'>
			<h2>Welcome</h2>
			<form onSubmit={onSubmit} className='form name-room'>
				<div>
					<label htmlFor='userName'>Enter your name</label>
					<input
						type='text'
						id='userName'
						name='userName'
						minLength={2}
						required
						value={formData.userName}
						onChange={onChange}
					/>
				</div>
				<div className='visually-hidden'>
					<label htmlFor='roomId'>Enter room ID</label>
					<input
						type='text'
						id='roomId'
						name='roomId'
						minLength={4}
						required
						value={formData.roomId}
						onChange={onChange}
					/>
				</div>
				<button disabled={submitDisabled} className='btn chat' type='submit'>
					Chat
				</button>
			</form>
		</div>
	)
}
