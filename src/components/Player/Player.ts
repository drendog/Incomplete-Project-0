import { SOUND_TYPE } from '@/SoundSources/audioStore';
import DirectPlayer from './DirectPlayer';
import YoutubePlayer from './YoutubePlayer';

export interface Player {
    url: string;
    volume: number;
    onComponentReady(event: Event): void;
    isReady(): void;
    play(): void;
    pause(): void;
    setVolume(value: number): void;
}

export class PlayerCreator {
    private static player: Player;
    static getPlayer (type: number, url: string, volume: number): Player {
    	switch (type) {
    	case SOUND_TYPE.DIRECT:
    		this.player = new DirectPlayer(url, volume);
    		break;
    	case SOUND_TYPE.YOUTUBE:
    		this.player = new YoutubePlayer(url, volume);
    		break;
    	default:
    	}
    	return this.player;
    }
}
