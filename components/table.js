'use client';
import {contactView} from '@/actions/actions';
import React, {useState} from 'react';
import {CiEdit, CiRead, CiTrash} from 'react-icons/ci';
import Delete from './delete';
import View from './view';
import Edit from './edit';

function Table({contacts}) {
    const [currId, setCurrId] = useState();
    const [dopen, setDopen] = useState(false);
    const [vopen, setVopen] = useState(false);
    const [eopen, setEopen] = useState(false);
    const [contact, setContact] = useState();
    const [error, setError] = useState();

    const confirmDelete = async (id) => {
        setCurrId(id);
        setDopen(true);
    };

    const doView = async (id) => {
        setContact(await contactView(id));
        setVopen(true);
    };

    const doEdit = async (id) => {
        const result = await contactView(id);
        if (result.error) {
            setError(result.error);
        } else {
            setContact(result);
            setEopen(true);
        }
    };

    return (
        <div className="overflow-x-auto">
            {error && (
                <div className="toast" onClick={() => setError()}>
                    <div className="alert alert-error">
            <span>
              An error occurred
              <br/>
                {error}
            </span>
                    </div>
                </div>
            )}
            <table className="table table-zebra">
                {/* head */}
                <thead>
                <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Action</th>
                </tr>
                </thead>
                <tbody>
                {contacts?.map((contact, i) => (
                    <tr key={i}>
                        <th>{contact._id.toString()}</th>
                        <td>{contact.name}</td>
                        <td>{contact.email}</td>
                        <td>
                            <CiRead
                                className="inline mr-2 cursor-pointer"
                                onClick={() => doView(contact._id.toString())}
                            />
                            <CiEdit
                                className="inline mr-2 cursor-pointer"
                                onClick={() => doEdit(contact._id.toString())}
                            />
                            <CiTrash
                                className="inline cursor-pointer"
                                onClick={() => confirmDelete(contact._id.toString())}
                            />
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
            <Delete
                dopen={dopen}
                setDopen={setDopen}
                currId={currId}
                setCurrId={setCurrId}
            />
            <View vopen={vopen} setVopen={setVopen} contact={contact}/>
            <Edit eopen={eopen} setEopen={setEopen} contact={contact}/>
        </div>
    );
}

export default Table;
