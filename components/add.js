'use client';
import {contactAdd} from '@/actions/actions';
import React, {useState, useTransition} from 'react';
import {useForm} from 'react-hook-form';
import {zodResolver} from '@hookform/resolvers/zod';

import zSchema from '@/models/zodSchema';

function Add() {
    const [mopen, setMopen] = useState(false);
    const [isPending, startTransition] = useTransition();
    const [error, setError] = useState();

    const {
        register,
        handleSubmit,

        formState: {errors},
        reset,
    } = useForm({
        resolver: zodResolver(zSchema),
    });
    const doReset = async () => {
        setMopen(false);
        reset();
    };

    const onSubmit = handleSubmit((data) => {
        var result;
        startTransition(async () => {
            result = await contactAdd(data);

            if (result.error) {
                setError(result.error);
            }
        });
        setMopen(false);
        reset();
    });

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
            <button
                className="btn"
                onClick={() => {
                    setMopen(true);
                }}
            >
                Add New
            </button>
            <dialog id="add_modal" className="modal" open={mopen}>
                <div className="modal-box w-2/3 max-w-3xl ">
                    <h3 className="font-bold text-lg">ADD CONTACT</h3>
                    <form className="card w-100 bg-base-100" onSubmit={onSubmit}>
                        <div className="flex flex-col md:flex-row md:space-x-3 w-full ">
                            <div className="w-full">
                                <label className="label">
                                    <span className="label-text">Name</span>
                                </label>
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

export default Add;
