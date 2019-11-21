function generateReleaseUrl(organization, project) {
  if (!organization) throw new Error('organization param is required')
  if (!project) throw new Error('project param is required')
  return `/api/0/organizations/${organization}/releases/${project}/files/`
}

function isEmpty(value) {
if (!value) {
  return true
} else {
  return Array.isArray(value) && value.length === 0
}
}

module.exports = {
isEmpty,
generateReleaseUrl
}
