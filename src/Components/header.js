import React from 'react'
import aws from '../Assets/aws.png'
import '../scss/header.css'

const Header = () => {
  return (
    <div>
      <header className="p-3 bg-dark text-white">
        <div className="container">
          <div className="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start">
            <a
              href="/"
              className="d-flex align-items-center mb-2 mb-lg-0 text-white text-decoration-none"
            >
              <div className="header-container">
                <div>
                  <img src={aws} alt="aws-logo" width="60" height="50" />
                </div>
                <div className="header-title">AWS Serverless file Upload</div>
              </div>
            </a>
          </div>
        </div>
      </header>
    </div>
  )
}

export default Header
