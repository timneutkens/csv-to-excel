const express = require('express')
const multer  = require('multer')
const fs = require('mz/fs')
const upload = multer({ dest: '/tmp/' })

const app = express()

// CORS configuration
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Methods', 'POST, OPTIONS')
  res.header('Access-Control-Allow-Headers', 'Content-Length, Cache-Control, X-Requested-With')

  // intercept OPTIONS method
  if ('OPTIONS' == req.method) {
    res.send(200)
    return
  }

  next()
})

app.post('/', upload.single('file'), async (req, res, next) => {
  const {file} = req

  if(!file) {
    res.send('No file provided')
    return
  }

  const buffer = await fs.readFile(`${file.destination}${file.filename}`)
  const data = buffer.toString()

  if(data.indexOf('sep=') !== -1) {
    res.send('Separator already set')
    return
  }
  const newData = '"sep=,"\n' + data.toString()

  res.setHeader('Content-disposition', `attachment; filename=${file.originalname}`)
  res.setHeader('Content-type', 'text/csv')
  res.send(newData)

  // req.file is the `avatar` file
  // req.body will hold the text fields, if there were any
})

app.listen(3000, () => console.log('listening on port 3000'))
