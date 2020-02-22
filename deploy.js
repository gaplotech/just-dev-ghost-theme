// Create a token without the client
const jwt = require('jsonwebtoken')
const axios = require('axios')
const FormData = require('form-data')
const fs = require('fs')
const path = require('path')

// Load .env config
require('dotenv').config()

const themeName = require('./package.json').name
const serverUrl = process.env.GHOST_SERVER

// Admin API key goes here
const key = process.env.GHOST_ADMIN_API_KEY

if (!serverUrl) {
  throw new Error('environment variable missing GHOST_SERVER')
}

if (!key) {
  throw new Error('environment variable missing GHOST_ADMIN_API_KEY')
}

// Split the key into ID and SECRET
const [id, secret] = key.split(':')

// Create the token (including decoding secret)
const token = jwt.sign({}, Buffer.from(secret, 'hex'), {
  keyid: id,
  algorithm: 'HS256',
  expiresIn: '5m',
  audience: `/v3/admin/`
})

// Make an authenticated request to create a post
const url = `${serverUrl}/ghost/api/v3/admin/themes/upload/`
const themePath = path.resolve(__dirname, `dist/${themeName}.zip`)

const formData = new FormData()
// Append any files to the request
formData.append('file', fs.createReadStream(themePath), { knownLength: fs.statSync(themePath).size })
const headers = {
  ...formData.getHeaders(),
  'Content-Length': formData.getLengthSync(),
  Authorization: `Ghost ${token}`
}
axios
  .post(url, formData, { headers })
  .then(response => console.log(JSON.stringify(response.data)))
  .catch(error => console.error('failed to upload ghost theme', error.response.data))
