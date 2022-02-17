/* eslint-disable jsx-a11y/anchor-is-valid */
import React, {useEffect, useState} from 'react'
import '../scss/pagination.css'

const Pagination = ({
  dataPerPage,
  totalDataCount,
  paginate,
  next,
  previous,
  page,
}) => {
  const [pageNumbers, setPageNumbers] = useState([])

  const addPageNumbers = () => {
    for (let i = 1; i <= Math.ceil(totalDataCount / dataPerPage); i++) {
      setPageNumbers((val) => [...val, i])
    }
  }

  useEffect(() => {
    addPageNumbers()
  }, [])

  return (
    <div className="table-pagination">
      <nav aria-label="Page navigation example">
        <ul className="pagination justify-content-end">
          <li
            className={
              previous === undefined ? 'page-item disabled' : 'page-item'
            }
          >
            <a className="page-link" onClick={() => paginate(previous.Page)}>
              Previous
            </a>
          </li>
          {pageNumbers.map((num) => (
            <li
              className={page === num ? 'page-item active' : 'page-item'}
              key={num}
            >
              <a className="page-link" onClick={() => paginate(num)}>
                {num}
              </a>
            </li>
          ))}
          <li
            className={next === undefined ? 'page-item disabled' : 'page-item'}
          >
            <a className="page-link" onClick={() => paginate(next.Page)}>
              Next
            </a>
          </li>
        </ul>
      </nav>
    </div>
  )
}

export default Pagination
