import { FileNotServable, HttpServer } from './http-server';
import { FileSystemEmulation } from "../../file-system/file-system-emulation";
import { FileNotFound, FileType, IFileEntry } from "../../file-system/i-file-entries";

describe('HttpServer', () => {
    it('should be defined', () => {
        expect(new HttpServer(new FileSystemEmulation())).toBeDefined();
    });

    describe('basic http server functionality', () => {
        let testHttpServer: HttpServer;

        beforeEach(() => {
            let testFileTree: IFileEntry = {
                name: "",
                type: FileType.Directory,
                content: [
                    {
                        name: 'test', type: FileType.Text, content: '<html><body><h1>Test</h1></body></html>'
                    },
                    {
                        name: 'test2', type: FileType.Binary, content: '11101011010101'
                    }
                ]
            }

            testHttpServer = new HttpServer(new FileSystemEmulation(testFileTree));
        });

        it('should serve TEXT files', () => {
            expect(testHttpServer.handleRequest('/test')).toBe('<html><body><h1>Test</h1></body></html>');
        });

        it('should NOT serve BINARY files', () => {
            expect(() => testHttpServer.handleRequest('/test2')).toThrowError(FileNotServable);
        });

        it('should handle non-existing files', () => {
            expect(() => testHttpServer.handleRequest('/test3')).toThrowError(FileNotFound);
        });
    });
});
