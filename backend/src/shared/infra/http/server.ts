import express from 'express'

import '../typeorm'

const app = express()

app.use(express.json())

app.listen(4007, () => {
  console.log('Servidor iniciou na porta 4007')
})
