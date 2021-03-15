// Copyright (c) 2021 Red Hat, Inc.
// Copyright Contributors to the Open Cluster Management project
/* istanbul ignore file */

import React from 'react'
import ReactDOM from 'react-dom'
import { config } from 'dotenv'
import App from './App'
import './lib/acm-header'
import { validateSessionToken } from './lib/resource-request'

// config loads .env file vars
config()

// Validate session tokens - redirect to login if unauthorized
validateSessionToken()

ReactDOM.render(
    <React.StrictMode>
        <React.Suspense fallback={<React.Fragment />}>
            <App />
        </React.Suspense>
    </React.StrictMode>,
    document.getElementById('root')
)
