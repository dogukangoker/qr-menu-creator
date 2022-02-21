import React from 'react';
import style from './Pagination.module.css';

const Pagination = ({productsPerPage, totalProducts, paginate}) => {
    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(totalProducts / productsPerPage); i++) {
        pageNumbers.push(i);
    }
    return (
        <div className={style.wrapper}>
            <nav className={style.nav}>
            <ul className={style.ul}>
                {pageNumbers.map(number => (
                    <li onClick={() => paginate(number)} className={style.li} key={number}>
                        <a className={style.a}  href="#">{number}</a>
                    </li>
                ))}
            </ul>
            </nav>
        </div>
    );
};

export default Pagination;