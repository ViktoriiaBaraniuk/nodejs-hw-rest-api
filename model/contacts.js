const Contact =require('./schemas/contact-schema')


const idNormalized = require('./idNormalized')


const listContacts = async () => {return await Contact.find({})}

const getContactById = async (contactId) => {
  const id = idNormalized(contactId)
 return  await Contact.find({ _id: contactId })
}

const removeContact = async (contactId) => {
  const id = idNormalized(contactId)
  const record = Contact.findByIdAndRemove({_id: contactId})
  return record
}

const addContact = async (body) => {
  const record = await Contact.create(body)
  return record
}

const updateContact = async (contactId, body) => {
  const id = idNormalized(contactId)
  const record = await Contact.findByIdAndUpdate(
    {_id: contactId},
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
