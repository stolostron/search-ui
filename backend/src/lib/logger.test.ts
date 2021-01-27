import { logLevel } from './logger'

describe('logger test', () => {

    it('should respond with correct log level', async () => {
        expect(logLevel).toBe('silent');
    });
});