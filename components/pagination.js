'use client';
import {useRouter, useSearchParams} from 'next/navigation';

import React, {useState} from 'react';

function Pagination({pages}) {
    const router = useRouter();
    const searchParams = useSearchParams();
    const totalPages = [...Array(pages)].map((_, i) => i + 1);
    const [currPage, setCurrPage] = useState(searchParams.get('page') || 1);
    const goToPage = (p) => {
        setCurrPage(p);
        var query;
        var qstring = '';
        if (p != 1) {
            qstring = 'page=' + p;
        } else {
            qstring = '';
        }
        query = new URLSearchParams(qstring).toString();
        router.push('?' + query);
    };

    return (
        <div className="container mx-auto">
            <div className="flex justify-center">
                <div className="join">
                    <button className="join-item btn btn-sm">«</button>
                    {totalPages.map((page) => (
                        <button
                            onClick={() => goToPage(page)}
                            className={`join-item btn btn-sm ${
                                currPage === page ? 'btn-active' : null
                            }`}
                            key={page}
                        >
                            {page}
                        </button>
                    ))}
                    <button className="join-item btn btn-sm">»</button>
                </div>
            </div>
        </div>
    );
}

export default Pagination;
