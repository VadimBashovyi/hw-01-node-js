const { randomUUID } = require('crypto')
const fs = require('fs/promises')
const path = require('path')

const contactsPath = async () => {
  const content = await fs.readFile(
    path.join(__dirname, 'db', 'contacts.json'),
    'utf-8',
  )
  const result = JSON.parse(content)
  return result
}
async function listContacts() {
  return await contactsPath()
}

async function getContactById(contactId) {
  const contacts = await contactsPath()
  const contactById = contacts.find((contact) => contact.id === contactId)
  if (!contactById) return null
  return contactById
}

async function removeContact(contactId) {
  const contacts = await listContacts()
  contactRemoveId = contacts.findIndex((contact) => contact.id === contactId)
  if (contactRemoveId === -1) return null
  contacts.splice(contactRemoveId, 1)
  await fs.writeFile(
    path.join(__dirname, 'db', 'contacts.json'),
    JSON.stringify(contacts),
  )
  console.log('delete completed')
}

async function addContact(name, email, phone) {
  const contacts = await contactsPath()
  const newContact = { id: randomUUID(), name, email, phone }
  contacts.push(newContact)
  await fs.writeFile(
    path.join(__dirname, 'db', 'contacts.json'),
    JSON.stringify(contacts, null, 2),
  )
  return newContact
}

module.exports = { listContacts, getContactById, removeContact, addContact }
