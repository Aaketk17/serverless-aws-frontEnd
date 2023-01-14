/* eslint-disable no-undef */
import React, {useState, useRef} from 'react'
import Header from './header'
import axios from 'axios'
import AlertPanel from './alert'
import {message} from 'antd'
import '../scss/app.css'
import {useNavigate} from 'react-router-dom'

const LandingPage = () => {
  const URL = process.env.REACT_APP_SERVERLESS_URL
  const [loading, setLoading] = useState(false)
  const [spinner, setSpinner] = useState(false)

  const ErrorTypes = {
    fileTypeError: 1,
    emptyUpload: 2,
    uploadError: 3,
  }

  const [file, setFile] = useState()
  const [error, setError] = useState()

  const inputRef = useRef()
  const navigate = useNavigate()

  const chooseFileToUpload = async (val) => {
    val.preventDefault()
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

  const uploadFileSignedUrl = async () => {
    console.log(URL, 'URL')
    if (file === undefined) {
      setError(ErrorTypes.emptyUpload)
      inputRef.current.value = null
      inputRef.current.files = undefined
    } else {
      setSpinner(true)
      await axios
        .post(`${URL}/fileUpload`, {
          fileName: file.name,
        })
        .then((results) => {
          if (results.status === 200) {
            const values = {
              url: results.data.URL.url,
              fields: results.data.URL.fields,
            }
            uploadToS3(values)
          }
        })
        .catch((error) => {
          console.log(error)
          message.open({
            type: 'error',
            content: `Error in creating Signed URL, ${error}`,
            duration: 10,
          })
          setSpinner(false)
        })
      inputRef.current.value = null
      inputRef.current.files = undefined
    }
  }

  const uploadToS3 = async (values) => {
    var formData = new FormData()
    for (const key in values.fields) {
      formData.append(key, values.fields[key])
    }
    formData.append('file', file)
    await axios({
      method: 'post',
      url: `${values.url}`,
      data: formData,
      headers: {'Content-Type': 'multipart/form-data'},
    })
      .then((results) => {
        if (results.status === 204) {
          message.open({
            type: 'success',
            content: 'File uploaded to S3 Successfully',
            duration: 3,
          })
          setSpinner(false)
        }
      })
      .catch((error) => {
        console.log(error)
        message.open({
          type: 'error',
          content: `Error in Uploading File, ${error}`,
          duration: 10,
        })
        setSpinner(false)
      })
  }

  const generateSignedUrl = async () => {
    setLoading(true)
    await axios
      .get(`${URL}/writeToFile`)
      .then((results) => {
        console.log(results)
        if (results.status === 200) {
          message.open({
            type: 'success',
            content: 'Signed URL successfully created',
            duration: 10,
          })
          downloadFile(results.data.URL)
        }
      })
      .catch((error) => {
        console.log(error)
        message.open({
          type: 'error',
          content: `Error in creating Signed URL, Table might be empty, upload file first |   ${error}`,
          duration: 4,
        })
        setLoading(false)
      })
  }

  const downloadFile = async (url) => {
    console.log(url)
    const link = document.createElement('a')
    link.href = url
    link.setAttribute('download', `data.xlsx`)
    document.body.appendChild(link)
    link.click()
    setLoading(false)
  }

  return (
    <div className="main-container">
      <Header />
      <div className="fileUpload-container row">
        <div className="col-sm-4">
          <div className="card">
            <span>
              Upload CSV or Excel File to Migrate the Data to DynamoDB
            </span>
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
                onClick={uploadFileSignedUrl}
              >
                Upload
              </button>
            </div>
            {spinner ? (
              <div className="d-flex justify-content-center">
                <div className="spinner-border text-dark " role="status">
                  <span className="sr-only"></span>
                </div>
              </div>
            ) : null}
          </div>
        </div>
        <div className="col-sm-4">
          <div className="card">
            <span>Download whole Data from DB as Excel File</span>
            <button
              type="button"
              className="btn btn-sm btn-success download-btn"
              onClick={() => generateSignedUrl()}
            >
              Download
            </button>
            {loading ? (
              <div className="spinner-border text-success" role="status">
                <span className="sr-only"></span>
              </div>
            ) : null}
          </div>
        </div>
        <div className="d-flex justify-content-center">
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
        <div className="col-sm-4 table-view-btn">
          <button
            className="btn btn-dark btn-sm"
            onClick={() => navigate('/table')}
          >
            View in Table
          </button>
        </div>
      </div>
    </div>
  )
}

export default LandingPage
