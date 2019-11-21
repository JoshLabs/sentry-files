const service = require('./sentryService')
const { validateConfig } = require('./validators')

function upload(config) {
  try {
    validateConfig(config)
  } catch (err) {
    return Promise.reject(err)
  }
  const { uploadFile } = service(config)
  console.log(`---- Begin files upload ----`)
  return Promise.all(
    config.files.map(file => {
      console.log(`Uploading file: ${file.path} -> ${file.name}`)
      return uploadFile(file)
    })
  )
}

module.exports = {
  upload
}
