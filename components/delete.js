import {contactDelete} from '@/actions/actions';
import React, {startTransition, useState} from 'react';

function Delete({dopen, setDopen, currId, setCurrId}) {
    const [error, setError] = useState();

    async function doDelete(id) {
        const result = await contactDelete(id);
        if (result.error) {
            setError(result.error);
        }
        setDopen(false);
        setCurrId();
    }

    return (
        <>
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
            <dialog id="add_modal" className="modal" open={dopen}>
                <div className="modal-box ">
                    <h3 className="font-bold text-lg">Confirm Deletion</h3>
                    <p className="py-4">Are you sure you want to delete the contact?</p>
                    <div className="flex my-4 justify-between">
                        <div className="btn" onClick={() => setDopen(false)}>
                            Cancel
                        </div>
                        <button
                            className="btn btn-primary"
                            onClick={() => startTransition(() => doDelete(currId))}
                        >
                            Confirm
                        </button>
                    </div>
                </div>
            </dialog>
        </>
    );
}

export default Delete;
