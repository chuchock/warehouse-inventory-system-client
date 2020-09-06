import React, { useState, useEffect } from 'react';

const Pagination = ({ rowsPerPage, totalRows, Paginate }) => {

    const [pageNumbers, setPageNumbers] = useState([]);

    useEffect(() => {
        for (let i = 1; i <= Math.ceil(totalRows / rowsPerPage); i++) {
            setPageNumbers([
                ...pageNumbers,
                i
            ])
        }
    }, []);

    return (
        <nav aria-label="Page navigation example">
            <ul className="pagination">
                <li className="page-item"><a className="page-link" href="#">Previous</a></li>
                {
                    pageNumbers.map(item => (
                        <li key={item} className="page-item"><a className="page-link" href="#">{item}</a></li>
                    ))
                }


                {/* <li className="page-item"><a className="page-link" href="#">2</a></li>
                <li className="page-item"><a className="page-link" href="#">3</a></li> */}
                <li className="page-item"><a className="page-link" href="#">Next</a></li>
            </ul>
        </nav>
    );
}

export default Pagination