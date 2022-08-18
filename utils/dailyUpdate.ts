import { io } from '..';
import { AnimeOnTopRecord, WhatsTheMelodyRecord } from '../records';
import { setAccountTimePoints } from './pointsManager';

export const dailyUpdate = () => {
    setInterval(async () => {
        const date = new Date();
        if (date.getHours() === 24 && date.getMinutes() === 0) {
            // reset "Jaka to Melodia"
            await WhatsTheMelodyRecord.setNew();
            io.emit('whats-the-melody__new');

            if (date.toDateString()[0].toLowerCase() === 's' && date.toDateString()[2].toLowerCase() === 'n') {
                // reset "AOT"
                await AnimeOnTopRecord.setNew();
            }
            setAccountTimePoints();
        }
    }, 60000);
}