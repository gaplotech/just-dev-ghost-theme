// Create a token without the client
const jwt = require('jsonwebtoken')
const axios = require('axios')
const FormData = require('form-data')
const fs = require('fs')
const path = require('path')
const themeName = require('./package.json').name

// Load deployment config
const { deployments } = require('./secret.json') || process.env.secret || {}

if (!deployments) {
  throw new Error('deployment secret not found')
}

async function deploy({ serverUrl, apiKey }) {
  if (!serverUrl) {
    throw new Error('environment variable missing GHOST_SERVER')
  }

  if (!apiKey) {
    throw new Error('environment variable missing GHOST_ADMIN_API_KEY')
  }

  // Split the key into ID and SECRET
  const [id, secret] = apiKey.split(':')

  // Create the token (including decoding secret)
  const token = jwt.sign({}, Buffer.from(secret, 'hex'), {
    keyid: id,
    algorithm: 'HS256',
    expiresIn: '5m',
    audience: `/v3/admin/`
  })

  // Make an authenticated request to create a post
  const url = `${serverUrl}/ghost/api/admin/themes/upload`
  const themePath = path.resolve(__dirname, `dist/${themeName}.zip`)

  const formData = new FormData()
  // Append any files to the request
  formData.append('file', fs.createReadStream(themePath), { knownLength: fs.statSync(themePath).size })
  const headers = {
    ...formData.getHeaders(),
    'Accept-Version': 'v5.2',
    'Content-Type': 'multipart/form-data;',
    'Content-Length': formData.getLengthSync(),
    Authorization: `Ghost ${token}`
  }
  await axios
    .post(url, formData, {
      headers,
      maxContentLength: Infinity,
      maxBodyLength: Infinity
    })
    .then(response => console.log(JSON.stringify(response.data)))
    .catch(error => console.error('failed to upload ghost theme', error.response.data))
}

deployments.forEach(it => deploy(it))
