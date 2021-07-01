// Copyright (c) 2021 Red Hat, Inc.
// Copyright Contributors to the Open Cluster Management project
/* istanbul ignore file */
'use strict'
import '@patternfly/react-core/dist/styles/base.css'
import { StrictMode, Suspense, Fragment } from 'react'
import ReactDOM from 'react-dom'
import { RecoilRoot } from 'recoil'
import { config } from 'dotenv'
import App from './App'
import { validateSessionToken } from './lib/resource-request'

// config loads .env file vars
config()

// Validate session tokens - redirect to login if unauthorized
validateSessionToken()

ReactDOM.render(
    <StrictMode>
        <Suspense fallback={<Fragment />}>
            <RecoilRoot>
                <App />
            </RecoilRoot>
        </Suspense>
    </StrictMode>,
    document.getElementById('root')
)
