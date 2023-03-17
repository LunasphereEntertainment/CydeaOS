import { Computer } from './computer';
import { FileType, IFileEntry } from "../file-system/i-file-entries";
import { FileSystemEmulation } from "../file-system/file-system-emulation";
import { HttpServer } from "../daemons/http-server/http-server";
import { DnsServer } from "../daemons/dns-server/dns-server";

describe('Computer', () => {
    it('should be defined', () => {
        let testComp = new Computer('test');
        expect(testComp).toBeDefined();
        expect(testComp.hostname).toBe('test');
        expect(testComp.isOnline()).toBe(true);
    });

    describe('should have functional filesystem', () => {
        let testComp: Computer;

        beforeEach(() => {
            let testFileTree: IFileEntry = {
                name: "",
                type: FileType.Directory,
                content: [
                    {
                        name: 'test', type: FileType.Directory, content: [
                            {name: 'test1', type: FileType.Text, content: 'testContent1'},
                        ]
                    },
                    {name: 'test2', type: FileType.Text, content: 'testContent2'},
                ]
            };

            testComp = new Computer('test', new FileSystemEmulation(testFileTree));
        });

        it('should allow getting of existing files', () => {
            let testFile = testComp.fileSystem.getFile('/test/test1');
            expect(testFile).toBeDefined();
            expect(testFile.name).toBe('test1');
            expect(testFile.type).toBe(FileType.Text);
            expect(testFile.content).toBe('testContent1');

            let testDirectory = testComp.fileSystem.getFile('test');
            expect(testDirectory).toBeDefined();
            expect(testDirectory.name).toBe('test');
            expect(testDirectory.type).toBe(FileType.Directory);
            expect(testDirectory.content).toHaveLength(1);
        });

        it('should throw error when file not found', () => {
            expect(() => testComp.fileSystem.getFile('test/test2')).toThrowError('File not found');
            expect(() => testComp.fileSystem.getFile('test2/something')).toThrowError('File is not a directory');
            expect(() => testComp.fileSystem.getFile('test1')).toThrowError('File not found');
        });
    });

    describe('should have functional ports system', () => {
        let testComp: Computer;

        beforeEach(() => {
            testComp = new Computer('test', new FileSystemEmulation(), 'System');
            testComp.daemons.push(new HttpServer(testComp.fileSystem, 8080));
            testComp.daemons.push(new DnsServer());
        });

        it('should have correct ports', () => {
            expect(testComp.listPorts()).toHaveLength(2);
            expect(testComp.listPorts()[0].port).toBe(8080);
            expect(testComp.listPorts()[1].port).toBe(53);
        });

        it('should allow getting of existing ports', () => {
            let testPort = testComp.getPort(8080);
            expect(testPort).toBeDefined();
            expect(testPort.port).toBe(8080);
        });

        it('should throw error when port not found', () => {
            expect(() => testComp.getPort(8081)).toThrowError('Port 8081 not found');
        });

        it('should allow opening and closing of ports', () => {
            let testPort = testComp.getPort(8080);
            expect(testPort.isOpen()).toBe(false);
            testPort.openPort();
            expect(testPort.isOpen()).toBe(true);
            testPort.closePort();
            expect(testPort.isOpen()).toBe(false);
        });
    });
});
