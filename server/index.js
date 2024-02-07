import cors from 'cors'
import express from 'express'
import { createServer } from 'http'
import mongoose from 'mongoose'
import { Server } from 'socket.io'
import { ALLOWED_ORIGIN, MONGODB_URI } from './config.js'
import onConnection from './socket_io/onConnection.js'
import { getFilePath } from './utils/file.js'
import onError from './utils/onError.js'
import upload from './utils/upload.js'

const app = express()

app.use(
	cors({
		origin: ALLOWED_ORIGIN
	})
)
app.use(express.json())

app.use('/upload', upload.single('file'), (req, res) => {
	if (!req.file) return res.sendStatus(400)

	// формируем относительный путь к файлу
	const relativeFilePath = req.file.path
		.replace(/\\/g, '/')
		.split('server/files')[1]

	// и возвращаем его
	res.status(201).json(relativeFilePath)
})

app.use('/files', (req, res) => {
	// формируем абсолютный путь к файлу
	const filePath = getFilePath(req.url)

	// и возвращаем файл по этому пути
	res.status(200).sendFile(filePath)
})

app.use(onError)

try {
	await mongoose.connect(MONGODB_URI, {
		useNewUrlParser: true,
		useUnifiedTopology: true
	})
	console.log('🚀 Connected')
} catch (e) {
	onError(e)
}

const server = createServer(app)

const io = new Server(server, {
	cors: ALLOWED_ORIGIN,
	serveClient: false
})

io.on('connection', (socket) => {
	onConnection(io, socket)
})

const PORT = process.env.PORT || 4000
server.listen(PORT, () => {
	console.log(`🚀 Server started on port ${PORT}`)
})