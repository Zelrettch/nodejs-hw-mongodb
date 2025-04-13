import mongoose from 'mongoose';
import { ContactsCollection } from '../db/models/contact.js';
export async function getAllContacts() {
  return await ContactsCollection.find();
}

export async function getContactById(id) {
  if (!mongoose.Types.ObjectId.isValid(id)) return;
  return await ContactsCollection.findById(id);
}

export async function createContact(payload) {
  return await ContactsCollection.create(payload);
}

export async function deleteContact(_id) {
  if (!mongoose.Types.ObjectId.isValid(_id)) return;
  return await ContactsCollection.findOneAndDelete({ _id });
}

export async function updateContact(_id, payload) {
  if (!mongoose.Types.ObjectId.isValid(_id)) return;
  return await ContactsCollection.findOneAndUpdate({ _id }, payload, {
    new: true,
  });
}
