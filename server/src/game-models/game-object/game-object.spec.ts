import { GameObject } from './game-object';
import { Computer } from "../computer/computer";

describe('GameObject', () => {
    it('should be defined', () => {
        let testGameObject = new GameObject();
        expect(testGameObject).toBeDefined();
        expect(testGameObject.id).toBeDefined();
        expect(testGameObject.dns).toBeDefined();
        expect(testGameObject.nodesByIP).toBeDefined();
    });

    it('should register a node', () => {
        let testGameObject = new GameObject();
        let testNode = new Computer('test', '1.1.1.1');
        testGameObject.registerNode(testNode);
        expect(testGameObject.nodesByIP.get(testNode.ip)).toBe(testNode);
        expect(testGameObject.dns.get(testNode.hostname)).toBe(testNode.ip);
    });

    it('should get a node by IP', () => {
        let testGameObject = new GameObject();
        let testNode = new Computer('test', '1.1.1.1');
        testGameObject.registerNode(testNode);
        expect(testGameObject.getNodeByIP(testNode.ip)).toBe(testNode);
    });

    it('should find a node by hostname', () => {
        let testGameObject = new GameObject();
        let testNode = new Computer('test', '1.1.1.1');
        testGameObject.registerNode(testNode);
        expect(testGameObject.findNodeByHostname(testNode.hostname)).toBe(testNode);
    });

    it('should handle node lookup failure', () => {
        let testGameObject = new GameObject();
        expect(() => testGameObject.lookup('test2')).toThrowError('DNS lookup failed for hostname test2');
    });
});
