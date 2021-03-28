const User = require('./schemas/user-schema')
const idNormalized = require('./idNormalized')

const findByEmail = async (email) => {
  return await User.findOne({ email })
}

const findById = async (contactId) => {
    const id = idNormalized(contactId)
  return await User.findOne({ _id: contactId })
}

const create = async ({ email, password, subscription }) => {
  const user = new User({ email, password, subscription })
  return await user.save()
}

const updateToken = async (contactId, token) => {
    const id = idNormalized(contactId)
  return await User.updateOne({ _id: contactId }, { token })
}

module.exports = {
  findByEmail,
  findById,
  create,
  updateToken,
}
