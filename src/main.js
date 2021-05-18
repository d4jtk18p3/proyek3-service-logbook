import db from './db'
import server from './server'
import mongoose from 'mongoose'

db.authenticate()
  .then(() => {
    console.log('Database connection has been established successfully.')

    server.listen(process.env.SERVER_PORT, () =>
      console.log(`Server app listening on port ${process.env.SERVER_PORT}!`)
    )
  })
  .catch((error) => {
    console.error('Unable to connect to the database:', error)
  })

mongoose.connect(`mongodb://${process.env.MONGODB_HOSTNAME}/${process.env.MONGODB_DATABASE}`, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true
})
  .then(() => {
    console.log('MongoDB connection has been established successfully.')
  })
  .catch((error) => {
    console.log('Unable to connect to MongoDB: ', error)
  })