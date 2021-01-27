import { request, setup } from '../test/setup'

setup()

describe('Server.ts tests', function () {
    it('should return 200 response on ping request', async function () {
        const result = await request.get('/ping')
        expect(result.status).toBe(200)
    })
})
