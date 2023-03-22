export abstract class ClientSettings {
    musicEnabled: boolean = true;
    soundEnabled: boolean = true;
    musicVolume: number = 1.0;
    soundVolume: number = 1.0;

    static defaults(): ClientSettings {
        return <ClientSettings>{
            musicEnabled: true,
            soundEnabled: true,
            musicVolume: 1.0,
            soundVolume: 1.0
        };
    }
}
