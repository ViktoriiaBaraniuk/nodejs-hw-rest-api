const fs = require('fs/promises')
const { v4: uuidv4 } = require('uuid');
const db = require('./db')
const contacts = require('./contacts.json')

const idNormalized = require('./idNormalized')


const listContacts = async () => {return db.value()}

const getContactById = async (contactId) => {
  const id = idNormalized(contactId)
 return db.find({ id})
.value()}

const removeContact = async (contactId) => {
  const id = idNormalized(contactId)
  const [record] = db.remove({id}).write()
  return record
}

const addContact = async (body) => {
  const contactId = uuidv4()
  const record = {
    id: contactId,
    ...body,
  }
  db.push(record).write()

  return record
}

const updateContact = async (contactId, body) => {
  const id = idNormalized(contactId)
  const record = db.find({id}).assign(body).value()
  db.write()
  return record.id ? record : null
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
}
