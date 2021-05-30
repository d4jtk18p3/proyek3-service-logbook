import express from 'express'
import morgan from 'morgan'
import cors from 'cors'

// import keycloak from './middleware/keycloak'
import dosenRouter from './routes/Dosen'
import mahasiswaRouter from './routes/Mahasiswa'
import entriRouter from './routes/logbook/Entri'
import logbookRouter from './routes/logbook/Logbook'
// import userRouter from './routes/User'

const app = express()
app.use(cors())
// Non aktifkan dulu keycloak agar tidak ada validasi token
// app.use(keycloak.middleware())
// app.use(keycloak.protect())
app.use(express.urlencoded({ extended: true }))
app.use(express.json()) // To parse the incoming requests with JSON payloads
app.use(morgan('dev'))
app.use('/dosen', dosenRouter)
app.use('/mahasiswa', mahasiswaRouter)
app.use('/logbook/entri', entriRouter)
app.use('/logbook/logbook', logbookRouter)
// app.use('/user', userRouter)

// error handling
app.use((error, req, res, next) => {
  // console.log(error)
  const status = error.status || 500
  const message = error.message
  const cause = error.cause || 'Internal Server Error'
  res.status(status).json({
    message: message,
    error: status,
    cause: cause
  })
})

export default app
