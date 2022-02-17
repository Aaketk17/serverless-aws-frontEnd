/* eslint-disable no-undef */
import React, {useEffect, useState, useRef} from 'react'
import Header from './Components/header'
import DataTable from './Components/table'
import axios from 'axios'
import AlertPanel from './Components/alert'
import './scss/app.css'

const LandingPage = () => {
  const ENDPOINT = process.env.REACT_APP_SERVERLESS_URL
  const ErrorTypes = {
    fileTypeError: 1,
    emptyUpload: 2,
    uploadError: 3,
  }
  const [file, setFile] = useState()
  const [error, setError] = useState()

  const inputRef = useRef()

  const chooseFileToUpload = async (val) => {
    const fName = val.target.files[0].name
    const extension = fName.split('.').pop()

    if (extension === 'csv' || extension === 'xls' || extension === 'xlsx') {
      setFile(val.target.files[0])
      setError(0)
    } else {
      inputRef.current.value = null
      inputRef.current.files = undefined
      setError(ErrorTypes.fileTypeError)
      setFile()
    }
  }

  const uploadFile = () => {
    console.log(file)
    if (file === undefined) {
      setError(ErrorTypes.emptyUpload)
    } else {
      console.log(ENDPOINT)
    }
  }

  return (
    <div className="main-container">
      <Header />
      <div className="fileUpload-container">
        <span>Upload CSV or Excel File to Migrate the Data to DynamoDB</span>
        <div className="btn-groupName">
          <div className="mb-3">
            <input
              className="form-control form-control-sm"
              type="file"
              ref={inputRef}
              id="formFile"
              accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
              onChange={(val) => chooseFileToUpload(val)}
            />
          </div>
          <button
            type="button"
            className="btn btn-dark btn-sm"
            onClick={uploadFile}
          >
            Upload
          </button>
        </div>
        <div className="alertContainer">
          {error === 1 ? (
            <AlertPanel
              type="danger"
              content="Check your File Type only csv, xls, xlsx are accepted"
              setErrorCode={setError}
            />
          ) : error === 2 ? (
            <AlertPanel
              type="warning"
              content="Choose a File to Upload"
              setErrorCode={setError}
            />
          ) : error === 3 ? (
            <AlertPanel
              type="danger"
              content="Error in Uploading File"
              setErrorCode={setError}
            />
          ) : null}
        </div>
      </div>
      <div className="dataTable-container">
        <DataTable />
      </div>
    </div>
  )
}

export default LandingPage
