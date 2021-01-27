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
})
