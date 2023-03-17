import { NmapCommand } from './nmap-command';

describe('NmapCommand', () => {
  it('should be defined', () => {
    expect(new NmapCommand()).toBeDefined();
    expect(NmapCommand.executable).toBe('nmap');
  });
});
