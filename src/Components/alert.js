import React from 'react'

const AlertPanel = (props) => {
  const {content, type, setErrorCode} = props
  return (
    <div
      className={`alert alert-${type} alert-dismissible fade show`}
      role="alert"
    >
      {content}
      <button
        type="button"
        className="btn-close"
        data-bs-dismiss="alert"
        aria-label="Close"
        onClick={() => setErrorCode(0)}
      ></button>
    </div>
  )
}

export default AlertPanel
