import { io } from '..';
import { AnimeOnTopRecord, WhatsTheMelodyRecord } from '../records';
import { setAccountTimePoints } from './pointsManager';

import { CronJob } from 'cron';

export const dailyUpdate = () => {
    new CronJob('0 0 * * *', async () => {
        await WhatsTheMelodyRecord.setNew();
        io.emit('whats-the-melody__new');
        setAccountTimePoints();
    }, null, true);
    new CronJob('0 0 * * 0', async () => {
        await AnimeOnTopRecord.setNew();
    }, null, true);
}