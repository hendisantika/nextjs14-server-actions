'use client';
import React from 'react';

function View({vopen, setVopen, contact}) {
    return (
        <>
            <dialog id="add_modal" className="modal" open={vopen}>
                <div className="modal-box w-2/3 max-w-3xl ">
                    <h3 className="font-bold text-lg">Contact Detail</h3>
                    <div className="text-xs mb-2">ID: {contact?._id}</div>
                    <div className="flex flex-col md:flex-row md:space-x-3 w-full ">
                        <div className="md:w-1/2">Name: {contact?.name}</div>
                        <div className="md:w-1/2">Email: {contact?.email}</div>
                    </div>

                    <div className="flex my-4 justify-end">
                        <div
                            className="btn"
                            onClick={() => {
                                setVopen(false);
                            }}
                        >
                            Close
                        </div>
                    </div>
                </div>
            </dialog>
        </>
    );
}

export default View;
