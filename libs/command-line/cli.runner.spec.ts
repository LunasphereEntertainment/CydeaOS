import CliRunner from "./cli.runner";
import { Computer } from "../nodes/computer/computer";
import { FileSystemEmulation } from "../nodes/file-system/file-system-emulation";
import { FileType } from "../nodes/file-system/i-file-entries";

describe('CliRunner', () => {
    it('should support the "echo" command', async () => {
        const cmdResult = await CliRunner('echo Hello, world!');
        expect(cmdResult).toEqual('Hello, world!');
    });

    it('should support the "ls" command', async () => {
        const testFileSystem = new FileSystemEmulation({
            name: "",
            type: FileType.Directory,
            content: [
                {
                    name: 'index.html', type: FileType.Text, content: '<html><body><h1>Test</h1></body></html>'
                }
            ]
        });
        const testComputer = new Computer('test', testFileSystem);

        const cmdResult = await CliRunner('ls', testComputer);
        expect(cmdResult).toEqual('index.html');
    });
});
