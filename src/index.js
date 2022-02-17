import React from 'react'
import ReactDOM from 'react-dom'
import * as Sentry from '@sentry/react'
import {BrowserTracing} from '@sentry/tracing'
import LandingPage from './App'
import './scss/main.css'
import 'antd/dist/antd.css'
import {Integrations} from '@sentry/react'

Sentry.init({
  dsn: 'https://e9703e2426a44c4794d943bf741a8dac@o1144917.ingest.sentry.io/6209437',
  integrations: [new BrowserTracing()],
  tracesSampleRate: 1.0,
})

ReactDOM.render(
  <React.StrictMode>
    <LandingPage />
  </React.StrictMode>,
  document.getElementById('root')
)
