import { USER_KEY } from '../../constants'
import { nanoid } from 'nanoid'
import { useEffect, useState } from 'react'
import storage from '../../utils/storage'

export const NameInput = () => {
	// начальные данные
	const [formData, setFormData] = useState({
		userName: '',
		// фиксируем ("хардкодим") название (идентификатор) комнаты
		roomId: 'main_room'
	})
	// состояние блокировки кнопки
	const [submitDisabled, setSubmitDisabled] = useState(true)

	// все поля формы являются обязательными
	useEffect(() => {
		const isSomeFieldEmpty = Object.values(formData).some((v) => !v.trim())
		setSubmitDisabled(isSomeFieldEmpty)
	}, [formData])

	// функция для изменения данных
	const onChange = ({ target: { name, value } }) => {
		setFormData({ ...formData, [name]: value })
	}

	// функция для отправки формы
	const onSubmit = (e) => {
		e.preventDefault()
		if (submitDisabled) return

		// генерируем идентификатор пользователя
		const userId = nanoid()

		// записываем данные пользователя в локальное хранилище
		storage.set(USER_KEY, {
			userId,
			userName: formData.userName,
			roomId: formData.roomId
		})

		// перезагружаем приложение для того, чтобы "попасть" в комнату
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
				{/* скрываем поле для создания комнаты (возможность масштабирования) */}
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
				<button disabled={submitDisabled} className='btn chat'>
					Chat
				</button>
			</form>
		</div>
	)
}