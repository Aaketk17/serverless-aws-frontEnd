import React from 'react'
import {Route, BrowserRouter as Router, Routes} from 'react-router-dom'
import LandingPage from './Components/landingPage'
import DataTable from './Components/table'

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/home" element={<LandingPage />} />
        <Route path="/table" element={<DataTable />} />
      </Routes>
    </Router>
  )
}

export default App
