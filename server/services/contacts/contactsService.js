import { v4 as uuidv4 } from "uuid";
import conn from "../../config/db.js";
import undefinedValidator from '../../utils/undefinedValidator.js'

const pool = await conn();

const createContact = async (req) => {
  const {
    userId,
    emailAddress,
    name,
    mobileNumbers = []
  } = req.body || {}

  const contactQuery = `
  INSERT INTO contacts (contactId, userId, emailAddress, name, avatar)
  VALUES (?, ?, ?, ?, ?)
  `
  const contactMobileNumbersQuery = `
  INSERT INTO contacts_mobile_numbers (contactId, mobileNumber)
  VALUES (?, ?)
  `

  try {
    const contactId = uuidv4()
    const avatar = req.files && req.files['avatar'] ? req.files['avatar'][0].path : null;

    await pool.query(contactQuery, [contactId, userId, emailAddress, name, avatar])

    if (mobileNumbers.length > 0) {
      await Promise.all(mobileNumbers.map(async (con) => {
        await pool.query(contactMobileNumbersQuery, [contactId, con])
      }))
    }

    return `[Contacts] successfully created`

  } catch (error) {
    console.error(error.message);
    throw new Error(error.message);
  }
}

const getAllContactsByUserId = async (userId) => {
  const contactsQuery = `
    SELECT 
      c.contactId,
      c.userId,
      c.emailAddress,
      c.name,
      c.avatar,
      GROUP_CONCAT(cm.mobileNumber) AS mobileNumbers
    FROM 
      contacts c
    LEFT JOIN 
      contacts_mobile_numbers cm ON c.contactId = cm.contactId
    WHERE 
      c.userId = ?
    GROUP BY 
      c.contactId
  `;

  try {
    const [contacts] = await pool.query(contactsQuery, [userId]);

    return contacts.map(contact => ({
      ...contact,
      mobileNumbers: contact.mobileNumbers ? contact.mobileNumbers.split(',') : []
    }));
  } catch (error) {
    console.error(error.message);
    throw new Error(error.message);
  }
};

const getSingleByContactId = async (contactId) => {
  const contactQuery = `
    SELECT 
      c.contactId,
      c.userId,
      c.emailAddress,
      c.name,
      c.avatar,
      GROUP_CONCAT(cm.mobileNumber) AS mobileNumbers
    FROM 
      contacts c
    LEFT JOIN 
      contacts_mobile_numbers cm ON c.contactId = cm.contactId
    WHERE 
      c.contactId = ?
    GROUP BY 
      c.contactId
  `;

  try {
    const [result] = await pool.query(contactQuery, [contactId]);

    if (!result || result.length === 0) {
      throw new Error(`[Contacts] Contact with ID ${contactId} not found`);
    }

    const contact = result[0];
    return {
      ...contact,
      mobileNumbers: contact.mobileNumbers ? contact.mobileNumbers.split(',') : []
    };
  } catch (error) {
    console.error(`[Contacts] Failed to retrieve contact: ${error.message}`);
    throw new Error(error.message);
  }
};


const deleteContact = async (contactId) => {
  const deleteMobileNumbersQuery = `
    DELETE FROM contacts_mobile_numbers
    WHERE contactId = ?
  `;
  const deleteContactQuery = `
    DELETE FROM contacts
    WHERE contactId = ?
  `;

  try {
    await pool.query(deleteMobileNumbersQuery, [contactId]);

    await pool.query(deleteContactQuery, [contactId]);

    return `[Contacts] successfully deleted`;
  } catch (error) {
    console.error(`[Contacts] Failed to delete: ${error.message}`);
    throw new Error(error.message);
  }
};

const editContactByContactId = async (req) => {
  const {
    emailAddress,
    name,
    mobileNumbers = [],
  } = req.body || {};

  const { contactId } = req.params || P
  const avatar = req.files && req.files['avatar'] ? req.files['avatar'][0].path : null;

  const getContactQuery = `
    SELECT 
      c.contactId,
      c.emailAddress,
      c.name,
      c.avatar,
      GROUP_CONCAT(cm.mobileNumber) AS mobileNumbers
    FROM 
      contacts c
    LEFT JOIN 
      contacts_mobile_numbers cm ON c.contactId = cm.contactId
    WHERE 
      c.contactId = ?
    GROUP BY 
      c.contactId
  `;

  const updateContactQuery = `
    UPDATE contacts
    SET emailAddress = ?, name = ?, avatar = ?
    WHERE contactId = ?
  `;

  const deleteMobileNumbersQuery = `
    DELETE FROM contacts_mobile_numbers
    WHERE contactId = ?
  `;

  const insertMobileNumberQuery = `
    INSERT INTO contacts_mobile_numbers (contactId, mobileNumber)
    VALUES (?, ?)
  `;

  try {
    const [existingContacts] = await pool.query(getContactQuery, [contactId]);

    if (!existingContacts || existingContacts.length === 0) {
      throw new Error(`[Contacts] Contact with ID ${contactId} not found`);
    }

    const currentContact = existingContacts[0];

    const validatedEmail = undefinedValidator(currentContact.emailAddress, emailAddress);
    const validatedName = undefinedValidator(currentContact.name, name);
    const validatedAvatar = avatar || currentContact.avatar;

    await pool.query(updateContactQuery, [
      validatedEmail,
      validatedName,
      validatedAvatar,
      contactId,
    ]);

    if (mobileNumbers.length > 0) {
      await pool.query(deleteMobileNumbersQuery, [contactId]);

      await Promise.all(
        mobileNumbers.map(async (number) => {
          await pool.query(insertMobileNumberQuery, [contactId, number]);
        })
      );
    }

    return `[Contacts] Contact updated successfully`;
  } catch (error) {
    console.error(`[Contacts] Failed to update contact: ${error.message}`);
    throw new Error(error.message);
  }
};

export default {
  createContact,
  getAllContactsByUserId,
  getSingleByContactId,
  deleteContact,
  editContactByContactId
}