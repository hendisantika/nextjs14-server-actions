'use client';
import {contactUpdate} from '@/actions/actions';
import React, {useEffect, useState, useTransition} from 'react';
import {useForm} from 'react-hook-form';
import {zodResolver} from '@hookform/resolvers/zod';
import zSchema from '@/models/zodSchema';

function Edit({eopen, setEopen, contact}) {
    const [isPending, startTransition] = useTransition();
    const [error, setError] = useState();

    const {
        register,
        handleSubmit,
        control,
        setValue,
        formState: {errors},
        reset,
    } = useForm({
        resolver: zodResolver(zSchema),
    });

    const doReset = async () => {
        setEopen(false);
        reset();
    };
    const onSubmit = handleSubmit((data) => {
        var result;
        startTransition(async () => {
            result = await contactUpdate(data);
            if (result.error) {
                setError(result.error);
            }
        });
        setEopen(false);
        reset();
    });
    useEffect(() => {
        setValue('_id', contact?._id);
        setValue('name', contact?.name);
        setValue('email', contact?.email);
    }, [eopen]);

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
            <dialog id="add_modal" className="modal" open={eopen}>
                <div className="modal-box w-2/3 max-w-3xl ">
                    <h3 className="font-bold text-lg">EDIT CONTACT</h3>
                    <div className="text-xs mb-2">ID: {contact?._id}</div>
                    <form className="card w-100 bg-base-100" onSubmit={onSubmit}>
                        <div className="flex flex-col md:flex-row md:space-x-3 w-full ">
                            <div className="w-full">
                                <label className="label">
                                    <span className="label-text">Name</span>
                                </label>
                                <input type="hidden" {...register('_id')} />
                                <input
                                    className={`input-sm input input-bordered w-full  ${
                                        errors.name && 'border-l-8 border-red-500'
                                    }`}
                                    autoFocus
                                    {...register('name')}
                                />{' '}
                                {errors.name && (
                                    <div className="mb-3 text-sm text-red-500 ">
                                        {errors.name.message}
                                    </div>
                                )}
                            </div>
                            <div className="w-full">
                                <label className="label">
                                    <span className="label-text">Email</span>
                                </label>
                                <input
                                    className={`input-sm input input-bordered w-full  ${
                                        errors.email && 'border-l-8 border-red-500'
                                    }`}
                                    autoFocus
                                    {...register('email')}
                                />
                                {errors.email && (
                                    <div className="mb-3 text-sm text-red-500 ">
                                        {errors.email.message}
                                    </div>
                                )}
                            </div>
                        </div>

                        <div className="flex my-4 justify-between">
                            <div
                                className="btn"
                                onClick={() => {
                                    doReset();
                                }}
                            >
                                Cancel
                            </div>
                            <button
                                className="btn btn-primary"
                                disabled={isPending}
                                // onClick={() => setMopen(false)}
                            >
                                Save
                            </button>
                        </div>
                    </form>
                </div>
            </dialog>
        </>
    );
}

export default Edit;
