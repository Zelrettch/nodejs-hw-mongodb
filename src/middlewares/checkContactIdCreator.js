import createHttpError from 'http-errors';
import { ContactsCollection } from '../db/models/contact.js';

export default async function checkContactIdCreator(req, res, next) {
  const { contactId } = req.params;
  if (!contactId) {
    throw new createHttpError(403);
  }

  const contact = await ContactsCollection.findOne({
    _id: contactId,
    userId: req.user._id,
  });

  if (!contact) {
    throw new createHttpError(403);
  }
  next();
}
