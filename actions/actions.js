'use server';
import MongoConnect from '@/database/mongodb';

MongoConnect();

export async function contactList(params) {
    try {
        const limit = 5;
        const page = params.page || 1;
        const skip = limit * (page - 1);

        const contacts = await Contact.find()
            .sort({createdAt: -1})
            .sort({updatedAt: -1})
            .limit(limit)
            .skip(skip);
        const count = await Contact.find().count();
        const pages = Math.ceil(count / limit);
        const newContact = contacts.map((contact) => ({
            ...contact._doc,
            _id: contact._doc._id.toString(),
        }));
        return {contacts: newContact, pages: pages};
    } catch (e) {
        return {error: e.message};
    }
}

export async function contactAdd(data) {
    try {
        const contact = new Contact(data);
        contact.save();
        const newContact = {...contact._doc, _id: contact._doc._id.toString()};
        revalidatePath('/');
        return newContact;
    } catch (e) {
        return {error: e.message};
    }
}
