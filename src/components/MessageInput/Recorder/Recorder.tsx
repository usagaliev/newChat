import useCustomStore from '../../../hooks/useCustomStore'
import { useState, FC } from 'react'
import { RiRecordCircleLine } from 'react-icons/ri'
import RecordingModal from './RecordingModal'

const Recorder: FC = () => {
	const showPreview = useCustomStore(({ showPreview }) => showPreview)
	const [showModal, setShowModal] = useState<boolean>(false)

	return (
		<div className='container recorder'>
			<button
				type='button'
				className='btn'
				onClick={() => setShowModal(true)}
				disabled={showPreview}
			>
				<RiRecordCircleLine className='icon' />
			</button>
			{showModal && <RecordingModal setShowModal={setShowModal} />}
		</div>
	)
}

export default Recorder
