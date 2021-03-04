// Copyright (c) 2021 Red Hat, Inc.
// Copyright Contributors to the Open Cluster Management project

/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { request, setup } from '../test/setup'

setup()

describe('Server.ts tests', function () {
    it('should return 200 response on ping request', async function () {
        const result = await request.get('/ping')
        expect(result.status).toBe(200)
    })

    it('should return 200 response on livenessProbe request', async function () {
        const result = await request.get('/livenessProbe')
        expect(result.status).toBe(200)
    })

    it('should return 200 response on readinessProbe request', async function () {
        const result = await request.get('/readinessProbe')
        expect(result.status).toBe(200)
    })

    it('should return 200 response on tokenValidation request', async function () {
        const result = await request.get('/search/tokenValidation')
        expect(result.status).toBe(200)
    })

    it('should return 401 response on tokenValidation without cookie', async function () {
        const result = await request.get('/search/tokenValidation', { headers: { Cookie: '' } })
        expect(result.status).toBe(401)
    })

    it('should return 200 response on /search/index.html request and set CSRF token and cookie', async function () {
        const result = await request.get('/search/index.html')
        expect(result.status).toBe(200)
        // Check _csrf cookie.
        expect(result.headers['set-cookie'][0]).toContain('_csrf=')
        expect(result.headers['set-cookie'][0]).toContain('Path=/; HttpOnly; SameSite=Strict')

        // Check CSRF_TOKEN inserted in body.
        expect(result.data).not.toContain('{{ CSRF_TOKEN }}')
    })

    it('should return 200 response on /search request and set CSRF token and cookie', async function () {
        const result = await request.get('/search')
        expect(result.status).toBe(200)
        // Check _csrf cookie.
        expect(result.headers['set-cookie'][0]).toContain('_csrf=')
        expect(result.headers['set-cookie'][0]).toContain('Path=/; HttpOnly; SameSite=Strict')

        // Check CSRF_TOKEN inserted in body.
        expect(result.data).not.toContain('{{ CSRF_TOKEN }}')
    })
})
