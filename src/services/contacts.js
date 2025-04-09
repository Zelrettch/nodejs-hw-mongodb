import mongoose from 'mongoose';
import { ContactsCollection } from '../db/models/contact.js';
export async function getAllContacts() {
  return await ContactsCollection.find();
}

export async function getContactById(id) {
  if (!mongoose.Types.ObjectId.isValid(id)) return;
  return await ContactsCollection.findById(id);
}
