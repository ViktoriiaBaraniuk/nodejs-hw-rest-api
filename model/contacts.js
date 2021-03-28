const Contact =require('./schemas/contact-schema')


const idNormalized = require('./idNormalized')


const listContacts = async (userId) => {return await Contact.find({owner: userId}).populate({
  path: 'owner',
  select: 'email -_id',
})}

const getContactById = async (contactId, userId) => {
  const id = idNormalized(contactId)
 return  await Contact.findOne({ _id: contactId, owner: userId }.populate({
  path: 'owner',
  select: 'email -_id',
}))
}

const removeContact = async (contactId, userId) => {
  const id = idNormalized(contactId)
  const record = Contact.findOneAndRemove({_id: contactId, owner: userId})
  return record
}

const addContact = async (body) => {
  const record = await Contact.create(body)
  return record
}

const updateContact = async (contactId, body, userId) => {
  const id = idNormalized(contactId)
  const record = await Contact.findOneAndUpdate(
    {_id: contactId, owner: userId},
    { ...body },
    {new: true},
  )
  return record
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
}
