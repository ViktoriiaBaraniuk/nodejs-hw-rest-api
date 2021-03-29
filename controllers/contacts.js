const Contacts = require('../model/contacts')
const {HttpCode} = require('../helpers/constants')

const get = async (req, res, next) => {
  try{
    const userId = req.user.id
    const contacts = await Contacts.listContacts(userId)
     return res.json({status:'success', code: HttpCode.OK, data: {contacts} })
  } catch (e) {
    next(e)
  }
}

const getById = async (req, res, next) => {
  try{
    const userId = req.user.id
    const contact = await Contacts.getContactById(req.params.contactId, userId)
    if (contact){
      return res.json({status:'success', code: HttpCode.OK, data: {contact} })} else{
        return res.status(HttpCode.NOT_FOUND).json({status:'error', code: HttpCode.NOT_FOUND, message: 'Not found' })}
      }
     catch (e) {
      next(e)
    }
}

const create = async (req, res, next) => {
  try{
    const userId = req.user.id
    console.log(req.body)
    const contact = await Contacts.addContact({...req.body, owner: userId})
      return res.status(HttpCode.CREATED).json({status:'success', code: HttpCode.CREATED, data: {contact} })
    } catch (e) {
      next(e)
    }
    
}

const remove = async (req, res, next) => {
  try{
    const userId = req.user.id
    const contact = await Contacts.removeContact(req.params.contactId, userId)
    if (contact){
      return res.json({status:'success', code: HttpCode.OK, message: 'contact deleted' })} else{
        return res.status(HttpCode.NOT_FOUND).json({status:'error', code: HttpCode.NOT_FOUND, message: 'Not found' })}
      }
     catch (e) {
      next(e)
    }
}

const update = async (req, res, next) => {
 
  try{
    const userId = req.user.id
    const contact = await Contacts.updateContact(req.params.contactId, req.body, userId)
    if (contact){
      return res.json({status:'success', code: HttpCode.OK, data: {contact}  })} else{
        return res.status(HttpCode.NOT_FOUND).json({status:'error', code: HttpCode.NOT_FOUND, message: 'Not found' })}
      }
     catch (e) {
      next(e)
    }
}

module.exports = {
    get,
    getById,
    create,
    remove,
    update
}

