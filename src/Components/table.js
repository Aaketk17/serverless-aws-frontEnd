/* eslint-disable array-callback-return */
import React, {useEffect, useState} from 'react'
import '../scss/table.css'
import axios from 'axios'
import Pagination from './pagination'

const DataTable = () => {
  const URL = process.env.REACT_APP_GET_DB_DATA_API
  const [tableData, setTableData] = useState([])
  const [page, setPage] = useState(1)
  const [pageSize, setPageSize] = useState(50)
  const [loading, setLoading] = useState(false)
  const [totalData, setTotalData] = useState()
  const [next, SetNext] = useState()
  const [previous, setPrevious] = useState()
  const [keys, setKeys] = useState([])

  const getTableData = async () => {
    await axios
      .post(URL, {
        page: page,
        pageSize: pageSize,
      })
      .then((results) => {
        setKeys(Object.keys(results.data.PaginatedData.Items[0]))
        setTableData(results.data.PaginatedData.Items)
        SetNext(results.data.PaginatedData.Next)
        setPrevious(results.data.PaginatedData.Previous)
        setTotalData(results.data.TotalDataCount)
        setLoading(false)
      })
      .catch((error) => {
        console.log(error)
      })
  }

  const paginate = (pageNumber) => {
    console.log(pageNumber)
    setPage(pageNumber)
  }

  useEffect(() => {
    setLoading(true)
    getTableData()
  }, [page])

  return (
    <div>
      {loading ? (
        <div className="d-flex justify-content-center">
          <div className="spinner-grow text-primary" role="status">
            <span className="sr-only"></span>
          </div>
        </div>
      ) : (
        <div>
          <table className="table table-striped">
            <thead>
              <tr>
                <th scope="col">No.</th>
                {keys.map((value, index) => (
                  <th scope="col" key={index}>
                    {value}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {tableData.map((value, index) => (
                <tr key={index}>
                  <th scope="col">{(page - 1) * pageSize + index + 1}</th>
                  <td>{value.InvoiceNo}</td>
                  <td>{value.UnitPrice}</td>
                  <td>{value.Country}</td>
                  <td>{value.InvoiceDate}</td>
                  <td>{value.Description}</td>
                  <td>{value.Quantity}</td>
                  <td>{value.StockCode}</td>
                  <td>{value.CustomerID}</td>
                  <td>
                    <div className="action-btns">
                      <button type="button" className="btn btn-primary btn-sm">
                        Edit
                      </button>
                      <button
                        type="button"
                        className="btn btn-danger btn-sm"
                        data-bs-toggle="modal"
                        data-bs-target="#exampleModal"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <Pagination
            next={next}
            previous={previous}
            totalDataCount={totalData}
            dataPerPage={pageSize}
            paginate={paginate}
            page={page}
          />
        </div>
      )}
      <div
        className="modal fade"
        id="exampleModal"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Modal title
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">...</div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button type="button" className="btn btn-primary">
                Save changes
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DataTable
