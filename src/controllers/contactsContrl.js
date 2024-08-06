import { getAllContacts, getConatctByIdDB } from "./services/contacts.js";

export const getContacts = async (req, res) => {
  try {
    const contacts = await getAllContacts();
    res.status(200).json({
      status: 200,
      message: 'Successfully found contacts!',
      data: contacts,
    });
  } catch (error) {
    res.status(500).json({
      status: 500,
      message: 'Failed to retrieve contacts',
      error: error.message,
    });
  }
};

export const getContactById = async (req, res) => {

    let contactId;
  try {
     contactId  = req.params;
    const contact = await getConatctByIdDB(contactId);

    if (!contact) {
      return res.status(404).send({ message: 'Contact not found' });
    }
    res
      .status(200)
      .send({
        status: 200,
        message: `Successfully found contact with id ${contactId}!`,
        data: contact,
      });
  } catch (error) {
    console.error(`Error while fetching contact with id ${contactId}:`, error);
    res.status(500).send({
      status: 500,
      message: 'Failed to retrieve contact',
      error: error.message,
    });
  }
};


