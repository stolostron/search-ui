import { logLevel, logger, logError } from './logger'

describe('logger test', () => {
    it('should respond with correct log level', () => {
        expect(logLevel).toBe('silent')
    })

    it('should correctly call logError with msg only', () => {
        logger.error = jest.fn();
        logError('testing1', null)
        expect(logger.error).toHaveBeenCalledWith({ msg: 'testing1' })
    })

    it('should correctly call logError with Error type', () => {
        logger.error = jest.fn();
        const error = Error('errorMessage')
        logError('testing2', error)
        expect(logger.error).toHaveBeenCalledWith({ msg: 'testing2', err: 'errorMessage', name: 'Error' })
    })
})
