import { FileSystemEmulation } from './file-system-emulation';
import { FileType } from "./i-file-entries";

describe('FileSystem', () => {
    it('should be defined', () => {
        expect(new FileSystemEmulation()).toBeDefined();
    });

    it('should create a file', () => {
        const fileSystem = new FileSystemEmulation();
        const file = fileSystem.createFile('', {name: 'test', type: FileType.Text, content: 'test text file'});
        expect(file).toBeDefined();
        expect(() => fileSystem.getFile('/test')).not.toThrowError();
    });

    it('should create a directory', () => {
        const fileSystem = new FileSystemEmulation();
        const file = fileSystem.createFile('', {name: 'test', type: FileType.Directory, content: []});
        expect(file).toBeDefined();
        expect(() => fileSystem.getFile('/test')).not.toThrowError();
        expect(fileSystem.getFile('/test')).toBe(file);
    });

    it('should list files in a directory', () => {
        const fileSystem = new FileSystemEmulation();
        fileSystem.createFile('', {name: 'test', type: FileType.Directory, content: []});
        fileSystem.createFile('/test', {name: 'test1', type: FileType.Text, content: 'test text file'});
        fileSystem.listFiles('/test').forEach((file) => {
            expect(file).toBeDefined();
            expect(file.type).toBe(FileType.Text);
            expect(file.name).toBe('test1');
        });
    });
});
