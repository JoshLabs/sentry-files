const { generateReleaseUrl } = require('./helpers')
const { post } = require('./sentryClient')
const ClientError = require('./clientError')

function service(config) {
  const { organization, project, token, hostname } = config

  function uploadFile(file) {
    console.log('Release Upload URL -->', generateReleaseUrl(organization, project));
    return new Promise((resolve, reject) => {
      post(hostname, generateReleaseUrl(organization, project))
        .setToken(token)
        .attachFile(file)
        .end((error, response) => {
          if (error) {
            if (error instanceof ClientError) {
              const responseError = new Error()
              responseError.data = Object.assign({}, error.response, {
                file
              })
              return reject(responseError)
            }
            return reject(error)
          }
          const { body } = response
          return resolve(body)
        })
    })
  }
  return {
    uploadFile
  }
}

module.exports = service
