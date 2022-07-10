import { io } from '..';
import { AnimeOnTopRecord, WhatsTheMelodyRecord } from '../records';
import { setAccountTimePoints } from './pointsManager';

export const dailyUpdate = () => {
    // setInterval(async () => {
    //     const date = new Date();
    //     const response = await fetch(`${HOST_ADDRESS}`);
    //     if (!response.ok) return console.log('Serwer status: ERR!');
    //     const result = await response.json();
    //     console.log(`Serwer status: ${result.status}, Serwer response: ${result.message}, Date: ${date.toLocaleTimeString()} ${date.toLocaleDateString()}`);
    // }, 300000);

    setInterval(async () => {
        const date = new Date();

        if (date.getHours() === 22 && date.getMinutes() === 0) {
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