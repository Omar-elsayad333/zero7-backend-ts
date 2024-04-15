const mongoose = require('mongoose')
import * as express from 'express'
mongoose.set('strictQuery', true)

const connectDB = async (app: express.Application) => {
  try {
    await mongoose.connect(process.env.MONGO_URI)

    // listen for requests
    app.listen(process.env.PORT, () => {
      console.log('connected to db & listening on port', process.env.PORT)
    })
  } catch (error) {
    console.log('error listing')
  }
}

const db = mongoose.connection

export { connectDB, db }
