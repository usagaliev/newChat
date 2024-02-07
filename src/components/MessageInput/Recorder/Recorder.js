import useStore from '../../../hooks/useStore'
import { useState } from 'react'
import { RiRecordCircleLine } from 'react-icons/ri'
import RecordingModal from './RecordingModal'

export default function Recorder() {
	// извлекаем индикатор отображения превью файла из хранилища
	const showPreview = useStore(({ showPreview }) => showPreview)
	// локальное состояние для индикатора отображения модального окна
	const [showModal, setShowModal] = useState(false)

	return (
		<div className='container recorder'>
			<button
				type='button'
				className='btn'
				// показываем модальное окно при нажатии кнопки
				onClick={() => setShowModal(true)}
				// блокируем кнопку при отображении превью файла
				disabled={showPreview}
			>
				<RiRecordCircleLine className='icon' />
			</button>
			{showModal && <RecordingModal setShowModal={setShowModal} />}
		</div>
	)
}