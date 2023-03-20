import { SocketLoggerInterceptor } from './socket-logger.interceptor';

describe('SocketLoggerInterceptor', () => {
  it('should be defined', () => {
    expect(new SocketLoggerInterceptor()).toBeDefined();
  });
});
