import app from './app'

const server = app.listen(process.env.PORT, async () => {
  console.log('connected to db & listening on port', process.env.PORT)
})

export default server
