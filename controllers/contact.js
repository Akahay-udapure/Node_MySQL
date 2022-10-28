const db = require('../models');
const Contact = db.contact;
const User = db.User;


exports.add = async (req, res) => {
    try {
        let contact = await Contact.create(req.body);
        res.json({ status: 200, message: "Contact Added Success!", data: contact });
    } catch (error) {
        res.json({ status: 400, message: "Error", error: error });
    }
}




