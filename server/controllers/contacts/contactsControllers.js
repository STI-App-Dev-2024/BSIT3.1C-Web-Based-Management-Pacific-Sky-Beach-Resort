import expressAsync from "express-async-handler";
import contactsService from "../../services/contacts/contactsService.js";

const createContact = expressAsync(async (req, res) => {
  try {
    const response = await contactsService.createContact(req);
    res.json(response);
  } catch (error) {
    throw new Error(error);
  }
})

const getAllContactsByUserId = expressAsync(async (req, res) => {
  try {
    const response = await contactsService.getAllContactsByUserId(req.params.userId);
    res.json(response);
  } catch (error) {
    throw new Error(error);
  }
})

const getSingleByContactId = expressAsync(async (req, res) => {
  try {
    const response = await contactsService.getSingleByContactId(req.params.contactId);
    res.json(response);
  } catch (error) {
    throw new Error(error);
  }
})

const deleteContact = expressAsync(async (req, res) => {
  try {
    const response = await contactsService.deleteContact(req.params.contactId);
    res.json(response);
  } catch (error) {
    throw new Error(error);
  }
})

const editContactByContactId = expressAsync(async (req, res) => {
  try {
    const response = await contactsService.editContactByContactId(req);
    res.json(response);
  } catch (error) {
    throw new Error(error);
  }
})

export {
  createContact,
  getSingleByContactId,
  getAllContactsByUserId,
  deleteContact,
  editContactByContactId
}