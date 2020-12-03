/* istanbul ignore file */

import React from 'react'
import ReactDOM from 'react-dom'
import { config } from 'dotenv'
import App from './App'
import './lib/acm-header'
import { validateSession } from './lib/resource-request'

// config loads .env file vars for use
config()

// Validate session tokens - redirect to login if unauthorized
validateSession()

ReactDOM.render(
    <React.StrictMode>
        <React.Suspense fallback={<React.Fragment />}>
            <App />
        </React.Suspense>
    </React.StrictMode>,
    document.getElementById('root')
);
