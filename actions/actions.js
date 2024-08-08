'use server';
import MongoConnect from '@/database/mongodb';
import {revalidatePath} from "next/cache";

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

export async function contactDelete(id) {
    try {
        const contact = await Contact.findByIdAndDelete(id, {new: true});
        revalidatePath('/');
        const newContact = {...contact._doc, _id: contact._doc._id.toString()};
        return newContact;
    } catch (e) {
        return {error: e.message};
    }
}

export async function contactView(id) {
    try {
        const contact = await Contact.findById(id);
        const newContact = {...contact._doc, _id: contact._doc._id.toString()};
        return newContact;
    } catch (e) {
        return {error: e.message};
    }
}

export async function contactUpdate(contact) {
    try {
        const contactUpd = await Contact.findByIdAndUpdate(
            contact._id,
            {name: contact.name, email: contact.email},
            {new: true}
        );

        const newContact = {
            ...contactUpd._doc,
            _id: contactUpd._doc._id.toString(),
        };
        revalidatePath('/');
        return newContact;
    } catch (e) {
        return {error: e.message};
    }
}
