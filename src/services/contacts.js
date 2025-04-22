import { ContactsCollection } from '../db/models/contact.js';
import { calculatePaginationData } from '../utils/calculatePaginationData.js';
export async function getAllContacts({
  page,
  perPage,
  sortBy,
  sortOrder,
  filter,
  userId,
}) {
  const limit = perPage;
  const skip = (page - 1) * perPage;

  const query = ContactsCollection.find();

  query.where('userId').equals(userId);

  if (filter.type) {
    query.where('type').equals(filter.type);
  }
  if (filter.isFavourite !== undefined) {
    query.where('isFavourite').equals(filter.isFavourite);
  }

  const [contactsCount, contacts] = await Promise.all([
    ContactsCollection.find().merge(query).countDocuments(),
    query
      .skip(skip)
      .limit(limit)
      .sort({ [sortBy]: sortOrder })
      .exec(),
  ]);

  const paginationData = calculatePaginationData(contactsCount, perPage, page);
  return {
    data: contacts,
    ...paginationData,
  };
}

export async function getContactById(_id, userId) {
  return await ContactsCollection.findOne({ _id, userId });
}

export async function createContact(payload) {
  return await ContactsCollection.create(payload);
}

export async function deleteContact(_id, userId) {
  return await ContactsCollection.findOneAndDelete({ _id, userId });
}

export async function updateContact(_id, userId, payload) {
  return await ContactsCollection.findOneAndUpdate({ _id, userId }, payload, {
    new: true,
  });
}
