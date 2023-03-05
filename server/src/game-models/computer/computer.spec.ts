import { Computer } from './computer';
import { NetworkPort } from "../network-port/network.port";
import { FileType, IFileEntry } from "../file-system/file-system";

describe('Computer', () => {
    it('should be defined', () => {
        let testComp = new Computer('test', '8.8.8.8');
        expect(testComp).toBeDefined();
        expect(testComp.hostname).toBe('test');
        expect(testComp.isOnline()).toBe(true);
    });

    it('should have functional filesystem', () => {
        let testFileTree: IFileEntry[] = [
            {
                name: 'test', type: FileType.Directory, content: [
                    {name: 'test1', type: FileType.Text, content: 'testContent1'},
                ]
            },
        ];

        let testComp = new Computer('test', '8.8.8.8', testFileTree);
        expect(testComp.isOnline()).toBe(true);


        let testFile = testComp.getFile('test/test1');
        expect(testFile).toBeDefined();
        expect(testFile.name).toBe('test1');
        expect(testFile.type).toBe(FileType.Text);
        expect(testFile.content).toBe('testContent1');

        let testDirectory = testComp.getFile('test');
        expect(testDirectory).toBeDefined();
        expect(testDirectory.name).toBe('test');
        expect(testDirectory.type).toBe(FileType.Directory);
        expect(testDirectory.content).toBe(testFileTree[0].content);
        expect(testDirectory.content).toHaveLength(1);
    });

    it('should throw error when file not found', () => {
        let testFileTree: IFileEntry[] = [
            {
                name: 'test', type: FileType.Directory, content: [
                    {name: 'test1', type: FileType.Text, content: 'testContent1'},
                ]
            },
            { name: 'test2', type: FileType.Text, content: 'testContent2'},
        ];

        let testComp = new Computer('test', '1.1.1.1', testFileTree);
        expect(testComp.isOnline()).toBe(true);
        expect(() => testComp.getFile('test/test2')).toThrowError('File not found');
        expect(() => testComp.getFile('test2/something')).toThrowError('File is not a directory');
        expect(() => testComp.getFile('test1')).toThrowError('File not found');
    });

    it('should have functional port system', () => {
        let testComp = new Computer('test', '1.1.1.1', [], [new NetworkPort(8080)]);
        let testPort = testComp.getPort(8080);
        expect(testPort).toBeDefined();
        expect(testPort.port).toBe(8080);
        expect(testPort.isOpen()).toBe(false);
        testPort.openPort();
        expect(testPort.isOpen()).toBe(true);
    });

    it('should throw error when offline', () => {
        let testComp = new Computer('test', '1.1.1.1', [], [new NetworkPort(8080)]);
        testComp.online = false;
        expect(testComp.isOnline()).toBe(false);
        expect(() => testComp.getFile('test')).toThrowError('Computer is offline');
        expect(() => testComp.getPort(8080)).toThrowError('Computer is offline');
    });
});
