let mediaRecorder = null
let mediaChunks = []
let mediaConstraints = null

// https://w3c.github.io/mediacapture-main/#constrainable-interface
// требования к аудиопотоку
export const audioConstraints = {
	audio: {
		echoCancellation: true,
		autoGainControl: true,
		noiseSuppression: true
	}
}

// требования к медиапотоку (аудио + видео)
export const videoConstraints = {
	...audioConstraints,
	video: {
		width: 1920,
		height: 1080,
		frameRate: 60.0
	}
}

// индикатор начала записи
export const isRecordingStarted = () => !!mediaRecorder

// метод для приостановки записи
export const pauseRecording = () => {
	mediaRecorder.pause()
}

// метод для продолжения записи
export const resumeRecording = () => {
	mediaRecorder.resume()
}

// метод для начала записи
// принимает требования к потоку
export const startRecording = async (constraints) => {
	mediaConstraints = constraints

	try {
		// https://w3c.github.io/mediacapture-main/#dom-mediadevices-getusermedia
		// получаем поток с устройств пользователя
		const stream = await navigator.mediaDevices.getUserMedia(constraints)
		// определяем тип создаваемой записи
		const type = constraints.video ? 'video' : 'audio'

		// https://www.w3.org/TR/mediastream-recording/#mediarecorder-constructor
		// создаем экземпляр рекордера
		mediaRecorder = new MediaRecorder(stream, { mimeType: `${type}/webm` })

		// обрабатываем запись данных
		mediaRecorder.ondataavailable = ({ data }) => {
			mediaChunks.push(data)
		}

		// запускаем запись
		mediaRecorder.start(250)

		// возвращаем поток
		return stream
	} catch (e) {
		console.error(e)
	}
}

// метод для завершения записи
export const stopRecording = () => {
	// останавливаем рекордер
	mediaRecorder.stop()
	// останавливаем треки из потока
	mediaRecorder.stream.getTracks().forEach((t) => {
		t.stop()
	})

	// определяем тип записи
	const type = mediaConstraints.video ? 'video' : 'audio'
	// https://w3c.github.io/FileAPI/#file-constructor
	// создаем новый файл
	const file = new File(mediaChunks, 'my_record.webm', {
		type: `${type}/webm`
	})

	// без этого запись можно будет создать только один раз
	mediaRecorder.ondataavailable = null
	// обнуляем рекордер
	mediaRecorder = null
	// очищаем массив с данными
	mediaChunks = []

	// возвращаем файл
	return file
}