import crypto from 'crypto'

const generateClientId = () => {
  return crypto.randomBytes(64).toString('hex')
}

const generatePostId = () => {
  return crypto.randomBytes(64).toString('hex')
}

const generateBookingId = () => {
  return crypto.randomBytes(64).toString('hex')
}

export { generateClientId, generatePostId, generateBookingId }