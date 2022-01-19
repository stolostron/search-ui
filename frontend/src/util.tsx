// Copyright (c) 2021 Red Hat, Inc.
// Copyright Contributors to the Open Cluster Management project
/* istanbul ignore file */
import { atom } from 'recoil'
import { AcmRoute } from '@stolostron/ui-components'

export const acmRouteState = atom<AcmRoute>({ key: 'acmRoute', default: '' as AcmRoute })
