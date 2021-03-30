const User = require('./schemas/user-schema')

const findByEmail = async (email) => {
  return await User.findOne({ email })
}

const findById = async (id) => {
  return await User.findOne({ _id: id})
}

const create = async ({ email, password, subscription }) => {
  const user = new User({ email, password, subscription })
  return await user.save()
}

const updateToken = async (id, token) => {
  return await User.updateOne({ _id: id}, { token })
}

const findByToken = async (token) => {
  return await User.findOne({token})
}

const updateAvatar = async (id, avatarUrl) => {
  return await User.updateOne({ _id: id }, { avatarUrl})
}


module.exports = {
  findByEmail,
  findById,
  create,
  updateToken,
  findByToken,
  updateAvatar,
}
